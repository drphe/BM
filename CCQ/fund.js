let THEME = 'light';
let rawData = [];
let chartB;
let currentType = "ALL"
const getNgayHienTai = () => {
    const d = new Date();
    return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
};
async function fetchData() {
    try {
        const res = await fetch("https://api.fmarket.vn/res/products/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "types": ["NEW_FUND", "TRADING_FUND"],
                "sortOrder": "DESC",
                "sortField": "navTo12Months",
                "page": 1,
                "pageSize": 100,
                "fundAssetTypes": ["STOCK", "BALANCED"]
            })
        });
        const result = await res.json();
        rawData = result.data.rows;
        updateDashboard(rawData);
    }
    catch (err) {
        console.error(err);
    }
}

function highlightRow(rowElement) {
    const allRows = document.querySelectorAll('#fund-table-body tr');
    allRows.forEach(row => {
        row.classList.remove('active-highlight');
    });
    rowElement.classList.add('active-highlight');
}

function handleFilterChange() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
    const filtered = rawData.filter(fund => {
        // Khớp loại quỹ
        const matchType = (currentType === 'ALL' || fund.dataFundAssetType.code === currentType);
        // Khớp từ khóa (tên hoặc mã)
        const matchKeyword = (fund.shortName.toLowerCase().includes(keyword) || fund.name.toLowerCase().includes(keyword));
        return matchType && matchKeyword;
    });
    updateDashboard(filtered);
}

function updateDashboard(data) {
    const sorted = [...data].sort((a, b) => (b.productNavChange?.navTo12Months || 0) - (a.productNavChange?.navTo12Months || 0));
    const tbody = document.getElementById('fund-table-body');
    tbody.innerHTML = sorted.map((fund, idx) => {
        const perf = fund.productNavChange?.navTo12Months || 0;
        const cagr = fund.productNavChange?.annualizedReturn36Months || 0;
        return `
                <tr onclick="highlightRow(this);showChart(${fund.id}, '${fund.name}', '${fund.shortName}')" class="group hover:bg-blue-50/60 cursor-pointer transition-all">
                    <td class="px-8 py-5 font-bold text-blue-600">${fund.shortName}</td>
                    <td class="px-6 py-5 text-sm text-slate-600">${fund.name}</td>
                    <td class="px-6 py-5 text-right font-mono font-bold">${fund.nav.toLocaleString('vi-VN')}</td>
                    <td class="px-6 py-5 text-right font-bold ${perf >= 0 ? 'text-emerald-600' : 'text-red-500'}">${perf > 0 ? '+' : ''}${perf}%</td>
                    <td class="px-6 py-5 text-right font-bold ${cagr >= 0 ? 'text-emerald-600' : 'text-red-500'}">${cagr > 0 ? '+' : ''}${cagr}%</td>
                    <!-----------<td class="px-8 py-5 text-xs text-slate-400 font-semibold">${fund.owner.shortName}</td>---------->
                </tr>
            `;
    }).join('');
}

