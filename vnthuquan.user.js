// ==UserScript==
// @name         Vnthuquan EPUB Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tải truyện từ vnthuquan.org về dạng EPUB
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

    // Cấu hình
    const CONFIG = {
        MAX_CONCURRENT: 3,
        TIMEOUT: 30000,
        MAX_RETRIES: 3,
        RETRY_DELAY: 2000,
        RANDOM_DELAY_MIN: 100,
        RANDOM_DELAY_MAX: 500
    };

    // Hàm lấy User-Agent ngẫu nhiên
    function getRandomUserAgent() {
        return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    }

    // Hàm delay ngẫu nhiên
    function randomDelay(min = CONFIG.RANDOM_DELAY_MIN, max = CONFIG.RANDOM_DELAY_MAX) {
        const ms = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    // Hàm escape XML
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

    // Hàm fetch với retry và User-Agent ngẫu nhiên
    async function fetchWithRetry(url, options = {}, retries = CONFIG.MAX_RETRIES) {
        const userAgent = getRandomUserAgent();
        const headers = {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
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

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
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

    // Tải ảnh bìa
    function fetchCoverImageGM(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                responseType: 'blob',
                headers: { 'User-Agent': getRandomUserAgent() },
                onload: function(response) {
                    if (response.status === 200 && response.response) {
                        resolve(response.response);
                    } else {
                        reject(new Error('Failed to fetch'));
                    }
                },
                onerror: reject
            });
        });
    }

    async function fetchCoverImage(coverUrl) {
        try {
            const blob = await fetchCoverImageGM(coverUrl);
            if (blob) return blob;
        } catch (e) {
            console.warn('GM_xmlhttpRequest thất bại:', e);
        }
        return null;
    }

    // Lấy danh sách chương từ DOM HTML đã cung cấp
    function getChapterList() {
        const chapterEls = document.querySelectorAll('#vntqTocList .vntq-toc-item');
        if (!chapterEls || chapterEls.length === 0) {
            throw new Error("Không tìm thấy danh sách chương! Vui lòng mở mục lục hoặc đợi trang tải xong.");
        }

        return Array.from(chapterEls).map((el, index) => {
            return {
                title: el.textContent.replace(/\s+/g, ' ').trim(), // Làm sạch khoảng trắng thừa trong HTML
                originalUrl: el.href,
                chapterNumber: index + 1
            };
        });
    }

    // Hàm tải nhiều chương
    async function fetchChaptersWithRateLimit(chapters, zip, oebps, updateProgress) {
        const results = [];
        let completed = 0;
        const total = chapters.length;
        const batchSize = CONFIG.MAX_CONCURRENT;

        for (let i = 0; i < chapters.length; i += batchSize) {
            const batch = chapters.slice(i, i + batchSize);
            const batchPromises = batch.map(async (chap) => {
                try {
                    await randomDelay(200, 800);
                    const result = await fetchSingleChapter(chap, zip, oebps);
                    return result;
                } catch (err) {
                    console.error(`Lỗi chương ${chap.title}:`, err);
                    return { ...chap, error: true };
                } finally {
                    completed++;
                    if (updateProgress) updateProgress(completed, total);
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);

            if (i + batchSize < chapters.length) {
                await delay(1000 + Math.random() * 500);
            }
        }
        return results;
    }

    // Hàm tải 1 chương
    async function fetchSingleChapter(chap, zip, oebps) {
        let chapterUrl = chap.originalUrl;
        if (chapterUrl.startsWith('/')) {
            chapterUrl = window.location.origin + chapterUrl;
        } else if (!chapterUrl.startsWith('http')) {
            chapterUrl = window.location.origin + '/' + chapterUrl;
        }

        console.log(`📖 Đang tải: ${chap.title} - ${chapterUrl}`);
        const chapRes = await fetchWithRetry(chapterUrl);
        const chapHtml = await chapRes.text();

        const parser = new DOMParser();
        const chapDoc = parser.parseFromString(chapHtml, "text/html");

        let contentDiv = chapDoc.querySelector('#vntqTextContent');
        let cleanContent = '';

        if (contentDiv) {
            cleanContent = contentDiv.innerHTML;
        } else {
            cleanContent = "<p>Không thể tải nội dung chương này.</p>";
        }

        cleanContent = cleanContent
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<br\s*\/?>/gi, '<br/>')
            .replace(/src="\//gi, 'src="https://vnthuquan.org/');

        const xhtmlStr = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeXml(chap.title)}</title>
  <style type="text/css">
    body { font-family: "Times New Roman", Times, serif; line-height: 1.8; padding: 20px; max-width: 800px; margin: 0 auto; }
    h2 { text-align: center; font-size: 1.8em; margin-bottom: 30px; color: #333; }
    p { text-indent: 2em; margin-bottom: 1em; }
    img { max-width: 100%; height: auto; display: block; margin: 10px auto; }
  </style>
</head>
<body>
  <h2>${escapeXml(chap.title)}</h2>
  ${cleanContent}
</body>
</html>`;

        const fileName = `chuong-${chap.chapterNumber}.html`;
        oebps.file(fileName, xhtmlStr);
        return { ...chap, fileName, success: true };
    }

    // Khởi tạo nút bấm nổi
    function setupButton() {
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
            await startScrapingAndBuilding(btn);
            btn.disabled = false;
        });
    }

    // Luồng xử lý chính
    async function startScrapingAndBuilding(btn) {
        const startTime = Date.now();

        try {
            btn.textContent = "📂 Chọn thư mục...";
            let dirHandle;
            try {
                dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
            } catch (e) {
                btn.textContent = "❌ Đã hủy chọn thư mục";
                setTimeout(() => btn.textContent = "📥 Tải xuống EPUB", 3000);
                return;
            }

            const zip = new JSZip();
            btn.textContent = "🔍 Đang trích xuất Metadata...";

            // --- 1. LẤY THÔNG TIN METADATA ---
            let tname = document.querySelector('.vntq-reader-title')?.textContent.trim() || document.title;
            let authorName = document.querySelector('.vntq-author-top a')?.textContent.trim() || 'Đang cập nhật';
            let alias = tname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-');
            let description = "Truyện tải từ vnthuquan.org";

            // --- 2. TẠO CẤU TRÚC ZIP ---
            zip.file("mimetype", "application/epub+zip");
            const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;
            zip.folder("META-INF").file("container.xml", containerXml);
            const oebps = zip.folder("OEBPS");
            const imagesFolder = oebps.folder("images");

            // --- 3. TẢI ẢNH BÌA ---
            let coverSaved = false;
            const coverImg = document.querySelector('.vntq-large-cover-box img');
            if (coverImg && coverImg.src) {
                btn.textContent = "🖼️ Đang tải ảnh bìa...";
                try {
                    let coverUrl = coverImg.src;
                    if (coverUrl.startsWith('//')) coverUrl = 'https:' + coverUrl;
                    else if (coverUrl.startsWith('/')) coverUrl = window.location.origin + coverUrl;
                    
                    const coverBlob = await fetchCoverImage(coverUrl);
                    if (coverBlob) {
                        imagesFolder.file("cover.jpg", coverBlob);
                        coverSaved = true;
                    }
                } catch (err) { console.error('Lỗi tải ảnh bìa:', err); }
            }

            // --- 4. LẤY DANH SÁCH CHƯƠNG TỪ DOM ---
            btn.textContent = `📋 Đang lấy danh sách chương...`;
            const allChapters = getChapterList();

            // --- 5. TẠO COVER XHTML ---
            const coverXhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Bìa truyện</title>
  <style type="text/css">
    body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #ffffff; text-align: center; font-family: "Times New Roman", Times, serif; }
    .cover { padding: 40px; max-width: 600px; }
    .title { font-size: 2.5em; margin-bottom: 20px; font-weight: bold; }
    .author { font-size: 1.5em; margin-bottom: 10px; }
    .divider { width: 100px; height: 3px; background: #000; margin: 20px auto; }
  </style>
</head>
<body>
  <div class="cover">
    ${coverSaved ? `<img src="images/cover.jpg" style="max-width: 100%; max-height: 600px;" alt="Cover"/>` : ''}
    <div class="title">${escapeXml(tname)}</div>
    <div class="divider"></div>
    <div class="author">${escapeXml(authorName)}</div>
  </div>
</body>
</html>`;
            oebps.file("cover.xhtml", coverXhtml);

            // --- 6. TẢI NỘI DUNG CHƯƠNG ---
            btn.textContent = `📥 Đang tải ${allChapters.length} chương...`;
            let manifestItems = `    <item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml"/>\n`;
            if (coverSaved) manifestItems += `    <item id="cover-image" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>\n`;
            let spineItems = `    <itemref idref="cover-page"/>\n`;

            const updateProgress = (completed, total) => {
                if (completed % 5 === 0 || completed === total || completed === 1) {
                    btn.textContent = `📥 Đã tải ${completed}/${total} chương...`;
                }
            };

            await fetchChaptersWithRateLimit(allChapters, zip, oebps, updateProgress);

            allChapters.forEach((chap, index) => {
                chap.fileName = `chuong-${chap.chapterNumber}.html`;
                manifestItems += `    <item id="chap_${index}" href="${chap.fileName}" media-type="application/xhtml+xml"/>\n`;
                spineItems += `    <itemref idref="chap_${index}"/>\n`;
            });

            // --- 7. TẠO NAVIGATION ---
            btn.textContent = "⚙️ Đang tạo cấu trúc Metadata...";
            let navXhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Mục lục</title></head>
<body><nav epub:type="toc" id="toc"><h1>Mục lục</h1><ol>\n`;
            allChapters.forEach(chap => { navXhtml += `<li><a href="${chap.fileName}">${escapeXml(chap.title)}</a></li>\n`; });
            navXhtml += `</ol></nav></body></html>`;
            oebps.file("nav.xhtml", navXhtml);

            let tocNcx = `<?xml version="1.0" encoding="UTF-8"?><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="${alias}"/></head><docTitle><text>${escapeXml(tname)}</text></docTitle><navMap>\n`;
            allChapters.forEach((chap, index) => {
                tocNcx += `<navPoint id="navPoint-${index + 1}" playOrder="${index + 1}"><navLabel><text>${escapeXml(chap.title)}</text></navLabel><content src="${chap.fileName}"/></navPoint>\n`;
            });
            tocNcx += `</navMap></ncx>`;
            oebps.file("toc.ncx", tocNcx);

            let opf = `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${escapeXml(tname)}</dc:title>
    <dc:creator id="creator">${escapeXml(authorName)}</dc:creator>
    <dc:language>vi</dc:language>
    <dc:identifier id="pub-id">${escapeXml(alias)}</dc:identifier>
    <dc:description>${escapeXml(description)}</dc:description>
    <dc:publisher>Vnthuquan</dc:publisher>
    <dc:date>${new Date().toISOString().split('T')[0]}</dc:date>
    ${coverSaved ? `<meta name="cover" content="cover-image"/>` : ''}
  </metadata>
  <manifest>
    <item id="toc" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
${manifestItems}  </manifest>
  <spine toc="ncx">
${spineItems}  </spine>
</package>`;
            oebps.file("content.opf", opf);

            // --- 8. NÉN VÀ LƯU FILE ---
            btn.textContent = "📦 Đang khởi tạo file EPUB...";
            const epubBlob = await zip.generateAsync({ type: "blob", mimeType: "application/epub+zip", compression: "STORE" }, 
                function updateCallback(metadata) { btn.textContent = `📦 Đang nén: ${metadata.percent.toFixed(1)}%`; }
            );

            const safeTname = tname.replace(/[\\/:*?"<>|]/g, '-');
            const safeAuthor = authorName.replace(/[\\/:*?"<>|]/g, '-');
            const epubFileName = `${safeTname} - ${safeAuthor}.epub`;

            const fileHandle = await dirHandle.getFileHandle(epubFileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(epubBlob);
            await writable.close();

            btn.style.background = '#28a745';
            btn.textContent = `🎉 Hoàn tất ${allChapters.length} chương!`;
            setTimeout(() => {
                btn.style.background = '#007bff';
                btn.textContent = "📥 Tải xuống EPUB";
            }, 5000);

        } catch (error) {
            console.error("Lỗi:", error);
            btn.style.background = '#dc3545';
            btn.textContent = `❌ Lỗi: Xem F12`;
            setTimeout(() => {
                btn.style.background = '#007bff';
                btn.textContent = "📥 Tải xuống EPUB";
            }, 5000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupButton);
    } else {
        setupButton();
    }
})();