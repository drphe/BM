// ==UserScript==
// @name         SMoney So sánh quỹ
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @description  So sánh quỹ mở chuyên nghiệp với biểu đồ ECharts
// @author       Drphe
// @match        https://smoney.com.vn/so-sanh-quy-dau-tu
// @updateURL    https://vnindex.vercel.app/CCQ/smoney3.user.js
// @downloadURL  https://vnindex.vercel.app/CCQ/smoney3.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let fundDataStore = []; // Lưu trữ dữ liệu thô từ API
    let daysToFilter = 365; // Mặc định 1 năm
    let currentCodes = [];
    let myChart = null; // Biến lưu instance của ECharts

    // Thao tác click để kiểm tra thay đổi danh sách quỹ
    document.addEventListener("click", async (e) => {
        // Tránh chạy logic nếu click vào các nút lọc ngày
        if (e.target.closest("[data-days]")) return;

        let codes = getFundCodes();
        if (codes.length === 0 || arraysEqual(codes, currentCodes)) {
            return;
        }

        currentCodes = codes;
        const promises = currentCodes.map(s => fetchFundNavData(s));
        
        const results = await Promise.all(promises);
        fundDataStore = results.filter(item => item !== null);

        // Vẽ lại biểu đồ nếu đang ở tab hiệu suất
        if (document.getElementById("performance-tab")?.classList.contains("active")) {
            renderChart(daysToFilter);
        }
    });

    function arraysEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
    }

    function getFundCodes() {
        const tags = document.querySelectorAll("#selected-funds-tags .fund-tag");
        return Array.from(tags).map(tag => tag.childNodes[0].textContent.trim());
    }

    async function fetchFundNavData(fundCode) {
        try {
            const url = `https://smoney.com.vn/quy-dau-tu/${fundCode}`;
            const tokenElement = document.querySelector('meta[name="csrf-token"]');
            if (!tokenElement) throw new Error("CSRF token not found");

            const csrfToken = tokenElement.getAttribute("content");
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify({ type: "nav_ccq" }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            return { fund_code: fundCode, data: data.data };
        } catch (error) {
            console.error(`Error fetching NAV for ${fundCode}:`, error.message);
            return null;
        }
    }

    function renderChart(days) {
        const chartDom = document.getElementById("performance-chart");
        if (!chartDom || fundDataStore.length === 0) return;

        const filterDate = days ? new Date(Date.now() - 864e5 * days).toISOString().split("T")[0] : null;
        const allDates = new Set();
        const performanceMap = {};

        fundDataStore.forEach(fundObj => {
            const code = fundObj.fund_code;
            performanceMap[code] = {};
            
            const rawData = fundObj.data || [];
            // Sắp xếp ngày tăng dần
            const sortedData = [...rawData].sort((a, b) => a.navDate.localeCompare(b.navDate));
            const filtered = filterDate ? sortedData.filter(d => d.navDate >= filterDate) : sortedData;

            if (filtered.length > 0) {
                const baseNav = filtered[0].nav;
                filtered.forEach(item => {
                    allDates.add(item.navDate);
                    if (baseNav && item.nav != null) {
                        const percentChange = ((item.nav - baseNav) / baseNav) * 100;
                        performanceMap[code][item.navDate] = percentChange;
                    }
                });
            }
        });

        const sortedDates = Array.from(allDates).sort();
        const chartColors = ["#cf1421", "#f9943c", "#007049", "#7cb302", "#2f4eeb", "#541cab", "#8e9775", "#f1c40f", "#e74c3c", "#2ecc71"];

        const seriesData = currentCodes.map((code, index) => ({
            name: code,
            type: "line",
            connectNulls: true,
            symbol: "none",
            smooth: true,
            data: sortedDates.map(date => performanceMap[code]?.[date] ?? null),
            itemStyle: { color: chartColors[index % chartColors.length] },
            lineStyle: { width: 2 },
            emphasis: { focus: "series" }
        }));

        // Khởi tạo hoặc xóa instance cũ của ECharts
        if (myChart) {
            myChart.dispose();
        }
        // Lưu ý: Đảm bảo thư viện echarts đã có sẵn trên trang web smoney
        if (typeof echarts !== 'undefined') {
            myChart = echarts.init(chartDom);
            const option = {
                tooltip: {
                    trigger: "axis",
                    formatter: (params) => {
                        const date = params[0].axisValue;
                        const [y, m, d] = date.split("-");
                        let str = `<b>${d}/${m}/${y}</b><br/>`;
                        params.forEach(p => {
                            const val = p.data !== null ? p.data.toFixed(2) + "%" : "N/A";
                            str += `${p.marker} ${p.seriesName}: <b>${val}</b><br/>`;
                        });
                        return str;
                    }
                },
                legend: { bottom: 0, type: "scroll" },
                grid: { left: "3%", right: "4%", bottom: "15%", containLabel: true },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: sortedDates,
                    axisLabel: { formatter: (val) => val.split("-").slice(1).reverse().join("/") }
                },
                yAxis: {
                    type: "value",
                    axisLabel: { formatter: '{value}%' },
                    scale: true
                },
                series: seriesData
            };
            myChart.setOption(option);
        }
    }

    // Lắng nghe sự kiện click chọn mốc thời gian (1M, 3M, 1Y...)
    document.addEventListener("click", e => {
        const target = e.target.closest("[data-days]");
        if (target) {
            document.querySelectorAll(".performance-chart [data-days]").forEach(el => el.classList.remove("active"));
            target.classList.add("active");
            daysToFilter = parseInt(target.dataset.days);
            renderChart(daysToFilter);
        }
    });

    // Resize biểu đồ khi đổi kích thước màn hình
    window.addEventListener("resize", () => myChart?.resize());

})();