function calculateSMA(data, count) {
    var avg = function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i][1];
        }
        return sum / data.length;
    };
    var result = [];
    for (var i = count - 1, len = data.length; i < len; i++) {
        var val = avg(data.slice(i - count + 1, i));
        result.push([data[i][0], val]);
    }
    return result;
}
async function showChart(id, name, shortName) {
    fetchFundData(id);
    document.getElementById('chartModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    try {
        const res = await fetch('https://api.fmarket.vn/res/product/get-nav-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "isAllData": 1,
                "productId": id,
                "fromDate": "20000101",
                "toDate": getNgayHienTai()
            })
        });
        const json = await res.json();
        const points = json.data.map(i => [new Date(i.navDate).getTime(), i.nav]).sort((a, b) => a[0] - b[0]);
        const ma50 = calculateSMA(points, 50);
        // Vẽ biểu đồ
        chartB = Highcharts.chart('chartContainer', {
            chart: {
                type: 'area',
                zoomType: "x",
                backgroundColor: 'transparent',
                resetZoomButton: {
                    position: {
                        align: 'right', // 'left', 'center', hoặc 'right'
                        verticalAlign: 'bottom', // 'top', 'middle', hoặc 'bottom'
                        x: -10, // offset theo trục x
                        y: -40 // offset theo trục y
                    }
                }
            },
            title: {
                text: ``,
                style: {
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                type: 'datetime',
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: function() {
                                var chart = this.series.chart;
                                chart.xAxis[0].removePlotBand('hover-band');
                                chart.xAxis[0].addPlotBand({
                                    from: this.x - 1.5,
                                    to: this.x + 1.5,
                                    color: 'rgba(100,100,255,0.15)',
                                    id: 'hover-band'
                                });
                            },
                            mouseOut: function() {
                                var chart = this.series.chart;
                                chart.xAxis[0].removePlotBand('hover-band');
                            }
                        }
                    }
                }
            },
            yAxis: {
                min: 9000,
                title: {
                    text: ''
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                followPointer: false, // ko cho theo chuột
                outside: false,
                positioner: function(labelWidth, labelHeight) {
                    const chart = this.chart;
                    return {
                        x: chart.plotLeft,
                        y: chart.plotTop
                    };
                },
                valueDecimals: 0
            },
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false // tắt highlight khi hover
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: shortName,
                data: points,
                color: '#3b82f6',
                lineWidth: 2,
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]], // màu đậm ở trên
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')] // mờ dần xuống dưới
                    ]
                }
            }, {
                name: 'MA50',
                data: ma50,
                type: 'spline',
                color: ' rgb(242, 54, 69)',
                lineWidth: 2,
            }]
        });
        let closep = []
        points.forEach(t => {
            closep.push({
                "time": t[0],
                "value": parseFloat(t[1])
            });
        });
        var drawdown = findRecoveries(closep);
        var sampleData = [],
            sampleData2 = [];
        for (let i = 1; i < drawdown.length; i++) {
            sampleData.push(drawdown[i].drawdown)
            sampleData2.push(drawdown[i].recover)
        }
        const ci = calculateConfidenceInterval(sampleData);
        const ci2 = calculateConfidenceInterval(sampleData2);
        let table = renderResults(drawdown); // bảng dữ liệu
        const mockResult = `<div>${ckht}</div>${table}`;
        document.getElementById('analysisArea').innerHTML = mockResult;
        drawNormalCurve(sampleData, "container3", "Chiết khấu", ci);
        drawNormalCurve(sampleData2, "container4", "Hồi phục", ci2);
        let arrayData = [];
        for (var i = 0; i < drawdown.length - 1; i++) {
            arrayData.push({
                date: drawdown[i].bottomDate,
                price: drawdown[i].bottom,
                change: "▼" + drawdown[i].drawdown.toFixed(2) + "%"
            });
            arrayData.push({
                date: drawdown[i].startDate,
                price: drawdown[i].start,
                change: "▲" + drawdown[i + 1].recover.toFixed(2) + "%"
            });
        }
        arrayData.reverse();
        let endValue = closep[closep.length - 1].value; // cuối cùng
        let endArrayValue = arrayData[arrayData.length - 1].price;
        let iconChange = endValue > endArrayValue ? "▲" : "▼";
        let percentCh = (endValue / endArrayValue - 1) * 100;
	function getUpdateText(data){
		let currentDay = closep[closep.length - 1];
		let prevDay = closep[closep.length - 2];
		let change = currentDay.value - prevDay.value;
		let changep = change*100/prevDay.value;
		let c = change > 0? "green": change < 0? "red": "yellow";
		return `<span style="color:${c};font-weight:bold;">${change.toFixed(0)}/${changep.toFixed(2)}% (${formatTimestamp(currentDay.time)})</span>`
	}
        document.getElementById('nav-update').innerHTML =getUpdateText(closep);
        arrayData.push({
            date: formatTimestamp(closep[closep.length - 1].time),
            price: endValue,
            change: iconChange + percentCh.toFixed(2) + "%"
        });
        renderChart(arrayData, ci.mean, ci2.mean)
    }
    catch (err) {
        console.error(err);
    }
}

function filterByType(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-white', 'shadow', 'text-blue-600'));
    btn.classList.add('active', 'bg-white', 'shadow', 'text-blue-600');
    const filtered = type === 'ALL' ? rawData : rawData.filter(f => f.dataFundAssetType.code === type);
    currentType = type;
    updateDashboard(filtered);
}

