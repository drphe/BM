// ==UserScript==
// @name         SMoney Fund Portfolio Tracker
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @description  Tính toán biến động NAV dự kiến dựa trên danh mục cổ phiếu của quỹ
// @author       Tuấn
// @match        https://smoney.com.vn/quy-dau-tu/*
// @grant        GM_xmlhttpRequest
// @connect      api.simplize.vn
// @updateURL    https://vnindex.vercel.app/CCQ/smoney.user.js
// @downloadURL  https://vnindex.vercel.app/CCQ/smoney.user.js
// ==/UserScript==

(function() {
    'use strict';

    let latestDateNav;

    // 1. Utility: Làm sạch dữ liệu số từ DOM
    function parseFinanceValue(val) {
        if (val == null) return 0;
        const clean = String(val).replace(/,/g, '').replace('%', '').trim();
        return (clean === '-' || clean === '' || Number.isNaN(Number(clean))) ? 0 : Number(clean);
    }

    function formatNumber(n) {
        const num = typeof n === 'string' ? Number(n.replace(/,/g, '').trim()) : n;
        if (typeof num !== 'number' || Number.isNaN(num)) return String(n);
        const sign = num < 0 ? '-' : '';
        const abs = Math.abs(num);
        if (abs >= 1_000_000_000) return sign + (abs / 1_000_000_000).toFixed(2) + " tỷ";
        if (abs >= 1_000_000) return sign + (abs / 1_000_000).toFixed(2) + " triệu";
        return sign + abs.toLocaleString('vi-VN');
    }

    // 2. Lấy danh mục từ bảng Portfolio của SMoney
    function getPortfolioFromDOM() {
        const table = document.querySelector('.portfolio-table table.table-hover');
        if (!table) return [];

        const rows = table.querySelectorAll('tbody tr');
        return Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 7 || !cells[1].querySelector('span')) return null;

            return {
                symbol: cells[1].querySelector('span').innerText.trim(),
                quantity: parseFinanceValue(cells[2].innerText),
                ratio: parseFinanceValue(cells[6].innerText)
            };
        }).filter(item => item !== null);
    }
function getNext(dateStr) {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString('vi-VN');
}
    // 3. Gọi API Simplize lấy lịch sử giá (sử dụng GM_xmlhttpRequest để tránh CORS)
    function getStockHistory(ticker) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://api.simplize.vn/api/historical/prices/ohlcv?ticker=${ticker}&size=5&interval=1d&type=stock`,
                onload: function(res) {
                    try {
                        const result = JSON.parse(res.responseText);
                        if (result.status !== 200 || !result.data) resolve([]);
                        
                        const processedData = result.data.map((item, index, array) => {
                            const closePrice = item[4];
                            let change = 0;
                            if (index > 0) change = closePrice - array[index - 1][4];
                            return {
                                date: new Date(item[0] * 1000).toLocaleDateString('vi-VN'),
                                change: change,
                                percent: index > 0 ? (change / array[index - 1][4] * 100) : 0
                            };
                        });
                        resolve(processedData);
                    } catch (e) { resolve([]); }
                },
                onerror: () => resolve([])
            });
        });
    }

    // 4. Tính toán tổng biến động
    async function calculateTotalPortfolioChange(portfolio) {
        let totalChangeValue = 0;
        const promises = portfolio.map(async (item) => {
            const history = await getStockHistory(item.symbol);
            if (history.length > 0) {
                const latest = history[history.length - 1];
                totalChangeValue += item.quantity * latest.change;
                latestDateNav = latest.date;
            }
        });
        await Promise.all(promises);
        return totalChangeValue;
    }

    // 5. Khởi chạy và cập nhật giao diện
    async function initAnalysis() {
        console.log("Đang phân tích danh mục quỹ...");
        const portfolio = getPortfolioFromDOM();
        if (portfolio.length === 0) return;

        const totalChangeNAV = await calculateTotalPortfolioChange(portfolio);
        
        const navElement = document.querySelector('.total-assets.flex-between .value');
        if (!navElement) return;

        const currentNAV = parseFloat(navElement.textContent.replace(/,/g, '').replace('T', '')) * 1_000_000_000;
        const changePercent = ((totalChangeNAV / currentNAV) * 100).toFixed(2);

        // Chèn kết quả vào phần .portfolio-metrics của SMoney
        const metricsContainer = document.querySelector('.portfolio-metrics .row');
        if (metricsContainer) {
            const dateStr = latestDateNav ? ` (${getNext(latestDateNav)})` : "";
            const html = `
                <div class="col-4 col-lg-2">
                    <div class="metric-card py-2 px-0 text-center">
                        <div class="metric-label">ΔNAV ${dateStr}</div>
                        <div class="metric-value" style="color: ${totalChangeNAV >= 0 ? '#28a745' : '#dc3545'};">
                            ${formatNumber(totalChangeNAV)}
                        </div>
                    </div>
                </div>
                <div class="col-4 col-lg-2">
                    <div class="metric-card py-2 px-0 text-center">
                        <div class="metric-label">ΔNAV% ${dateStr}</div>
                        <div class="metric-value" style="color: ${totalChangeNAV >= 0 ? '#28a745' : '#dc3545'};">
                            ${changePercent}%
                        </div>
                    </div>
                </div>
            `;
            metricsContainer.insertAdjacentHTML('beforeend', html);
        }
    }

    // Đợi trang load xong hoàn toàn vì danh mục thường render chậm
    window.addEventListener('load', () => {
        setTimeout(initAnalysis, 2000); 
    });

})();