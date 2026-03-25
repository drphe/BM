// ==UserScript==
// @name         S-Money Stock Discount Analysis
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @description  Phân tích chiết khấu và hồi phục cổ phiếu trực tiếp trên biểu đồ.
// @author       Drphe
// @match        https://smoney.com.vn/co-phieu/*
// @updateURL    https://vnindex.vercel.app/CCQ/smoney2.user.js
// @downloadURL  https://vnindex.vercel.app/CCQ/smoney2.user.js
// ==/UserScript==
(function() {
    'use strict';
    let ckht = ''; // Biến toàn cục lưu trữ nội dung phân tích
    window.addEventListener('load', () => {
        // vẽ biểu đồ chiết khấu
        setTimeout(function() {
            const target = document.querySelector(".symbol-chart");
            const symbolElement = document.querySelector('.symbol-stats');
            const symbol = symbolElement ? symbolElement.getAttribute('data-symbol') : null;
            if (target && symbol) {
                const original = document.createElement("div");
                original.setAttribute("class", "discount-chart position-relative m-3");
                target.parentNode.insertBefore(original, target.nextSibling);
                const h3 = document.createElement("h3");
                h3.setAttribute("class", "title-symbol");
                h3.innerText = "Phân tích chiết khấu cổ phiếu " + symbol;
                const clone = document.createElement("div");
                clone.id = "candles-chart2";
                clone.style.height = "400px";
                original.appendChild(h3);
                original.appendChild(clone);
                fetchData(symbol, original);
            }
        }, 2000);
    });
    async function fetchData(code, originalDiv) {
        code = code == "VNINDEX" ? "VN-INDEX" : code;
        const apiUrl = "https://mastrade.masvn.com/api/v1/tradingview/history?symbol=" + code + "&resolution=1D&from=1420070400&to=" + parseInt(Date.now() / 1000);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            let closep = [];
            for (let i = 0; i < data.t.length; i++) {
                closep.push({
                    "time": parseInt(data.t[i]),
                    "value": parseFloat(data.c[i])
                });
            }
	    if(!closep.length) {
		originalDiv.remove();
		return;
	    }
            const drawdown = findRecoveries(closep);
            const sampleData = drawdown.slice(1).map(d => d.drawdown);
            const sampleData2 = drawdown.slice(1).map(d => d.recover);
            const ci = calculateConfidenceInterval(sampleData);
            const ci2 = calculateConfidenceInterval(sampleData2);
            let table = renderResults(drawdown.slice(-30));
            const resultMe = checkLatestGrowth(closep);
            // Ghi nội dung phân tích vào div
            const analysisHtml = `<div>Mức chiết khấu TB (n = ${ci.n}) là <span style="color: #00aa00;">${ci.mean.toFixed(2)}% [${ci.lowerBound.toFixed(2)}, ${ci.upperBound.toFixed(2)}]</span>.<br/> Mức hồi phục TB (n = ${ci2.n}) là <span style="color: #00aa00;">${ci2.mean.toFixed(2)}% [${ci2.lowerBound.toFixed(2)}, ${ci2.upperBound.toFixed(2)}]</span><br/> ${ckht}</div>${table}`;
        if (resultMe.length > 0) {
            originalDiv.innerHTML += "📊 Chú ý phiên chạy nước rút:<br/>" + resultMe.join('<br/>') +'<br/>'+ mockResult;
        }else {
         originalDiv.innerHTML += mockResult;
	}
            // Chuẩn bị dữ liệu cho biểu đồ (giữ nguyên logic gốc)
            const temp = drawdown.slice(-30);
            let arrayData = [];
            for (let i = 1; i < temp.length; i++) {
                arrayData.push({
                    date: temp[i].startDate,
                    price: temp[i].start,
                    change: "▲" + temp[i - 1].recover.toFixed(2) + "%"
                });
                arrayData.push({
                    date: temp[i].bottomDate,
                    price: temp[i].bottom,
                    change: "▼" + temp[i].drawdown.toFixed(2) + "%"
                });
            }
            let endValue = closep[closep.length - 1].value;
            let endArrayValue = arrayData[arrayData.length - 1].price;
            arrayData.push({
                date: formatTimestamp(closep[closep.length - 1].time),
                price: endValue,
                change: (endValue > endArrayValue ? "▲" : "▼") + ((endValue / endArrayValue - 1) * 100).toFixed(2) + "%"
            });
            renderChart(arrayData);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    // === HÀM VẼ BIỂU ĐỒ VỚI TRENDLINE (GIỮ NGUYÊN GỐC CỦA BẠN) ===
    function renderChart(data) {
        if (!data || data.length === 0) return;
        const categories = data.map(d => d.date);
        const priceData = data.map(d => d.price);
        // Linear Regression cho Trendline
        function linearRegression(yValues) {
            const n = yValues.length;
            let sumX = 0,
                sumY = 0,
                sumXY = 0,
                sumXX = 0;
            yValues.forEach((y, x) => {
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumXX += x * x;
            });
            const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            return {
                slope,
                intercept
            };
        }
        const {
            slope,
            intercept
        } = linearRegression(priceData);
        const trendlineData = priceData.map((_, i) => slope * i + intercept);
        const chartDom = document.getElementById('candles-chart2');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            const option = {
                backgroundColor: 'transparent',
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '5%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    show: true,
                    data: categories
                },
                yAxis: {
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMax',
                    axisLabel: {
                        color: 'grey',
                        formatter: value => Math.floor(value)
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    confine: true,
                    axisPointer: {
                        type: 'cross',
                        lineStyle: {
                            color: 'grey',
                            type: 'dashed'
                        }
                    },
                    formatter: function(params) {
                        const idx = params[0].dataIndex;
                        const item = data[idx];
                        return `<b>${item.date}</b><br/>Giá: ${item.price.toFixed(2)}<br/>${item.change}`;
                    }
                },
                series: [{
                    name: 'Trendline',
                    type: 'line',
                    data: trendlineData,
                    symbol: 'none',
                    lineStyle: {
                        type: 'dashed',
                        color: 'grey',
                        width: 1,
                        opacity: 0.6
                    },
                    silent: true
                }, {
                    name: 'Giá',
                    type: 'line',
                    data: priceData,
                    color: 'deepskyblue',
                    lineWidth: 2,
                    symbol: 'circle',
                    symbolSize: 6,
                    showSymbol: false
                }]
            };
            myChart.setOption(option, true);
            window.addEventListener('resize', () => myChart.resize());
        }
    }
    // --- Copy lại toàn bộ các hàm xử lý dữ liệu từ file gốc của bạn ---
    function findRecoveries(data) {
        const results = [];
        const ab = data.map(s => s.value);
        const ma10 = calculateMA(ab, 20); // Bạn dùng ma10 nhưng truyền period 20
        let peak = data[0].value,
            tpeak = data[0].time;
        let trough = data[0].value,
            ttrough = data[0].time;
        let inDecline = false;
        for (let i = 1; i < data.length; i++) {
            if (!inDecline) {
                if (data[i].value < peak) {
                    inDecline = true;
                    trough = data[i].value;
                    ttrough = data[i].time;
                }
                else {
                    peak = data[i].value;
                    tpeak = data[i].time;
                }
            }
            else {
                if (trough > data[i].value) {
                    trough = data[i].value;
                    ttrough = data[i].time;
                }
                else if (data[i].value > peak) {
                    peak = data[i].value;
                    tpeak = data[i].time;
                    inDecline = false;
                }
                else {
                    if ((data[i].value > ma10[i] && trough < ma10[i]) || (data.length - i < 6)) {
                        results.push({
                            drawdown: (1 - trough / peak) * 100,
                            start: peak,
                            startDate: formatTimestamp(tpeak),
                            bottom: trough,
                            bottomDate: formatTimestamp(ttrough),
                            recover: 0,
                        });
                        inDecline = false;
                        peak = data[i].value;
                        tpeak = data[i].time;
                    }
                }
            }
        }
        const output = results.filter(item => item.drawdown > 3);
        for (let i = 0; i < output.length - 1; i++) {
            output[i].recover = (output[i + 1].start / output[i].bottom - 1) * 100;
        }
        if (output.length > 0) output[output.length - 1].recover = (peak / output[output.length - 1].bottom - 1) * 100;
        // Logic hiển thị ckht
        const lastVal = data[data.length - 1].value;
        if (lastVal > trough) {
            ckht = `Đã hồi phục từ đáy ${formatTimestamp(ttrough)}: <span style="color:#00aa00">${((lastVal/trough-1)*100).toFixed(2)}%</span>. `;
        }
        ckht += `<br/>` + predict(output, ((1 - lastVal / peak) * 100));
        return output;
    }

    function calculateMA(data, period) {
        return data.map((_, index) => {
            if (index < period - 1) return null;
            const slice = data.slice(index - period + 1, index + 1);
            return slice.reduce((sum, val) => sum + val, 0) / period;
        });
    }

    function formatTimestamp(ts) {
        const d = new Date(ts * 1000);
        return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getFullYear()).slice(-2)}`;
    }

    function calculateConfidenceInterval(data) {
        if (!data.length) return {
            n: 0,
            mean: 0,
            lowerBound: 0,
            upperBound: 0
        };
        const n = data.length;
        const mean = data.reduce((a, b) => a + b, 0) / n;
        const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
        const margin = 1.96 * (Math.sqrt(variance) / Math.sqrt(n));
        return {
            n,
            mean,
            lowerBound: mean - margin,
            upperBound: mean + margin
        };
    }

    function renderResults(results) {
        let rows = [...results].reverse().map(r => `
            <tr>
                <td>${r.startDate}</td><td>${r.start.toFixed(0)}</td>
                <td>${r.bottomDate}</td><td>${r.bottom.toFixed(0)}</td>
                <td>${r.drawdown.toFixed(2)}%</td><td>${r.recover.toFixed(2)}%</td>
            </tr>`).join('');
        return `<div class="table-data draggable" style="height: 300px;overflow: scroll;">
        <table id="resultsTable" class="table table-hover" style="">
        <thead>
            <tr>
                <th style=" ">Tạo đỉnh</th>
                <th style=" ">Giá</th>
                <th style=" ">Tạo đáy</th>
                <th style=" ">Giá</th>
                <th style=" ">Chiết khấu</th>
                <th style=" ">Hồi phục</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody></table></div>`;
    }

    function predict(data, dropValue) {
        if (data.length < 2) return "";
        const n = data.length;
        const x = data.map(d => d.drawdown);
        const y = data.map(d => d.recover);
        const sumX = x.reduce((a, b) => a + b, 0),
            sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
        const sumX2 = x.reduce((s, xi) => s + xi * xi, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        return `Dự báo hồi phục: ${(slope * dropValue + intercept).toFixed(2)}%`;
    }

    function checkLatestGrowth(data) {
        const latest = data[data.length - 1];
        let msgs = [];
        for (let i = data.length - 2; i >= 0 && (latest.time - data[i].time) <= 30 * 86400; i--) {
            const p = (latest.value / data[i].value - 1) * 100;
            const d = (latest.time - data[i].time) / 86400;
            if (d <= 7 && p >= 15) msgs.push("Tăng >15% trong 1 tuần");
        }
        return msgs;
    }
})();