function closeModal() {
    document.getElementById('chartModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
window.onload = fetchData;

function calculateMA(data, period) {
    return data.map((_, index) => {
        if (index < period - 1) return null;
        const slice = data.slice(index - period + 1, index + 1);
        const average = slice.reduce((sum, val) => sum + val, 0) / period;
        return average;
    });
}

function formatTimestamp(timestamp) {
    // Chuyển đổi timestamp (giây) sang milliseconds
    const date = new Date(timestamp);
    // Lấy ngày, tháng và năm
    const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = String(date.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm
    // Trả về định dạng dd/mm/yy
    return `${day}/${month}/${year}`;
}
// tính toán drawdown
function findRecoveries(data) {
    const results = [];
    var ab = data.map(s => s.value);
    var ma10 = calculateMA(ab, 20); // tính MA10
    let peak = data[0].value; // Giá đỉnh ban đầu
    let tpeak = data[0].time; // Giá đỉnh ban đầu
    let trough = data[0].value; // Giá đáy ban đầu
    let ttrough = data[0].time; // Giá đáy ban đầu
    let inDecline = false; // Trạng thái đang sụt giảm, mặc định là không
    for (let i = 1; i < data.length; i++) {
        if (!inDecline) { // đang tăng
            if (data[i].value < peak) { // Bắt đầu sụt giảm
                inDecline = true;
                trough = data[i].value;
                ttrough = data[i].time;
            }
            else {
                peak = data[i].value; // Cập nhật đỉnh nếu vẫn tăng
                tpeak = data[i].time;
                inDecline = false;
            }
        }
        else { // đang giảm 
            if (trough > data[i].value) {
                trough = data[i].value; // Cập nhật đáy nếu vẫn giảm
                ttrough = data[i].time
                inDecline = true;
            }
            else {
                if (data[i].value > peak) {
                    peak = data[i].value; // Cập nhật đỉnh nếu giá hồi vượt đỉnh (không có đợt giảm sâu)
                    tpeak = data[i].time;
                    inDecline = false;
                }
                else {
                    // điều kiện xác nhận hồi phục khi đáy ở dưới ma20 và giá hồi phục vượt được ma20
                    if ((data[i].value > ma10[i] && trough < ma10[i]) || (data.length - i < 6)) { // giá vượt ngưỡng  phục hồi hoặc vượt MA20
                        const recoveryDate = data[i].time; // Thời điểm hồi phục
                        results.push({
                            drawdown: (1 - trough / peak) * 100,
                            start: peak,
                            startDate: formatTimestamp(tpeak),
                            bottom: trough,
                            bottomDate: formatTimestamp(ttrough),
                            recoveryDate: formatTimestamp(recoveryDate),
                            recoveryPrice: data[i].value,
                            recover: 0,
                        });
                        inDecline = false; // Xác nhận hồi phục
                        peak = data[i].value; // Reset đỉnh
                        tpeak = data[i].time; // Reset đỉnh
                    }
                    else {
                        // chưa xác nhận đã hồi phục, tiếp tục giảm
                        inDecline = true;
                    }
                }
            }
        }
    }
    // lọc các đợt drawdown <3% do sideway nằm trong biên độ nhỏ
    const output = results.filter(item => item.drawdown > 3);
    // tính mức hồi phục bằng đỉnh mới- đáy cũ
    for (i = 0; i < output.length - 1; i++) {
        output[i].recover = 100 * output[i + 1].start / output[i].bottom - 100;
    }
    output[output.length - 1].recover = 100 * peak / output[output.length - 1].bottom - 100; // tính mức recover
    ckht = ''; //reset ckht;
    let temp = '';
    // kiểm tra giá trị mới nhất và đáy
    if (data[data.length - 1].value > trough) {
        temp = `Đã hồi phục từ ngày ${formatTimestamp(ttrough)}:<span style="padding: 2px; color: rgb(0, 170, 0);"> ${((data[data.length-1].value/trough-1)*100).toFixed(2)}%</span>. `;
    }
    else {
        temp = `Hồi phục từ đáy ${output[output.length-1].bottomDate}: <span style="padding: 2px; color: rgb(0, 170, 0);">${output[output.length-1].recover.toFixed(2)}%</span>.`;
    }
    if (data[data.length - 1].value * 1.02 < peak) {
        let gg = ((1 - data[data.length - 1].value / peak) * 100).toFixed(2);
        ckht += ` <span title="Đang hồi phục sau chiết khấu">HIỆN TẠI</span> đang chiết khấu từ đỉnh ${formatTimestamp(tpeak)}: <span style="padding: 2px; color: rgb(0, 170, 0);" >${gg}% </span>.${temp}<br/>`;
    }
    else {
        let gg = output[output.length - 1].drawdown.toFixed(2);
        temp = ` Hồi phục từ đáy ${results[results.length-1].bottomDate}: <span style="padding: 2px; color: rgb(0, 170, 0);">${results[results.length-1].recover.toFixed(2)}</span>%.`;
        ckht += `Mức chiết khấu của <span title="Đang xu hướng tăng hoặc đi ngang"> đỉnh gần nhất </span>${output[output.length-1].startDate}: <span style="padding: 2px; color: rgb(0, 170, 0);" >${gg}%</span>.${temp}<br/>`;
    }
    return output;
}

function calculateConfidenceInterval(data) {
    const n = data.length;
    if (n < 2) return null;
    const mean = data.reduce((sum, v) => sum + v, 0) / n;
    const variance = data.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (n - 1);
    const standardDeviation = Math.sqrt(variance);
    const standardError = standardDeviation / Math.sqrt(n);
    // dùng z nếu n >= 30
    const zScore = 1.96;
    const marginOfError = zScore * standardError;
    return {
        mean,
        lowerBound: mean - marginOfError,
        upperBound: mean + marginOfError,
        standardDeviation,
        standardError,
        marginOfError,
        n
    };
}
// vẽ bảng drawdown
function renderResults(results) {
    results.reverse();
    let table = `<div class="bp5-callout bp5-intent-primary PinturaScrollableContent"><table id="resultsTable" class="table-screens bp5-html-table bp5-html-table-striped bp5-interactive" style="width: 100%;table-layout: fixed; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="text-align: right; white-space: nowrap;">Tạo đỉnh</th>
                <th style="text-align: right; white-space: nowrap;">Giá</th>
                <th style="text-align: right; white-space: nowrap;">Tạo đáy</th>
                <th style="text-align: right; white-space: nowrap;">Giá</th>
                <th style="text-align: right; white-space: nowrap;">Chiết khấu</th>
                <th style="text-align: right; white-space: nowrap;">Hồi phục</th>
            </tr>
        </thead>
        <tbody>`;
    results.forEach(result => {
        table += `<tr>
            <td style="text-align: right;">${result.startDate}</td>
            <td style="text-align: right;">${result.start.toFixed(0)}</td>
            <td style="text-align: right;">${result.bottomDate}</td>
            <td style="text-align: right;">${result.bottom.toFixed(0)}</td>
            <td style="text-align: right;">${result.drawdown.toFixed(2)} %</td>
            <td style="text-align: right;">${result.recover.toFixed(2)} %</td>
        </tr>`;
    });
    table += `</tbody></table></div>`;
    return table;
}

function getCurrentDate() {
    const t = new Date;
    return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0")
}
// vẽ biểu đồ
function renderChart(data, c1, c2) {
    // Lấy categories và data
    const categories = data.map(d => d.date);
    const priceData = data.map(d => d.price);
    // ===== Linear Regression =====
    function linearRegression(data) {
        const n = data.length;
        let sumX = 0,
            sumY = 0,
            sumXY = 0,
            sumXX = 0;
        data.forEach((y, x) => {
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

    // Tạo trendline
    const trendlineData = priceData.map((_, i) => slope * i + intercept);
    Highcharts.chart('container2', {
        chart: {
            type: 'line',
            zoomType: "x",
            resetZoomButton: {
                position: {
                    align: 'right', // 'left', 'center', hoặc 'right'
                    verticalAlign: 'bottom', // 'top', 'middle', hoặc 'bottom'
                    x: -10, // offset theo trục x
                    y: -40 // offset theo trục y
                }
            },
            backgroundColor: 'transparent',
            events: {
                load: function() {
                    const chart = this;
                    chart.container.addEventListener('mousemove', function(e) {
                        const point = chart.series[0].searchPoint(e, true);
                        if (point) {
                            const cat = point.category;
                            chartB.series[0].data.forEach(pointB => {
                                const catB = formatTimestamp(pointB.x);
                                if (catB === cat) {
                                    chartB.tooltip.refresh(pointB);
                                    chartB.xAxis[0].drawCrosshair(e, pointB);
                                }
                            });
                        }
                        const rect = chart.container.getBoundingClientRect();
                        const chartY = e.clientY - rect.top;
                        const yValue = chart.yAxis[0].toValue(chartY);
                        chart.yAxis[0].removePlotLine('hover-line');
                        // Thêm plotLine nét đứt tại vị trí con trỏ
                        chart.yAxis[0].addPlotLine({
                            value: yValue,
                            color: 'grey',
                            width: 1,
                            dashStyle: 'Dash',
                            id: 'hover-line',
                            zIndex: 5
                        });
                        if (point) {
                            const x = point.x;
                            // Xóa plotBand và plotLine cũ
                            chart.xAxis[0].removePlotBand('hover-band');
                            // Thêm plotBand highlight vùng
                            chart.xAxis[0].addPlotBand({
                                from: x - 0.5,
                                to: x + 0.5,
                                color: 'rgba(100,100,255,0.15)',
                                id: 'hover-band'
                            });
                        }
                    });
                    chart.container.addEventListener('mouseleave', function() {
                        chart.xAxis[0].removePlotBand('hover-band');
                        chart.yAxis[0].removePlotLine('hover-line');
                        chartB.tooltip.hide();
                        chartB.xAxis[0].hideCrosshair();
                    });
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories,
            title: {
                text: '',
                color: '#ffffff'
            }
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    color: 'grey'
                }
            },
            labels: {
                style: {
                    color: 'grey'
                }
            },
            gridLineColor: THEME == "dark" ? '#444444' : '#efefef',
            gridLineWidth: 1
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            followPointer: false, // ko cho theo chuột
            outside: false,
            positioner: function(labelWidth, labelHeight) {
                const chart = this.chart;
                return {
                    x: chart.plotLeft,
                    y: chart.plotTop
                };
            },
            backgroundColor: THEME == "dark" ? '#333333' : '#fff',
            style: {
                color: THEME == 'dark' ? '#ffffff' : '#1c2127'
            },
            formatter: function() {
                const d = data[this.point.index];
                return `<b>${d.date}</b><br/>Giá: ${d.price.toFixed(0)}<br/>${d.change}`;
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Trendline',
            data: trendlineData,
            dashStyle: 'Dash',
            marker: {
                enabled: false,
                radius: 1
            }
        }, {
            name: 'Giá',
            data: data.map(d => ({
                y: d.price,
            })),
            color: 'deepskyblue',
            lineWidth: 2,
            marker: {
                enabled: false, // Ẩn chấm mặc định
                radius: 1, // Kích thước nhỏ
                states: {
                    hover: {
                        enabled: true, // Chỉ hiện khi hover
                        fillColor: '#ffffff',
                        lineColor: 'deepskyblue',
                        lineWidth: 2
                    }
                }
            }
        }]
    });
}
async function fetchFundData(id) {
    const url = "https://api.fmarket.vn/res/products/" + id;
    const options = {
        method: "GET",
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "vi",
            "cache-control": "no-cache"
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.status === 200) {
            renderUI(result.data);
        }
    }
    catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        //alert("Không thể tải dữ liệu từ API. Hãy kiểm tra CORS hoặc đường truyền.");
    }
}
let industryChartInstance;

function renderUI(data) {
    // Ẩn loading, hiện content
    document.getElementById('content').classList.remove('hidden');
    console.log(data)
    // Header & Basic Info
    document.getElementById('fund-name').innerHTML = `<a href="https://smoney.com.vn/quy-dau-tu/${data.shortName}" target="_blank" class="text-blue-500 hover:text-blue-700">${data.name}</a>`;
    document.getElementById('fund-code').textContent = data.code;
    document.getElementById('fund-type').textContent = data.dataFundAssetType.name;
    document.getElementById('nav-price').textContent = data.nav.toLocaleString() + 'đ';
    document.getElementById('owner-name').textContent = data.owner.name;
    document.getElementById('mgmt-fee').textContent = data.managementFee + '%/năm';
    document.getElementById('risk-level').textContent = data.riskLevel.name;
    document.getElementById('trade-date').textContent = data.productTransactionDateModelList.join(', ');
    // Hiệu suất
    const nav = data.productNavChange;
    const setPerf = (id, val) => {
        const el = document.getElementById(id);
        el.textContent = (val > 0 ? '+' : '') + val + '%';
        el.classList.add(val >= 0 ? 'text-green-600' : 'text-red-600');
    };
    setPerf('p-1m', nav.navTo1Months);
    setPerf('p-12m', nav.navTo12Months);
    setPerf('p-36m', nav.annualizedReturn36Months || 0);
    document.getElementById('p-total').textContent = '+' + nav.navToEstablish + '%';
    // Top holding list
    const holdingBox = document.getElementById('holding-container');
    holdingBox.innerHTML = "";
    data.productTopHoldingList.slice(0, 6).forEach(stock => {
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors";
        div.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-lg font-bold text-xs">${stock.stockCode}</div>
                        <div>
                            <p class="font-bold text-slate-700">${stock.stockCode}</p>
                            <p class="text-[10px] text-slate-400 uppercase">${stock.industry}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-slate-700">${stock.netAssetPercent}%</p>
                        <p class="text-[10px] ${stock.changeFromPrevious >= 0 ? 'text-green-500' : 'text-red-500'} font-medium">
                            ${stock.changeFromPrevious >= 0 ? '▲' : '▼'} ${Math.abs(stock.changeFromPreviousPercent)}%
                        </p>
                    </div>
                `;
        holdingBox.appendChild(div);
    });
    // Biểu đồ ngành
    const ctx = document.getElementById('industryChart').getContext('2d');
    if (industryChartInstance) industryChartInstance.destroy();
    const industryData = data.productIndustriesHoldingList.slice(0, 7);
    industryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: industryData.map(i => i.industry),
            datasets: [{
                label: 'Tỷ trọng (%)',
                data: industryData.map(i => i.assetPercent),
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
// Hàm tạo dữ liệu đường cong chuẩn
function generateNormalCurve(mean, sd, points = 100, range = 4) {
    const data = [];
    // Lấy khoảng từ mean - range*sd đến mean + range*sd
    const start = mean - range * sd;
    const end = mean + range * sd;
    const step = (end - start) / points;
    for (let x = start; x <= end; x += step) {
        // Công thức mật độ xác suất chuẩn
        const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mean, 2) / (2 * sd * sd));
        data.push([x, y]);
    }
    return data;
}

function drawNormalCurve(data, id, name, ci) {
    //const ci = calculateConfidenceInterval(data);
    const normalCurve = generateNormalCurve(ci.mean, ci.standardDeviation);
    Highcharts.chart(id, {
        chart: {
            type: 'area',
            zoomType: 'x',
            resetZoomButton: {
                position: {
                    align: 'right', // 'left', 'center', hoặc 'right'
                    verticalAlign: 'bottom', // 'top', 'middle', hoặc 'bottom'
                    x: -10, // offset theo trục x
                    y: -40 // offset theo trục y
                }
            },
        },
        credits: {
            enabled: false
        },
        title: {
            text: ``
        },
        subtitle: {
            text: `${name} : Mean = ${ci.mean.toFixed(2)}% [${ci.lowerBound.toFixed(2)}, ${ci.upperBound.toFixed(2)}] (n = ${ci.n})`,
            style: {
                color: '#e74c3c',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            min: 0,
            title: {
                text: 'Giá trị (Value)'
            },
            crosshair: true,
            plotLines: [{
                value: ci.mean,
                color: '#e74c3c',
                dashStyle: 'Dash',
                width: 2,
                label: {
                    text: ``,
                    rotation: 0,
                    align: 'center',
                    y: 10,
                    style: {
                        color: '#e74c3c',
                        fontWeight: 'bold'
                    }
                }
            }, {
                value: ci.lowerBound,
                color: '#27ae60',
                width: 2,
                label: {
                    text: ``,
                    rotation: 0,
                    align: 'left',
                    y: 10,
                    x: -10,
                    style: {
                        color: '#27ae60'
                    }
                }
            }, {
                value: ci.upperBound,
                color: '#27ae60',
                width: 2,
                label: {
                    text: ``,
                    rotation: 0,
                    align: 'right',
                    y: 10,
                    x: 10,
                    style: {
                        color: '#27ae60'
                    }
                }
            }]
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function() {
                const x = this.x;
                const y = this.points[0].y;
                let label = '';
                if (Math.abs(x - ci.mean) < ci.standardDeviation * 0.05) label = '<br><b>Mean</b>';
                if (Math.abs(x - ci.lowerBound) < ci.standardDeviation * 0.05) label = '<br><b>Band dưới</b>';
                if (Math.abs(x - ci.upperBound) < ci.standardDeviation * 0.05) label = '<br><b>Band trên</b>';
                return `
                <div style="font-size:13px">
                <b>${name}:</b> ${x.toFixed(3)} %<br>
                <b>Mật độ:</b> ${y.toFixed(4)}
                ${label}
                </div>`;
            }
        },
        series: [{
            name: 'Normal Distribution',
            data: normalCurve,
            color: '#3498db',
            fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, 'rgba(52,152,219,0.5)'],
                    [1, 'rgba(52,152,219,0.05)']
                ]
            },
            marker: {
                enabled: false
            }
        }, {
            name: '95% Confidence Interval',
            type: 'arearange',
            data: normalCurve.filter(p => p[0] >= ci.lowerBound && p[0] <= ci.upperBound).map(p => [p[0], 0, p[1]]),
            color: 'rgba(46,204,113,0.35)',
            lineWidth: 0,
            marker: {
                enabled: false
            },
            enableMouseTracking: false
        }]
    });
}
