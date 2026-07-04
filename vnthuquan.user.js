// ==UserScript==
// @name         Vnthuquan EPUB Downloader (Auto Mode + Offline Images)
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Tải truyện từ vnthuquan.org. Hỗ trợ tự động nội suy danh sách chương bị ẩn và lấy tên chương từ nội dung.
// @author       BS Phê
// @match        https://vnthuquan.org/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.9.1/jszip.min.js
// @updateURL    https://vnindex.vercel.app/vnthuquan.user.js
// @downloadURL  https://vnindex.vercel.app/vnthuquan.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Danh sách User-Agent để xoay vòng
    const USER_AGENTS = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35'
    ];

    const CONFIG = {
        MAX_CONCURRENT: 5,
        TIMEOUT: 30000,
        MAX_RETRIES: 3,
        RETRY_DELAY: 2000,
        RANDOM_DELAY_MIN: 100,
        RANDOM_DELAY_MAX: 500
    };

    function getRandomUserAgent() {
        return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    }

    function randomDelay(min = CONFIG.RANDOM_DELAY_MIN, max = CONFIG.RANDOM_DELAY_MAX) {
        const ms = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    function escapeXml(unsafe) {
        if (!unsafe) return '';
        return unsafe.replace(/[<>&'"]/g, function(c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
                default: return c;
            }
        });
    }

    // Cơ chế chống Spam
    async function fetchWithRetry(url, options = {}, retries = CONFIG.MAX_RETRIES) {
        const headers = {
            'User-Agent': getRandomUserAgent(),
            'Accept': '*/*',
            ...options.headers
        };
        const fetchOptions = { ...options, headers: headers };

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await randomDelay();
                const response = await Promise.race([
                    fetch(url, fetchOptions),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), CONFIG.TIMEOUT))
                ]);

                if (!response.ok) throw new Error(`HTTP ${response.status} tại ${url}`);
                return response;
            } catch (error) {
                console.warn(`⚠️ Lỗi request (lần ${attempt}/${retries}):`, error.message);
                if (attempt < retries) {
                    await delay(CONFIG.RETRY_DELAY * attempt);
                    continue;
                }
                throw error;
            }
        }
        throw new Error(`Failed after ${retries} retries`);
    }

    // Tải ảnh (Dùng cho cả Ảnh bìa và Ảnh bên trong chương - Bỏ qua lỗi CORS)
    function fetchImageGM(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                responseType: 'blob',
                headers: { 'User-Agent': getRandomUserAgent() },
                onload: function(response) {
                    if (response.status === 200 && response.response) resolve(response.response);
                    else reject(new Error('Failed to fetch'));
                },
                onerror: reject
            });
        });
    }

    async function fetchImage(imageUrl) {
        try {
            const blob = await fetchImageGM(imageUrl);
            if (blob) return blob;
        } catch (e) {
            console.warn('GM_xmlhttpRequest thất bại khi tải ảnh:', e);
        }
        return null;
    }

    function restoreButtonState(btn) {
        btn.style.background = '#007bff';
        btn.textContent = "📥 Tải xuống EPUB";
        btn.disabled = false;
    }

    // ==========================================
    // CHẾ ĐỘ 1: ĐÓNG GÓI TỪ MỤC LỤC HTML
    // ==========================================
    function getChapterList() {
        const chapterEls = document.querySelectorAll('#vntqTocList .vntq-toc-item');
        if (!chapterEls || chapterEls.length === 0) throw new Error("Không tìm thấy danh sách chương!");
        
        let chapters = Array.from(chapterEls).map((el, index) => ({
            title: el.textContent.replace(/\s+/g, ' ').trim(),
            originalUrl: el.href,
            chapterNumber: index + 1
        }));

        // KIỂM TRA MỤC LỤC ẨN TỪ HEADER
        const headerH3 = document.querySelector('.vntq-modal-header h3');
        if (headerH3) {
            // Tìm con số trong ngoặc "Mục lục (1237 chương)"
            const match = headerH3.textContent.match(/\((\d+)\s*chương\)/i);
            if (match) {
                const totalChapters = parseInt(match[1], 10);
                if (totalChapters > chapters.length) {
                    console.log(`Phát hiện tổng số chương (${totalChapters}) lớn hơn mục lục hiện tại (${chapters.length}). Đang tiến hành nội suy danh sách...`);
                    
                    const firstChapUrl = chapters[0].originalUrl;
                    // Phân tách URL dựa trên chuỗi '/chuong-'
                    const urlMatch = firstChapUrl.match(/^(.*\/chuong-)(\d+)(.*)$/i);
                    
                    if (urlMatch) {
                        const prefix = urlMatch[1];
                        const suffix = urlMatch[3];
                        chapters = []; // Reset để tạo lại danh sách
                        
                        for (let i = 1; i <= totalChapters; i++) {
                            chapters.push({
                                title: `Chương ${i}`, // Tạm thời đặt tên, sẽ bị ghi đè sau
                                originalUrl: `${prefix}${i}${suffix}`,
                                chapterNumber: i
                            });
                        }
                    }
                }
            }
        }

        return chapters;
    }

    async function fetchChaptersWithRateLimit(chapters, zip, oebps, imagesFolder, updateProgress) {
        const results = [];
        let completed = 0;
        const total = chapters.length;
        const batchSize = 3; 

        for (let i = 0; i < chapters.length; i += batchSize) {
            const batch = chapters.slice(i, i + batchSize);
            const batchPromises = batch.map(async (chap) => {
                try {
                    await randomDelay(200, 800);
                    let chapterUrl = chap.originalUrl;
                    if (chapterUrl.startsWith('/')) chapterUrl = window.location.origin + chapterUrl;

                    const chapRes = await fetchWithRetry(chapterUrl);
                    const chapHtml = await chapRes.text();
                    const parser = new DOMParser();
                    const chapDoc = parser.parseFromString(chapHtml, "text/html");

                    // TÌM TÊN CHƯƠNG TỪ NỘI DUNG TRANG (Ưu tiên ghi đè lên tên mặc định)
                    const chuongSoEl = chapDoc.querySelector('.chuongso_a');
                    const tuaHoiEl = chapDoc.querySelector('.tuahoi_a');
                    let realTitle = "";
                    
                    if (chuongSoEl) {
                        realTitle += chuongSoEl.textContent.replace(/\s+/g, ' ').trim();
                    }
                    if (tuaHoiEl) {
                        realTitle += (realTitle ? " - " : "") + tuaHoiEl.textContent.replace(/\s+/g, ' ').trim();
                    }
                    
                    if (realTitle) {
                        chap.title = realTitle; // Cập nhật trực tiếp object reference
                    }

                    let contentDiv = chapDoc.querySelector('#vntqTextContent');
                    let cleanContent = contentDiv ? contentDiv.innerHTML : "<p>Không thể tải nội dung chương này.</p>";

                    // Xóa script và <br>
                    cleanContent = cleanContent
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<br\s*\/?>/gi, '<br/>');

                    // TÌM VÀ TẢI ẢNH OFFLINE
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = cleanContent;
                    const imgs = tempDiv.querySelectorAll('img');
                    
                    chap.images = []; // Thuộc tính mảng lưu tên file ảnh cục bộ
                    let imgCounter = 0;

                    for (const img of imgs) {
                        let src = img.getAttribute('src');
                        if (src) {
                            if (src.startsWith('//')) src = 'https:' + src;
                            else if (src.startsWith('/')) src = window.location.origin + src;
                            else if (!src.startsWith('http')) src = window.location.origin + '/' + src;

                            imgCounter++;
                            let ext = src.split('.').pop().split(/[#?]/)[0].toLowerCase();
                            if (!['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) ext = 'jpg';
                            
                            const localName = `img_chap${chap.chapterNumber}_${imgCounter}.${ext}`;
                            const localPath = `images/${localName}`;
                            
                            img.setAttribute('src', localPath);
                            
                            const imgBlob = await fetchImage(src);
                            if (imgBlob) {
                                imagesFolder.file(localName, imgBlob);
                                chap.images.push(localName);
                            }
                        }
                    }

                    cleanContent = tempDiv.innerHTML;

                    const xhtmlStr = `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <title>${escapeXml(chap.title)}</title>\n  <style type="text/css">\n    body { font-family: "Times New Roman", Times, serif; line-height: 1.8; padding: 20px; max-width: 800px; margin: 0 auto; }\n    h2 { text-align: center; font-size: 1.8em; margin-bottom: 30px; color: #333; }\n    p { text-indent: 2em; margin-bottom: 1em; }\n    img { max-width: 100%; height: auto; display: block; margin: 10px auto; }\n  </style>\n</head>\n<body>\n  <h2>${escapeXml(chap.title)}</h2>\n  ${cleanContent}\n</body>\n</html>`;

                    const fileName = `chuong-${chap.chapterNumber}.html`;
                    oebps.file(fileName, xhtmlStr);
                    return { ...chap, fileName, success: true };
                } catch (err) {
                    console.error(`Lỗi chương ${chap.title}:`, err);
                    return { ...chap, error: true };
                } finally {
                    completed++;
                    if (updateProgress) updateProgress(completed, total);
                }
            });

            await Promise.all(batchPromises);
            if (i + batchSize < chapters.length) await delay(1000 + Math.random() * 500);
        }
        return results;
    }

    async function startScrapingAndBuildingHTML(btn) {
        try {
            btn.textContent = "📂 Chọn thư mục...";
            let dirHandle;
            try {
                dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
            } catch (e) {
                btn.textContent = "❌ Đã hủy chọn";
                setTimeout(() => restoreButtonState(btn), 3000);
                return;
            }

            const zip = new JSZip();
            btn.textContent = "🔍 Đang trích xuất Metadata...";

            let tname = document.querySelector('.vntq-reader-title')?.textContent.trim() || document.title;
            let authorName = document.querySelector('.vntq-author-top a')?.textContent.trim() || 'Đang cập nhật';
            let alias = tname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-');
            let description = "Truyện tải từ vnthuquan.org";

            zip.file("mimetype", "application/epub+zip");
            zip.folder("META-INF").file("container.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n  <rootfiles>\n    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>\n  </rootfiles>\n</container>`);
            const oebps = zip.folder("OEBPS");
            const imagesFolder = oebps.folder("images");

            let coverSaved = false;
            const coverImg = document.querySelector('.vntq-large-cover-box img');
            if (coverImg && coverImg.src) {
                btn.textContent = "🖼️ Đang tải ảnh bìa...";
                let coverUrl = coverImg.src;
                if (coverUrl.startsWith('//')) coverUrl = 'https:' + coverUrl;
                else if (coverUrl.startsWith('/')) coverUrl = window.location.origin + coverUrl;
                
                const coverBlob = await fetchImage(coverUrl);
                if (coverBlob) {
                    imagesFolder.file("cover.jpg", coverBlob);
                    coverSaved = true;
                }
            }

            btn.textContent = `📋 Đang lấy danh sách chương...`;
            const allChapters = getChapterList();

            const coverXhtml = `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <title>Bìa truyện</title>\n  <style type="text/css">\n    body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #ffffff; text-align: center; font-family: "Times New Roman", Times, serif; }\n    .cover { padding: 40px; max-width: 600px; }\n    .title { font-size: 2.5em; margin-bottom: 20px; font-weight: bold; }\n    .author { font-size: 1.5em; margin-bottom: 10px; }\n    .divider { width: 100px; height: 3px; background: #000; margin: 20px auto; }\n  </style>\n</head>\n<body>\n  <div class="cover">\n    ${coverSaved ? `<img src="images/cover.jpg" style="max-width: 100%; max-height: 600px;" alt="Cover"/>` : ''}\n    <div class="title">${escapeXml(tname)}</div>\n    <div class="divider"></div>\n    <div class="author">${escapeXml(authorName)}</div>\n  </div>\n</body>\n</html>`;
            oebps.file("cover.xhtml", coverXhtml);

            btn.textContent = `📥 Đang tải ${allChapters.length} chương...`;
            let manifestItems = `    <item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml"/>\n`;
            if (coverSaved) manifestItems += `    <item id="cover-image" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>\n`;
            let spineItems = `    <itemref idref="cover-page"/>\n`;

            await fetchChaptersWithRateLimit(allChapters, zip, oebps, imagesFolder, (completed, total) => {
                if (completed % 5 === 0 || completed === total || completed === 1) {
                    btn.textContent = `📥 Đã tải ${completed}/${total} chương...`;
                }
            });

            let navXhtml = `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">\n<head><title>Mục lục</title></head>\n<body><nav epub:type="toc" id="toc"><h1>Mục lục</h1><ol>\n`;
            let tocNcx = `<?xml version="1.0" encoding="UTF-8"?><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="${alias}"/></head><docTitle><text>${escapeXml(tname)}</text></docTitle><navMap>\n`;

            // Khai báo chương và ảnh nội bộ vào manifest
            allChapters.forEach((chap, index) => {
                chap.fileName = `chuong-${chap.chapterNumber}.html`;
                manifestItems += `    <item id="chap_${index}" href="${chap.fileName}" media-type="application/xhtml+xml"/>\n`;
                spineItems += `    <itemref idref="chap_${index}"/>\n`;
                navXhtml += `<li><a href="${chap.fileName}">${escapeXml(chap.title)}</a></li>\n`;
                tocNcx += `<navPoint id="navPoint-${index + 1}" playOrder="${index + 1}"><navLabel><text>${escapeXml(chap.title)}</text></navLabel><content src="${chap.fileName}"/></navPoint>\n`;
                
                if (chap.images && chap.images.length > 0) {
                    chap.images.forEach((imgName, imgIdx) => {
                        let mime = 'image/jpeg';
                        if (imgName.endsWith('.png')) mime = 'image/png';
                        else if (imgName.endsWith('.gif')) mime = 'image/gif';
                        else if (imgName.endsWith('.webp')) mime = 'image/webp';
                        manifestItems += `    <item id="img_${index}_${imgIdx}" href="images/${imgName}" media-type="${mime}"/>\n`;
                    });
                }
            });
            
            navXhtml += `</ol></nav></body></html>`;
            tocNcx += `</navMap></ncx>`;
            oebps.file("nav.xhtml", navXhtml);
            oebps.file("toc.ncx", tocNcx);

            let opf = `<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id">\n  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n    <dc:title>${escapeXml(tname)}</dc:title>\n    <dc:creator id="creator">${escapeXml(authorName)}</dc:creator>\n    <dc:language>vi</dc:language>\n    <dc:identifier id="pub-id">${escapeXml(alias)}</dc:identifier>\n    <dc:description>${escapeXml(description)}</dc:description>\n    <dc:publisher>Vnthuquan</dc:publisher>\n    <dc:date>${new Date().toISOString().split('T')[0]}</dc:date>\n    ${coverSaved ? `<meta name="cover" content="cover-image"/>\n` : ''}  </metadata>\n  <manifest>\n    <item id="toc" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>\n    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n${manifestItems}  </manifest>\n  <spine toc="ncx">\n${spineItems}  </spine>\n</package>`;
            oebps.file("content.opf", opf);

            btn.textContent = "📦 Đang khởi tạo file EPUB...";
            const epubBlob = await zip.generateAsync({ type: "blob", mimeType: "application/epub+zip", compression: "STORE" }, 
                (metadata) => btn.textContent = `📦 Đang nén: ${metadata.percent.toFixed(1)}%`
            );

            const safeTname = tname.replace(/[\\/:*?"<>|]/g, '-');
            const safeAuthor = authorName.replace(/[\\/:*?"<>|]/g, '-');
            const epubFileName = `${safeTname} - ${safeAuthor}.epub`;

            const fileHandle = await dirHandle.getFileHandle(epubFileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(epubBlob);
            await writable.close();

            btn.style.background = '#28a745';
            btn.textContent = `🎉 Hoàn tất HTML to EPUB!`;
            setTimeout(() => restoreButtonState(btn), 5000);

        } catch (error) {
            console.error("Lỗi:", error);
            btn.style.background = '#dc3545';
            btn.textContent = `❌ Lỗi lấy HTML`;
            setTimeout(() => restoreButtonState(btn), 5000);
        }
    }

    // ==========================================
    // CHẾ ĐỘ 2: ĐÓNG GÓI TỪ BIBI SERVER
    // ==========================================
    async function repackBibiEpub(btn, iframeElement) {
        try {
            btn.textContent = "📂 Chọn thư mục lưu...";
            let dirHandle;
            try {
                dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
            } catch (e) {
                btn.textContent = "❌ Đã hủy chọn";
                setTimeout(() => restoreButtonState(btn), 3000);
                return;
            }

            btn.textContent = "⏳ Đang phân tích cấu trúc EPUB...";

            const srcUrl = iframeElement.getAttribute('data-src') || iframeElement.src;
            let searchParams = srcUrl.includes('?') ? srcUrl.split('?')[1] : '';
            const params = new URLSearchParams(searchParams);
            let bookPath = params.get('book');
            if (!bookPath) throw new Error("Không tìm thấy đường dẫn sách trong iframe.");

            let baseBookUrl = bookPath;
            if (!baseBookUrl.startsWith('http')) {
                baseBookUrl = window.location.origin + (baseBookUrl.startsWith('/') ? '' : '/') + baseBookUrl;
            }
            baseBookUrl = baseBookUrl.replace(/\/$/, '');

            const zip = new JSZip();
            zip.file("mimetype", "application/epub+zip");

            btn.textContent = "🔍 Đang đọc container.xml...";
            const containerRes = await fetchWithRetry(`${baseBookUrl}/META-INF/container.xml`);
            const containerXml = await containerRes.text();
            zip.folder("META-INF").file("container.xml", containerXml);

            const parser = new DOMParser();
            const containerDoc = parser.parseFromString(containerXml, "text/xml");
            const rootfile = containerDoc.querySelector("rootfile");
            if (!rootfile) throw new Error("Không tìm thấy OPF trong container.xml");
            const opfPath = rootfile.getAttribute("full-path");

            btn.textContent = "🔍 Đang đọc file OPF...";
            const opfRes = await fetchWithRetry(`${baseBookUrl}/${opfPath}`);
            const opfXml = await opfRes.text();
            zip.file(decodeURIComponent(opfPath), opfXml); 

            const opfDoc = parser.parseFromString(opfXml, "text/xml");
            const items = opfDoc.querySelectorAll("manifest item");
            
            let opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/')) : '';
            const opfBaseUrl = opfDir ? `${baseBookUrl}/${opfDir}` : baseBookUrl;

            const filesToDownload = Array.from(items).map(item => item.getAttribute("href")).filter(h => h);

            let completed = 0;
            const totalFiles = filesToDownload.length;
            btn.textContent = `📥 Đang tải tài nguyên (0/${totalFiles})...`;

            for (let i = 0; i < totalFiles; i += CONFIG.MAX_CONCURRENT) {
                const batch = filesToDownload.slice(i, i + CONFIG.MAX_CONCURRENT);
                await Promise.all(batch.map(async (href) => {
                    try {
                        const fileUrl = `${opfBaseUrl}/${href}`;
                        const zipFilePath = opfDir ? `${opfDir}/${href}` : href;
                        const decodedZipPath = decodeURIComponent(zipFilePath);

                        const res = await fetchWithRetry(fileUrl);
                        const blob = await res.blob();
                        zip.file(decodedZipPath, blob);
                    } catch (e) {
                        console.warn(`Lỗi tải file ${href}:`, e);
                    } finally {
                        completed++;
                    }
                }));
                btn.textContent = `📥 Đang tải tài nguyên (${completed}/${totalFiles})...`;
                await delay(100 + Math.random() * 200); 
            }

            btn.textContent = "📦 Đang nén file EPUB...";
            const epubBlob = await zip.generateAsync({ type: "blob", mimeType: "application/epub+zip", compression: "DEFLATE" }, 
                (metadata) => btn.textContent = `📦 Đang nén: ${metadata.percent.toFixed(1)}%`
            );

            let title = opfDoc.querySelector("dc\\:title, title")?.textContent;
            if (!title) title = document.querySelector('.vntq-reader-title')?.textContent.trim() || "Truyen_vnthuquan";
            const safeTitle = title.replace(/[\\/:*?"<>|]/g, '-');
            const epubFileName = `${safeTitle}.epub`;

            const fileHandle = await dirHandle.getFileHandle(epubFileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(epubBlob);
            await writable.close();

            btn.style.background = '#28a745';
            btn.textContent = `🎉 Hoàn tất Repack EPUB!`;
            setTimeout(() => restoreButtonState(btn), 5000);

        } catch (error) {
            console.error("Lỗi đóng gói từ Bibi:", error);
            btn.style.background = '#dc3545';
            btn.textContent = `❌ Lỗi Repack (Xem F12)`;
            setTimeout(() => restoreButtonState(btn), 5000);
        }
    }

    // ==========================================
    // KHỞI TẠO NÚT BẤM (QUẢN LÝ ĐIỀU KIỆN XUẤT HIỆN)
    // ==========================================
    function setupButton() {
        const checkExist = setInterval(() => {
            const htmlChapterEls = document.querySelectorAll('#vntqTocList .vntq-toc-item');
            const epubIframeEl = document.querySelector('iframe#epubIframe');
            
            if ((htmlChapterEls && htmlChapterEls.length > 0) || epubIframeEl) {
                clearInterval(checkExist); 

                if (document.getElementById('vntq-epub-btn')) return;

                const btn = document.createElement('button');
                btn.id = 'vntq-epub-btn';
                btn.innerHTML = '📥 Tải xuống EPUB';
                btn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; z-index: 999999; padding: 12px 24px; background: #007bff; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: all 0.3s;';
                
                btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
                btn.onmouseout = () => btn.style.transform = 'scale(1)';

                document.body.appendChild(btn);

                btn.addEventListener('click', async () => {
                    if (btn.disabled) return;
                    btn.disabled = true;
                    
                    if (htmlChapterEls && htmlChapterEls.length > 0) {
                        console.log("Đã tìm thấy mục lục HTML -> Chạy chế độ Scraping & Building.");
                        await startScrapingAndBuildingHTML(btn);
                    } else if (epubIframeEl) {
                        console.log("Đã tìm thấy iframe Epub -> Chạy chế độ Bibi Repacker.");
                        await repackBibiEpub(btn, epubIframeEl);
                    }
                });
                
                console.log("✅ Điều kiện thỏa mãn. Nút tải đã được hiển thị.");
            }
        }, 1000); 
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupButton);
    } else {
        setupButton();
    }
})();