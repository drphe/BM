// ==UserScript==
// @name         Truyenhoan EPUB Downloader
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  Tải truyện từ Truyenhoan về dạng EPUB
// @author       BS Phê
// @match        https://truyenhoan.com/*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.9.1/jszip.min.js
// @updateURL    https://vnindex.vercel.app/truyenhoan.user.js
// @downloadURL  https://vnindex.vercel.app/truyenhoan.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Danh sách User-Agent để xoay vòng
    const USER_AGENTS = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/113.0',
        'Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-N910F Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 7.0; HTC 10 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36',
        'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
    ];

    // Cấu hình
    const CONFIG = {
        MAX_CONCURRENT: 3,
        DELAY_BETWEEN_PAGES: 300,
        DELAY_BETWEEN_CHAPS: 200,
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
            'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0',
            ...options.headers
        };

        const fetchOptions = {
            ...options,
            headers: headers,
            credentials: 'include'
        };

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await randomDelay();

                const response = await Promise.race([
                    fetch(url, fetchOptions),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), CONFIG.TIMEOUT)
                    )
                ]);

                if (response.status === 503) {
                    console.warn(`⚠️ Lỗi 503, thử lại ${attempt}/${retries}...`);
                    if (attempt < retries) {
                        await delay(CONFIG.RETRY_DELAY * attempt);
                        continue;
                    }
                }

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

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

    // Hàm fetch JSON
    async function fetchJSON(url, options = {}) {
        const response = await fetchWithRetry(url, {
            ...options,
            headers: {
                'Accept': 'application/json',
                ...options.headers
            }
        });
        return await response.json();
    }

    // Tải ảnh bìa
    function fetchCoverImageGM(url) {
        return new Promise((resolve, reject) => {
            const userAgent = getRandomUserAgent();
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                responseType: 'blob',
                headers: {
                    'User-Agent': userAgent
                },
                onload: function(response) {
                    if (response.status === 200 && response.response) {
                        const blob = response.response;
                        if (blob.type.startsWith('image/')) {
                            resolve(blob);
                        } else {
                            reject(new Error('Not an image'));
                        }
                    } else {
                        reject(new Error('Failed to fetch'));
                    }
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    async function fetchCoverImage(coverUrl) {
        try {
            try {
                const blob = await fetchCoverImageGM(coverUrl);
                if (blob) return blob;
            } catch (e) {
                console.warn('GM_xmlhttpRequest thất bại:', e);
            }

            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.referrerPolicy = 'no-referrer';

                const timeout = setTimeout(() => {
                    resolve(null);
                }, 10000);

                img.onload = function() {
                    clearTimeout(timeout);
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob(function(blob) {
                            resolve(blob && blob.type && blob.type.startsWith('image/') ? blob : null);
                        }, 'image/jpeg', 0.9);
                    } catch (e) {
                        resolve(null);
                    }
                };
                img.onerror = function() {
                    clearTimeout(timeout);
                    resolve(null);
                };
                img.src = coverUrl;
            });
        } catch (error) {
            return null;
        }
    }

    // Hàm lấy storyID và storyAlias từ script
    function getStoryInfo() {
        // Lấy từ tất cả script tags
        const scripts = document.querySelectorAll('script');
        for (let script of scripts) {
            const content = script.textContent;
            // Tìm kiếm pattern: storyID=XXX; storyAlias='XXX'
            const match = content.match(/storyID\s*=\s*(\d+);\s*storyAlias\s*=\s*['"]([^'"]+)['"]/);
            if (match) {
                return {
                    storyID: parseInt(match[1]),
                    storyAlias: match[2]
                };
            }
        }

        return null;
    }

    // Hàm lấy tên truyện từ DOM
    function getStoryTitle() {
        // Thử các selector khác nhau
        const selectors = [
            'h1.title[itemprop="name"]',
            'h1.title',
            '.title-page',
            '.info-holder .info h3',
            '.book-title',
            'h1.title'
        ];

        for (let selector of selectors) {
            const el = document.querySelector(selector);
            if (el && el.textContent.trim()) {
                return el.textContent.trim();
            }
        }

        // Nếu không tìm thấy, lấy từ title của page
        const title = document.querySelector('title');
        if (title) {
            const match = title.textContent.match(/^(.*?)\s*-\s*TruyenFull/);
            if (match) {
                return match[1].trim();
            }
        }

        return null;
    }

    // Hàm lấy tên tác giả từ DOM
    function getAuthorName() {
        // Thử các selector khác nhau
        const selectors = [
            'a[itemprop="author"]',
            '.info-holder a[href*="tac-gia"]',
            '.info-chitiet a[href*="tac-gia"]',
            '.info-holder .info-chitiet:first-child a',
            '.author-name a'
        ];

        for (let selector of selectors) {
            const el = document.querySelector(selector);
            if (el && el.textContent.trim()) {
                return el.textContent.trim();
            }
        }

        // Tìm trong tất cả info-chitiet
        const items = document.querySelectorAll('.info-chitiet');
        for (let item of items) {
            const label = item.querySelector('h3');
            if (label && label.textContent.includes('Tác giả')) {
                const link = item.querySelector('a');
                if (link) {
                    return link.textContent.trim();
                }
                const span = item.querySelector('span');
                if (span) {
                    return span.textContent.trim();
                }
            }
        }

        return "Đang cập nhật";
    }

    // Hàm lấy danh sách chương từ API
    async function fetchChapterListAPI(storyID, storyAlias) {
        const url = `https://truyenhoan.com/api/chapters/${storyID}/1/500000`;
        try {
            console.log(`📡 Đang gọi API: ${url}`);
            const data = await fetchJSON(url);
            console.log('📡 Dữ liệu API:', data);

            if (data && data.items && Array.isArray(data.items) && data.items.length > 0) {
                // Sắp xếp theo chapterID tăng dần
                const chapters = data.items.sort((a, b) => parseInt(a.chapterID) - parseInt(b.chapterID));

                // Đánh số thứ tự từ 1
                return chapters.map((item, index) => {
                    const chapterNumber = index + 1; // STT bắt đầu từ 1
                    let title = item.chapter_name || `Chương ${chapterNumber}`;

                    // Nếu tên chương bị rỗng hoặc chỉ là số, tạo lại
                    if (!title.trim() || /^\d+$/.test(title.trim())) {
                        title = `Chương ${chapterNumber}`;
                    }

                    return {
                        chapterID: item.chapterID,
                        title: title,
                        originalUrl: `/${storyAlias}/chuong-${index+1}.html`,
                        chapterNumber: chapterNumber,
                        sortOrder: index
                    };
                });
            }
            return [];
        } catch (error) {
            console.error('Lỗi lấy danh sách chương từ API:', error);
            throw new Error(`Không thể lấy danh sách chương: ${error.message}`);
        }
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
                    if (updateProgress) {
                        updateProgress(completed, total);
                    }
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

        let contentDiv = chapDoc.querySelector('#chapter-c');
        let cleanContent = '';

        if (contentDiv) {
            cleanContent = contentDiv.innerHTML;
        } else {
            const possibleContent = chapDoc.querySelector('.chapter-content') ||
                                   chapDoc.querySelector('.content') ||
                                   chapDoc.querySelector('#content');
            if (possibleContent) {
                cleanContent = possibleContent.innerHTML;
            } else {
                cleanContent = "<p>Không thể tải nội dung chương này.</p>";
            }
        }

        cleanContent = cleanContent
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<br\s*\/?>/gi, '<br/>')
            .replace(/<img[^>]*src="\/\//gi, '<img src="https://')
            .replace(/src="\//gi, 'src="https://truyenhoan.com/');

        const xhtmlStr = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeXml(chap.title)}</title>
  <style type="text/css">
    body {
      font-family: "Times New Roman", Times, serif;
      line-height: 1.8;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h2 {
      text-align: center;
      font-size: 1.8em;
      margin-bottom: 30px;
      color: #333;
    }
    p {
      text-indent: 2em;
      margin-bottom: 1em;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 10px auto;
    }
  </style>
</head>
<body>
  <h2>${escapeXml(chap.title)}</h2>
  ${cleanContent}
</body>
</html>`;

        // Sử dụng số thứ tự để đặt tên file
        const fileName = `chuong-${chap.chapterNumber}.html`;
        oebps.file(fileName, xhtmlStr);
        return { ...chap, fileName, success: true };
    }

    // Khởi tạo nút bấm
    function initEpubDownloader() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupButton);
        } else {
            setupButton();
        }
    }

    function setupButton() {
        const checkExist = setInterval(() => {
            const infoHolder = document.querySelector('.info-holder');
            if (infoHolder) {
                clearInterval(checkExist);

                if (document.getElementById('epub-download-btn')) {
                    return;
                }

                const btnContainer = document.createElement('div');
                btnContainer.className = 'panel-group books';
                btnContainer.style.marginTop = '15px';
                btnContainer.style.width = '400px';
                btnContainer.innerHTML = `<a class="btn btn-primary" href="javascript:void(0)" id="epub-download-btn" style=" font-weight: bold; font-size: 16px;">📥 Tải xuống EPUB</a>`;
                infoHolder.appendChild(btnContainer);

                const downloadBtn = document.getElementById('epub-download-btn');

                downloadBtn.addEventListener('click', async () => {
                    if (downloadBtn.classList.contains('disabled')) return;
                    downloadBtn.classList.add('disabled');
                    downloadBtn.style.pointerEvents = 'none';

                    await startScrapingAndBuilding(downloadBtn);

                    downloadBtn.classList.remove('disabled');
                    downloadBtn.style.pointerEvents = 'auto';
                });

                console.log("✅ Đã khởi tạo nút 'Tải xuống EPUB'!");
            }
        }, 500);
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
                return;
            }

            const zip = new JSZip();

            btn.textContent = "🔍 Đang trích xuất Metadata...";

            // --- 1. LẤY THÔNG TIN METADATA ---
            const storyInfo = getStoryInfo();
            if (!storyInfo) {
                throw new Error("Không tìm thấy storyID và storyAlias. Vui lòng tải lại trang.");
            }

            const { storyID, storyAlias: alias } = storyInfo;
            console.log(`📌 StoryID: ${storyID}, StoryAlias: ${alias}`);

            // Lấy tên truyện
            let tname = getStoryTitle();
            if (!tname) {
                tname = alias.replace(/-/g, ' ');
            }
            console.log(`📌 Tên truyện: ${tname}`);

            // Lấy tác giả
            let authorName = getAuthorName();
            console.log(`📌 Tác giả: ${authorName}`);

            // Lấy thể loại
            const genreEls = document.querySelectorAll('a[itemprop="genre"]');
            const genres = Array.from(genreEls).map(g => g.textContent.trim());

            // Lấy description
            let description = "Truyện lấy từ Truyenfull";
            const descEl = document.querySelector('.desc-text[itemprop="description"]') ||
                          document.querySelector('.desc-text');
            if (descEl) {
                description = descEl.textContent.trim();
                description = escapeXml(description);
            }

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
            const coverImg = document.querySelector('.books .book img');

            if (coverImg && coverImg.src) {
                btn.textContent = "🖼️ Đang tải ảnh bìa...";

                try {
                    let coverUrl = coverImg.src;

                    if (coverUrl.startsWith('//')) {
                        coverUrl = 'https:' + coverUrl;
                    } else if (coverUrl.startsWith('/')) {
                        coverUrl = window.location.origin + coverUrl;
                    }

                    const coverBlob = await fetchCoverImage(coverUrl);

                    if (coverBlob) {
                        imagesFolder.file("cover.jpg", coverBlob);
                        coverSaved = true;
                        console.log('✅ Đã lưu ảnh bìa vào EPUB');
                    }
                } catch (err) {
                    console.error('Lỗi tải ảnh bìa:', err);
                }
            }

            // --- 4. LẤY DANH SÁCH CHƯƠNG TỪ API ---
            btn.textContent = `📋 Đang lấy danh sách chương...`;
            console.time('Lấy danh sách chương');
            const allChapters = await fetchChapterListAPI(storyID, alias);
            console.timeEnd('Lấy danh sách chương');

            if (allChapters.length === 0) {
                throw new Error("Không tìm thấy chương nào! Kiểm tra API response.");
            }

            console.log(`📚 Tìm thấy ${allChapters.length} chương`);
            console.log(`📚 Chương đầu: ${allChapters[0].title} (Số thứ tự: ${allChapters[0].chapterNumber})`);
            console.log(`📚 Chương cuối: ${allChapters[allChapters.length-1].title} (Số thứ tự: ${allChapters[allChapters.length-1].chapterNumber})`);

            // --- 5. TẠO COVER ---
            const coverXhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Bìa truyện</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #ffffff;
      color: #000000;
      font-family: "Times New Roman", Times, serif;
    }
    .cover {
      text-align: center;
      color: #000;
      padding: 40px;
      max-width: 600px;
    }
    .title {
      font-size: 2.5em;
      margin-bottom: 20px;
    }
    .author {
      font-size: 1.5em;
      opacity: 0.9;
      margin-bottom: 10px;
    }
    .divider {
      width: 100px;
      height: 3px;
      background: #000;
      margin: 20px auto;
      opacity: 0.6;
    }
    .info {
      font-size: 1em;
      opacity: 0.7;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="cover">
    ${coverSaved ? `<svg xmlns="http://www.w3.org/2000/svg" height="100%" version="1.1" viewBox="0 0 600 800" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink">
    <image height="800" width="600" xlink:href="images/cover.jpg"></image>
  </svg>` : ''}
    <div class="title">${escapeXml(tname)}</div>
    <div class="divider"></div>
    <div class="author">${escapeXml(authorName)}</div>
    <div class="info">TruyenFull</div>
  </div>
</body>
</html>`;
            oebps.file("cover.xhtml", coverXhtml);

            // --- 6. TẢI NỘI DUNG CHƯƠNG ---
            btn.textContent = `📥 Đang tải ${allChapters.length} chương...`;
            console.time('Tải nội dung chương');

            let manifestItems = '';
            let spineItems = '';

            manifestItems += `    <item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml"/>\n`;
            if (coverSaved && imagesFolder.files && imagesFolder.files['cover.jpg']) {
                manifestItems += `    <item id="cover-image" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>\n`;
            }
            spineItems += `    <itemref idref="cover-page"/>\n`;

            let processedCount = 0;
            const updateProgress = (completed, total) => {
                processedCount = completed;
                if (completed % 5 === 0 || completed === total || completed === 1) {
                    btn.textContent = `📥 Đã tải ${completed}/${total} chương...`;
                }
            };

            // Gán fileName cho từng chương dựa trên số thứ tự
            allChapters.forEach((chap) => {
                chap.fileName = `chuong-${chap.chapterNumber}.html`;
            });

            await fetchChaptersWithRateLimit(allChapters, zip, oebps, updateProgress);
            console.timeEnd('Tải nội dung chương');

            // Xây dựng manifest và spine
            allChapters.forEach((chap, index) => {
                manifestItems += `    <item id="chap_${index}" href="${chap.fileName}" media-type="application/xhtml+xml"/>\n`;
                spineItems += `    <itemref idref="chap_${index}"/>\n`;
            });

            // --- 7. TẠO NAVIGATION ---
            btn.textContent = "⚙️ Đang tạo cấu trúc Metadata...";

            let navXhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Mục lục</title>
  <style type="text/css">
    body { font-family: "Times New Roman", Times, serif; padding: 20px; }
    h1 { text-align: center; font-size: 2em; }
    ol { list-style-type: none; padding: 0; }
    li { margin: 10px 0; }
    a { text-decoration: none; color: #0066cc; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Mục lục</h1>
    <ol>\n`;

            allChapters.forEach((chap) => {
                navXhtml += `      <li><a href="${chap.fileName}">${escapeXml(chap.title)}</a></li>\n`;
            });

            navXhtml += `    </ol>
  </nav>
</body>
</html>`;
            oebps.file("nav.xhtml", navXhtml);

            let tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${alias}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${escapeXml(tname)}</text>
  </docTitle>
  <navMap>\n`;

            allChapters.forEach((chap, index) => {
                tocNcx += `    <navPoint id="navPoint-${index + 1}" playOrder="${index + 1}">
      <navLabel>
        <text>${escapeXml(chap.title)}</text>
      </navLabel>
      <content src="${chap.fileName}"/>
    </navPoint>\n`;
            });

            tocNcx += `  </navMap>
</ncx>`;
            oebps.file("toc.ncx", tocNcx);

            let opf = `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${escapeXml(tname)}</dc:title>
    <dc:creator id="creator">${escapeXml(authorName)}</dc:creator>
    <dc:language>vi</dc:language>
    <dc:identifier id="pub-id">${escapeXml(alias)}</dc:identifier>
    <dc:description>${escapeXml(description)}</dc:description>
    <dc:publisher>TruyenFull</dc:publisher>
    <dc:date>${new Date().toISOString().split('T')[0]}</dc:date>\n`;

            genres.forEach(g => {
                opf += `    <dc:subject>${escapeXml(g)}</dc:subject>\n`;
            });

            if (coverSaved) {
                opf += `    <meta name="cover" content="cover-image"/>\n`;
            }

            opf += `  </metadata>
  <manifest>
    <item id="toc" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n`;

            opf += manifestItems;
            opf += `  </manifest>
  <spine toc="ncx">\n`;

            opf += spineItems;
            opf += `  </spine>
</package>`;
            oebps.file("content.opf", opf);

            // --- 8. NÉN VÀ LƯU FILE ---
            btn.textContent = "📦 Đang khởi tạo file EPUB...";
            console.time('Nén và lưu file');

            const epubBlob = await zip.generateAsync({
                type: "blob",
                mimeType: "application/epub+zip",
                compression: "STORE"
            }, function updateCallback(metadata) {
                btn.textContent = `📦 Đang nén: ${metadata.percent.toFixed(1)}%`;
            });

            console.timeEnd('Nén và lưu file');

            if (!epubBlob || epubBlob.size === 0) {
                throw new Error('File EPUB rỗng');
            }

            console.log(`📦 Kích thước EPUB: ${(epubBlob.size / 1024 / 1024).toFixed(2)} MB`);

            const safeTname = tname.replace(/[\\/:*?"<>|]/g, '-');
            const safeAuthor = authorName.replace(/[\\/:*?"<>|]/g, '-');
            const epubFileName = `${safeTname} - ${safeAuthor}.epub`;

            const fileHandle = await dirHandle.getFileHandle(epubFileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(epubBlob);
            await writable.close();

            const totalSeconds = (Date.now() - startTime) / 1000;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.round(totalSeconds % 60);
            const timeString = minutes > 0 ? `${minutes}p ${seconds}s` : `${seconds}s`;
            let textAlert = `🎉 Hoàn tất! ${timeString} - ${allChapters.length} chương`;
            btn.textContent = textAlert;
            btn.classList.remove('btn-primary', 'btn-danger');
            btn.classList.add('btn-success');
            alert(textAlert);
            setTimeout(() => {
                btn.textContent = "📥 Tải xuống EPUB";
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
            }, 5000);

        } catch (error) {
            console.error("Lỗi:", error);
            btn.textContent = `❌ Lỗi: ${error.message || 'Xem Console'}`;
            btn.classList.remove('btn-primary', 'btn-success');
            btn.classList.add('btn-danger');

            setTimeout(() => {
                btn.textContent = "📥 Tải xuống EPUB";
                btn.classList.remove('btn-danger');
                btn.classList.add('btn-primary');
            }, 10000);
        }
    }

    initEpubDownloader();
})();