"use strict";
var vimos = wiKeyword.map((s) => ({
    "code": s.name,
    "fullname_vi": s.keyWord,
    "type": s.type,
}));
var DATASERIES = [];
var themes = 'light';
document.documentElement.setAttribute('data-theme', themes);
changetheme(myChart);
loading(1);
var allKey = DSCK.concat(vimos),
    mack;
var period = "3Y"
var myChart;
var addchart = false;
var isCompare = false;
var dis_recession = function(chart) { // thêm suy thoái
    changetheme(chart);
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(1970, 1, 1),
            to: Date.UTC(1970, 12, 1),
            id: 'r'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(1973, 12, 1),
            to: Date.UTC(1975, 4, 1),
            id: 'r1'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(1980, 2, 1),
            to: Date.UTC(1980, 8, 1),
            id: 'r2'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(1981, 8, 1),
            to: Date.UTC(1982, 12, 1),
            id: 'r3'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(1990, 8, 1),
            to: Date.UTC(1991, 4, 1),
            id: 'r4'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(2001, 4, 1),
            to: Date.UTC(2001, 12, 1),
            id: 'r5'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(2008, 1, 1),
            to: Date.UTC(2009, 7, 1),
            id: 'r6'
        });
    }
    if (chart.xAxis) {
        chart.xAxis[0].addPlotBand({
            color: '#F1F1F1',
            from: Date.UTC(2020, 3, 1),
            to: Date.UTC(2020, 5, 1),
            id: 'r7'
        });
    }
    isCompare = false;
}

function fNumber(e) {
    return e >= 1e6 ? (e / 1e6)
        .toFixed(2)
        .replace(/\.0$/, "") + "M" : e.toFixed(2)
}
Highcharts.setOptions({
    lang: {
        months: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
            'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
            'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ],
        shortMonths: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
        weekdays: [
            'Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4',
            'Thứ 5', 'Thứ 6', 'Thứ 7'
        ],
        thousandsSep: ',',
        decimalPoint: '.',
        viewData: 'Xem dữ liệu',
        viewFullscreen: 'Phóng to',
        exitFullscreen: 'Thu nhỏ',
        printChart: 'In biểu đồ',
        resetZoom: 'Đặt lại thu phóng',
        resetZoomTitle: 'Đặt lại mức thu phóng 1:1'
    }
});
// Thiết lập chủ đề tối cho biểu đồ
Highcharts.setOptions({
    exporting: {
        enabled: true,
        buttons: {
            contextButton: {
                menuItems: [
                    'viewFullscreen', // Thêm nút xem toàn màn hình
                    'separator',
                    'downloadPDF',
                    {
                        text: 'Xuất Dữ liệu CSV',
                        onclick: function() {
                            var csv = this.getCSV();
                            var link = document.createElement('a');
                            link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                            link.download = 'data.csv';
                            link.click();
                        }
                    },
                ]
            }
        }
    }
});
var config = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        zoomType: "x",
        height: '450',
        type: "spline",
        backgroundColor: 'transparent',
        chart: {
            zooming: {
                mouseWheel: {
                    enabled: !0
                }
            },
            margin: [0, 0, 0, 0]
        },
        resetZoomButton: {
            position: {
                x: 0,
                y: -40
            },
            theme: {
                fill: "white",
                style: {
                    fontSize: "12px",
                    padding: "0px"
                },
                stroke: "silver",
                r: 0,
                states: {
                    hover: {
                        fill: "#41739D",
                        style: {
                            color: "white"
                        }
                    }
                }
            }
        }
    },
    legend: {
        //layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom',
        //x: 70,
        //y: 10, 
        floating: !1,
        borderWidth: 0,
    },
    xAxis: {
        overscroll: 500000,
        gridLineWidth: 0,
        crosshair: {
            width: 1,
            color: 'gray',
            dashStyle: 'shortdot',
        },
        type: "datetime",
    },
    time: {
        useUTC: !1,
        timezone: "Asia/Ho_Chi_Minh"
    },
    title: {
        text: "",
        floating: !1,
        align: "left",
        style: {
            fontSize: "14px",
            fontFamily: "arial",
            display: "block"
        }
    },
    subtitle: {
        text: "",
        align: "left"
    },
    plotOptions: {
        series: {
            marker: {
                radius: 2
            },
            lineWidth: 1
        }
    },
    yAxis: !1,
    tooltip: {
        shared: true,
        useHTML: true,
        formatter: function() {
            var s = Highcharts.dateFormat('%A, %d/%m/%Y', this.x) + "<br/>";
            this.points.forEach(function(point, i) {
                var firstPoint = point.series.points[0].y
                var pointY = point.y,
                    change = ((pointY - firstPoint) / firstPoint * 100)
                    .toFixed(2),
                    c = change < 0 ? 'red' : 'green',
                    changetext = isCompare && firstPoint ? '<span style="color:' + c + '"> (' + change + '%)</span>' : '';
                // s += '<br/><b>' + point.series.name + ':</b> ' + fNumber(pointY) + changetext;
                s += `<div style="display: flex;align-items: flex-end; justify-content: space-between;"><div style="font-size:12px;font-weight:500;"><span style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:${point.color};"></span> ${point.series.name}</div><div style="float:right"><span style="font-size:12px;color:#3e4763;font-weight:600;margin-left:2px;margin-left: 10px;">${fNumber(pointY)} ${changetext}</span></div></div>`
            });
            return s;
        }
    },
    exporting: {
        enabled: 1
    },
    series: []
};

function changetheme(chart) {
    document.querySelector("#changeperiod").style.display = "block";
    chart && chart.update({
        chart: {
            backgroundColor: themes == 'light' ? 'rgb(255, 255, 255)' : '#30404d',
            style: {
                color: themes == 'light' ? '#000' : 'rgb(178, 181, 190)'
            },
        },
        legend: {
            useHTML: true,
            labelFormatter: function() {
                return `<span class="customLegend">${this.name}</span>`;
            }
        },
        title: {
            style: {
                color: themes == 'light' ? '#000' : 'rgb(178, 181, 190)'
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: themes == 'light' ? '#000' : 'rgb(178, 181, 190)'
                }
            }
        },
    });
    chart && chart.yAxis.length && chart.yAxis.forEach(y => {
        y.update({
            offset: 10,
            gridLineColor: themes == 'light' ? "rgba(42, 46, 57, 0.1)" : 'rgba(240, 243, 250, 0.06)',
            labels: {
                style: {
                    color: themes == 'light' ? '#000' : 'rgb(178, 181, 190)'
                }
            }
        })
    });
}
//Init
function init() {
    // kiểm tra đầu vào
    const ams = new URLSearchParams(window.location.search);
    const quote = ams.get("s");
    const ismax = ams.get("max");
    if (ismax) {
        document.querySelector(".mainchart")
            .setAttribute("style", "max-width:100%");
    }
    const key = allKey.find(x => x.code == quote);
    if (key) {
        if (key.type == 'cw' || key.type == 'index') mastrade(quote)
        else if (!isNaN(key.type)) mastrade(quote);
        else {
            var j = wiKeyword.findIndex(x => x.name === quote || x.className === quote);
            j !== -1 ? getMyChart(j) : wichart(39)
        }
    } else wichart(39);
    if (window.innerWidth > 500) {
        // hiển thị menu xổ xuống
        for (var i = 0; i < wiKeyword.length; i++) {
            let vimohanghoa = document.getElementById("vimohanghoa")
            let vimotiente = document.getElementById("vimotiente")
            let ccqcw = document.getElementById("ccq-cw")
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.className = "dropdown-item";
            a.href = "#"
            a.innerHTML = wiKeyword[i].keyWord
            a.id = wiKeyword[i].name
            li.appendChild(a);
            if (wiKeyword[i].type == 'ccq' || wiKeyword[i].type == 'cw') {
                ccqcw.appendChild(li)
            } else if (wiKeyword[i].type == 'vi_mo_hang_hoa') {
                vimohanghoa.appendChild(li)
            } else vimotiente.appendChild(li)
            document.querySelector(".vimo")
                .style.display = "block";
        }
    } else {
        period = "3M";
        document.querySelector(".vimo")
            .style.display = "none";
        document.querySelector("#changeperiod").style.top = "400px";
        document.querySelector("#changeperiod").style.right = "60px";
        document.querySelector(".v-suggestions")
            .style.right = "6px";
        document.querySelector(".suggestions")
            .style.right = "6px";
    }
}
init();
//-- Hàm hỗ trợ
// lấy chart
function getMyChart(t) {
    if (void 0 === t || t == -1) return !1
    else switch (wiKeyword[t].type) {
        case "investing":
            return investing(t);
        case "ccq":
            return fmarket(t);
        default:
            return wichart(t)
    }
}


// thay đổi khugn thời gian
function changePeriod(myChart) {
    check(period, myChart);

}
const buttonPeriod = document.getElementById("changeperiod")
let buttons = buttonPeriod.querySelectorAll('.bp3-button');
buttons.forEach(b => {
    b.addEventListener('click', (e) => {
        var type = e.target.innerText;
        type && check(type, myChart)
    });
});

function check(type, chart) {
    var initialMin = chart.xAxis[0].min;
     var initialMax = chart.xAxis[0].max;
    try {
        addchart = false;
        var now = new Date();
        var series = chart.series[0].data;
        var last = series[series.length - 1];
        let startDate;
        if (type == '%') {
            isCompare = !isCompare;
        } else {
            switch (type) {
                case "3M":
                    startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                    break;
                case "6M":
                    startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                    break;
                case "YTD":
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
                case "1Y":
                    startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                    break;
                case "3Y":
                    startDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
                    break;
                case "All":
                    startDate = new Date(initialMin);
                    break;
                default:
                    startDate = new Date(initialMin);
            }
		period = type;
            	chart.xAxis[0].setExtremes(startDate.getTime(), last.x);
                displayDataTable(chart, startDate.getTime());
        }
        buttons.forEach(c => {
            c.classList.remove('bp3-intent-primary');
            var text = c.innerText;
            text && period == text && c.classList.add('bp3-intent-primary');
            text && text == '%' && isCompare && c.classList.add('bp3-intent-primary');
        });
    } catch (e) {
        console.log(e)
    }
}

function roundToNearest(value, precision = 1000) {
    return Math.round(value / precision) * precision;
}

function displayDataTable(chart, startDate) {
    let timeValues = []; // Mảng chứa các giá trị thời gian duy nhất

    // Tạo bảng HTML
    let tableHtml = '<table border="1" cellpadding="5" cellspacing="0"><thead><tr>';

    // Dòng đầu tiên là các thời gian (X Value)
    chart.series.forEach(function(series) {
        series.data.forEach(function(point) {
            // Làm tròn giá trị point.x về mức độ chính xác mong muốn (ví dụ: 1000ms = 1 giây)
            let roundedTime = roundToNearest(point.x, 1000);
            if (roundedTime >= startDate && !timeValues.includes(roundedTime)) {
                timeValues.push(roundedTime); // Thêm thời gian vào mảng nếu chưa có
            }
        });
    });

    // Sắp xếp các giá trị thời gian từ mới đến cũ
    timeValues.sort((a, b) => b - a);

    // Dòng đầu tiên sẽ là các giá trị thời gian
    tableHtml += '<th>Thời gian</th>';
    timeValues.forEach(function(time) {
        tableHtml += `<th>${new Date(time).toLocaleDateString()}</th>`;
    });

    tableHtml += '</tr></thead><tbody>';

    // Duyệt qua tất cả các series và tạo các dòng cho bảng
    chart.series.forEach(function(series) {
        tableHtml += `<tr><td title="${series.name}">${series.name}</td>`; // Cột đầu tiên là tên của series
	var Data =  series.data.slice(-timeValues.length);
        // Duyệt qua các thời gian và điền giá trị vào bảng
        timeValues.forEach(function(time) {
		try{
            	let dataForTime = Data.find(point => new Date(point.x).toLocaleDateString() === new Date(time).toLocaleDateString());
                tableHtml += `<td>${dataForTime? dataForTime.y.toFixed(2): ''}</td>`; // Nếu có dữ liệu, điền vào, nếu không thì để trống
		}catch(e){tableHtml += `<td></td>`; }
        });

        tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';

    const tableContainer = document.createElement('div');
    tableContainer.innerHTML = tableHtml;
    tableContainer.setAttribute("style", "height: calc(100vh - 515px); overflow: auto; width: calc(100vw - 35px); margin: 4px;");
    const dataTableContainer = document.getElementById('table'); // Element chứa bảng
    if (dataTableContainer) {
        dataTableContainer.innerHTML = ''; // Xóa bảng cũ nếu có
        dataTableContainer.appendChild(tableContainer); // Chèn bảng mới
    }
}


// thêm trục phục
function addyAsix(title = "") {
    isCompare = true;
    check(period, myChart);
    const sosanhAxis = myChart.yAxis.find((axis) => axis.id === 'sosanh');
    if (sosanhAxis) {
        myChart.yAxis.remove(sosanhAxis);
    }
    myChart.addAxis({
        id: 'sosanh',
        lineWidth: 1,
        title: {
            text: title,
            style: {
                color: Highcharts.getOptions()
                    .colors[0]
            }
        },
        gridLineColor: themes == 'light' ? "rgba(42, 46, 57, 0.1)" : 'rgba(240, 243, 250, 0.06)',
        labels: {
            style: {
                color: themes == 'light' ? '#000' : 'rgb(178, 181, 190)'
            }
        },
        opposite: false
    });
    myChart.update({
        tooltip: {
            shared: true
        }
    });
}

function correctDate(unixTime) {
    let date = new Date(unixTime); // Chuyển Unix timestamp thành đối tượng Date (tính bằng milliseconds)
    // Lấy ngày, tháng, năm
    let day = date.getDate();
    let month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    let year = date.getFullYear();

    // Đảm bảo định dạng dd/mm/yyyy
    let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    // Trả về Unix timestamp của ngày đã được điều chỉnh (lấy lại theo ngày tháng năm mới)
    return new Date(formattedDate).getTime(); // Chuyển lại thành Unix timestamp
}

// lấy dữ liệu giá chứng quyền và chứng khoán từ fialda
async function mastrade(symbol) {
    myChart && myChart.showLoading();
    config.yAxis = {
        lineWidth: 1,
        title: {
            text: ""
        },
        labels: {
            align: 'center',
            style: {
                color: Highcharts.getOptions()
                    .colors[0]
            }
        },
        opposite: true,
        crosshair: {
            width: 1,
            color: 'gray',
            dashStyle: 'shortdot',
        },
    };
    let symbolData = allKey.find(t => t.code === symbol);
    if (!symbolData) {
        loading(0);
        return;
    }
    let ohlc = [];
    const url = mastradingviewURL + '?symbol=' + symbol + '&resolution=1D&from=' + parseInt(Date.parse("2000-01-01") / 1000) + '&to=' + parseInt(Date.parse(getCurrentDate()) / 1000);
    var res = await fetch(url)
    var data = await res.json();
    var k = symbolData.type == "index" ? 1 : 1000;
    for (var i = 0; i < data.t.length; i += 1) {
        ohlc.push({
            "time": correctDate(parseInt(data.t[i]) * 1000),
            "open": parseFloat(data.o[i]) / k,
            "high": parseFloat(data.h[i]) / k,
            "low": parseFloat(data.l[i]) / k,
            "close": parseFloat(data.c[i]) / k
        });
    }
    var last = ohlc[ohlc.length - 1]
    var last2 = ohlc[ohlc.length - 2]
    var changp = last.close - last2.close
    var changpe = 100 * last.close / last2.close - 100
    config.title.text = symbolData.fullname_vi;
    config.subtitle.text = `<b>${last.close.toFixed(2)} (${changp.toFixed(2)}/${changpe.toFixed(2)}%)</b><br/> (Ngày ${convertNumberToDate(last.time)})`;
    if (symbolData.type == 'cw') {
        let expireDate = wiKeyword[wiKeyword.findIndex(s => s.name === symbol)].expireDate;
        config.subtitle.text = `<b>${last.close.toFixed(2)} (${changp.toFixed(2)}/${changpe.toFixed(2)}%)</b><br/> (GDCC: ${expireDate})`
    }
    config.series = [{
        name: symbol.toUpperCase(),
        data: ohlc.map(t => [t.time, t.close])
    }]
    config.credits = {
        enabled: true,
        text: 'Nguồn: mastrade.masvn.com',
        href: 'https://mastrade.masvn.com/trading',
        position: {
            align: 'right',
            x: -10,
            verticalAlign: 'bottom',
            y: -5
        },
        style: {
            fontSize: '10px',
            color: '#999999'
        }
    }
    if (addchart) {
        addyAsix()
        myChart.addSeries({
            name: config.series[0].name,
            data: config.series[0].data,
            yAxis: 'sosanh',
        });
        period = "1Y";
            changePeriod(myChart)
    } else {
        myChart && myChart.destroy();
        myChart = new Highcharts.chart('dulieuvimo', config, function(chart) {
            dis_recession(chart);
            changePeriod(chart)
        });
    }
    myChart.hideLoading();
    loading(0)
}
// Lấy dữ liệu từ investing 
async function investing(i) {
    myChart && myChart.showLoading();
    config.yAxis = {
        lineWidth: 1,
        title: {
            text: ""
        },
        labels: {
            align: 'center',
            style: {
                color: Highcharts.getOptions()
                    .colors[0]
            }
        },
        opposite: true,
        crosshair: {
            width: 1,
            color: 'gray',
            dashStyle: 'shortdot',
        },
    };
    const event = wiKeyword[i].className.includes("json");
    const url = event ? `https://sbcharts.investing.com/events_charts/us/${wiKeyword[i].className}` : `https://api.investing.com/api/financialdata/${wiKeyword[i].className}/historical/chart/?period=MAX&interval=P1D&pointscount=120`
    var res = await fetch(url)
    var data = await res.json();
    var last = data.data[data.data.length - 1]
    var last2 = data.data[data.data.length - 2]
    var changp = last[event ? 1 : 4] - last2[event ? 1 : 4]
    var changpe = 100 * last[event ? 1 : 4] / last2[event ? 1 : 4] - 100
    config.subtitle.text = `<b>${last[event? 1: 4].toFixed(2)} (${changp.toFixed(2)}/${changpe.toFixed(2)}%)</b><br/> (Ngày ${convertNumberToDate(last[0])})`
    config.title.text = wiKeyword[i].keyWord
    //config.subtitle.text = `<b>${last[event? 1: 4].toFixed(2)}</b><br/> (Ngày ${convertNumberToDate(last[0])})`
    config.series = [{
        name: wiKeyword[i].keyWord,
        data: data.data.map(t => [correctDate(t[0]), t[event ? 1 : 4]])
    }]
    config.credits = {
        enabled: true,
        text: 'Nguồn: investing.com',
        href: 'https://investing.com/',
        target: '_blank',
        position: {
            align: 'right',
            x: -10,
            verticalAlign: 'bottom',
            y: -5
        },
        style: {
            fontSize: '10px',
            color: '#999999'
        }
    }
    if (addchart) {
        addyAsix()
        myChart.addSeries({
            name: config.series[0].name,
            data: config.series[0].data,
            yAxis: 'sosanh',
        });
        period = "1Y";
            changePeriod(myChart)
    } else {
        myChart && myChart.destroy();
        myChart = new Highcharts.chart('dulieuvimo', config, function(chart) {
            dis_recession(chart);
            changePeriod(chart)
        });
    }
    myChart.hideLoading();
    loading(0)
}
// tính drawdown
function calculateDrawdown(prices) {
    let maxPrice = prices[0];
    let maxDrawdown = 0;
    let currentDrawdown = 0;
    for (let i = 1; i < prices.length; i++) {
        const price = prices[i];
        if (price > maxPrice) {
            maxPrice = price;
            currentDrawdown = 0;
        } else {
            const drawdown = (maxPrice - price) / maxPrice;
            if (drawdown > maxDrawdown) {
                maxDrawdown = drawdown;
            }
            if (drawdown > currentDrawdown) {
                currentDrawdown = drawdown;
            }
        }
    }
    return {
        maxDrawdown,
        currentDrawdown
    };
}
// tính beta
async function calculateBeta(mackin) {
    const YYYYMMDD = (t) => {
        const e = new Date(t),
            n = e.getFullYear(),
            a = e.getMonth() + 1,
            r = e.getDate();
        return `${n}-${a.toString().padStart(2,"0")}-${r.toString().padStart(2,"0")}`
    }
    const slope = (e, t) => {
        for (var r = e.length, a = 0, n = 0, h = 0, o = 0, l = 0; l < r; l++) a += t[l],
            n += e[l], h += t[l] * e[l], o += t[l] * t[l], e[l] * e[l];
        return (r * h - a * n) / (r * o - a * a)
    }
    var getD = await fetch(mastradingviewURL + '?symbol=VN-INDEX&resolution=1D&from=' + parseInt(Date.parse("2010-01-01") / 1000) + '&to=' + parseInt(Date.parse(getCurrentDate()) / 1000));
    var Don = await getD.json();
    if (!Don) return;
    var vnindexin = [];
    for (var i = 0; i < Don.t.length; i++) {
        vnindexin.push({
            "time": YYYYMMDD(parseInt(Don.t[i]) * 1000),
            "close": parseFloat(Don.c[i])
        });
    }
    if (mackin.length > 250) {
        mackin = mackin.slice(-250);
    }
    var vnIndexPrices = [],
        stockPrices = [];
    for (var j = 0; j < mackin.length; j++) {
        const f = vnindexin.find(c => c.time === mackin[j].navDate);
        f && (vnIndexPrices.push(f), stockPrices.push(mackin[j]));
    }
    //log(vnIndexPrices, stockPrices)
    // tính tỉ suất mã CCQ
    stockPrices = stockPrices.map(s => s.nav);
    stockPrices = stockPrices.map((r, c) => {
        if (0 === c) return 0;
        const e = stockPrices[c - 1];
        return (r - e) / e
    });
    // tính tỉ suất VNINDEX
    vnIndexPrices = vnIndexPrices.map(s => s.close);
    vnIndexPrices = vnIndexPrices.map((r, c) => {
        if (0 === c) return 0;
        const e = vnIndexPrices[c - 1];
        return (r - e) / e
    });
    // in kết quả
    return slope(stockPrices, vnIndexPrices);
}
// Giá Chứng chỉ quỹ
async function fmarket(i) {
    myChart && myChart.showLoading();
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "isAllData": 0,
            "productId": wiKeyword[i].className,
            "fromDate": "20000101",
            "toDate": getNgayHienTai(),
        }),
    };

    function getNgayHienTai() {
        const date = new Date();
        const nam = date.getFullYear();
        const thang = date.getMonth() + 1;
        const ngay = date.getDate();
        const ngayHienTai = `${nam}${thang.toString().padStart(2, "0")}${ngay.toString().padStart(2, "0")}`;
        return ngayHienTai;
    }
    var res = await fetch('https://api.fmarket.vn/res/product/get-nav-history', fetchOptions)
    var data = await res.json();
    if (data.status != 200 && loading(0)) {
        return;
    }
    var beta = await calculateBeta(data.data);
    const unixTime = (e) => (new Date(e)).getTime();
    var last = data.data[data.data.length - 1];
    var elast = data.data[data.data.length - 2];
    const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;
    const dataWithinLastYear = data.data.find(m => new Date()
        .getTime() - unixTime(m.navDate) <= millisecondsInYear);
    const dataWithinLast2Years = data.data.find(m => new Date()
        .getTime() - unixTime(m.navDate) <= 2 * millisecondsInYear);
    const dataWithinLast3Years = data.data.find(m => new Date()
        .getTime() - unixTime(m.navDate) <= 3 * millisecondsInYear);
    const dataWithinLast4Years = data.data.find(m => new Date()
        .getTime() - unixTime(m.navDate) <= 4 * millisecondsInYear);
    var fundReturns = [];
    fundReturns.push((last.nav / dataWithinLastYear.nav - 1))
    fundReturns.push((dataWithinLastYear.nav / dataWithinLast2Years.nav - 1))
    fundReturns.push((dataWithinLast2Years.nav / dataWithinLast3Years.nav - 1))
    fundReturns.push((dataWithinLast3Years.nav / dataWithinLast4Years.nav - 1))
    const {
        maxDrawdown,
        currentDrawdown
    } = calculateDrawdown(data.data.map(t => t.nav));
    //console.log(fundReturns)
    //console.log(maxDrawdown, currentDrawdown);
    var maxDrawdowntext = `MaxDrawdown: ${(maxDrawdown*100).toFixed(1)}% |Beta: ${beta.toFixed(2)}`;
    const riskFreeRate = 0.025; // Lãi suất không rủi ro, ví dụ: lãi suất trái phiếu
    const sharpeRatio = calculateSharpeRatio(fundReturns, riskFreeRate);
    const sharpeText = dataWithinLast3Years !== dataWithinLast4Years ? `Sharpe: ${sharpeRatio.toFixed(2)}` : '';
    var changes = last.nav - elast.nav;
    var percentChange = (last.nav / elast.nav - 1) * 100
    var percentChange1y = (last.nav / dataWithinLastYear.nav - 1) * 100
    var percentChange3y = (Math.cbrt(last.nav / dataWithinLast3Years.nav) - 1) * 100;
    //const differenceInDays = Math.abs(unixTime(last.navDate) - unixTime(data.data[0].navDate));
    //const years = differenceInDays / (1000 * 60 * 60 * 24 * 365.25);
    //const percentChangeall = (((last.nav / data.data[0].nav) ** (1 / years)) - 1 )*100;
    config.title.text = wiKeyword[i].keyWord;
    config.subtitle.text = `<b>${last.nav.toFixed(2)} (${percentChange.toFixed(2)}%)</b> | ${last.navDate}<br/>CAGR: 1Y/${percentChange1y.toFixed(2)}% - 3Y/${percentChange3y.toFixed(2)}% <br/> ${sharpeText} ${maxDrawdowntext}`;
    config.series = [{
        name: wiKeyword[i].name,
        data: data.data.map(t => [correctDate(unixTime(t.navDate)), t.nav])
    }]
    config.yAxis = {
        lineWidth: 1,
        title: {
            text: ""
        },
        crosshair: {
            width: 1,
            color: 'gray',
            dashStyle: 'shortdot',
        },
        labels: {
            align: 'center',
            style: {
                color: Highcharts.getOptions()
                    .colors[0]
            }
        },
        opposite: true
    };
    config.credits = {
        enabled: true,
        text: 'Nguồn: fmarket.vn',
        href: 'https://fmarket.vn/',
        target: '_blank',
        position: {
            align: 'right',
            x: -10,
            verticalAlign: 'bottom',
            y: -5
        },
        style: {
            fontSize: '10px',
            color: '#999999'
        }
    }
    if (addchart) {
        addyAsix()
        myChart.addSeries({
            name: config.series[0].name,
            data: config.series[0].data,
            yAxis: 'sosanh'
        });
        period = "1Y"
        changePeriod(myChart)
    } else {
        myChart && myChart.destroy();
        myChart = new Highcharts.chart('dulieuvimo', config, function(chart) {
            dis_recession(chart);
            changePeriod(chart)
        });
    }
    loading(0);
    myChart.hideLoading();
}
// lấy dữ liệu vĩ mô từ wichart
async function wichart(i) {
    myChart && myChart.showLoading();
    const url = 'https://api.wichart.vn/vietnambiz/vi-mo?name=' + wiKeyword[i].name + (wiKeyword[i].type == "vi_mo_hang_hoa" ? "&key=hanghoa" : "")
    var res = await fetch(url)
    var data = await res.json();
    var arrayString = [],
        i = 0,
        date = [],
        arrayFinal = [],
        typechart, txt,
        seriesName, ysix = [];
    let units = data.unitArray;
    1 == units.length ? ysix = {
        lineWidth: 1,
        opposite: 1,
        crosshair: {
            width: 1,
            color: 'gray',
            dashStyle: 'shortdot',
        },
        title: {
            text: units[0]
        },
        labels: {
            style: {
                color: Highcharts.getOptions()
                    .colors[0]
            }
        }
    } : units[0] == units[1] ? ysix = {
        lineWidth: 1,
        opposite: 1,
        crosshair: {
            width: 1,
            color: 'gray',
            dashStyle: 'shortdot',
        },
        title: {
            text: units[0]
        },
        labels: {
            style: {
                color: Highcharts.getOptions()
                    .colors[0]
            }
        }
    } : units.forEach(t => {
        ysix.push({
            lineWidth: 1,
            title: {
                text: t
            },
            crosshair: {
                width: 1,
                color: 'gray',
                dashStyle: 'shortdot',
            },
            labels: {
                style: {
                    color: Highcharts.getOptions()
                        .colors[0]
                }
            },
            opposite: i
        }), i += 1
    });
    data.chart.series.forEach(s => {
        arrayFinal.push({
            name: s.name,
            data: s.data.sort(),
            fillMissingValues: {
                type: "previous"
            },
            connectNulls: true,
            type: (s.type == 'bar' ? 'column' : 'spline'),
            yAxis: units.indexOf(s.unit) == -1 ? 0 : units.indexOf(s.unit)
        });
    });
    if (arrayFinal[0].data.length < 30) arrayFinal[0].type = 'column'
    config.subtitle.text = data.titleIndex.length == 1 ? `<strong>${data.titleIndex[0]} ${data.unitArray[0]}</strong> <br/> (${data.timeUpdate})` : `<strong>${data.titleIndex[0]} ${data.unitArray[0]} - ${data.titleIndex[1]} ${data.unitArray[1]}</strong> <br/> (${data.timeUpdate})`
    config.title.text = data.title
    config.series = arrayFinal
    config.yAxis = ysix
    config.credits = {
        enabled: true,
        text: 'Nguồn: wichart.vn',
        href: 'https://wichart.vn/',
        target: '_blank',
        position: {
            align: 'right',
            x: -10,
            verticalAlign: 'bottom',
            y: -5
        },
        style: {
            fontSize: '10px',
            color: '#999999'
        }
    }
    config.plotOptions = {
        column: {
            stacking: data.stacked_column
        },
        line: {
            dataLabels: {
                enabled: 0
            }
        },
        series: {
            marker: {
                radius: 1
            },
            lineWidth: 1
        }
    }
    if (addchart) {
        addyAsix(units[0])
        myChart.addSeries({
            name: config.series[0].name,
            data: config.series[0].data.sort(),
            yAxis: 'sosanh',
            fillMissingValues: {
                type: "previous"
            },
            connectNulls: true,
        });
        period = "1Y"; changePeriod(myChart);
    } else {
        myChart && myChart.destroy();
        myChart = new Highcharts.chart('dulieuvimo', config, function(chart) {
            changePeriod(chart);
            changetheme(chart)
        });
    }
    myChart.hideLoading();
    loading(0);
}
// hiển thị loading
function loading(i = !0) {
    document.getElementById("load")
        .innerHTML = i ? `<div class="loading-container">
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>` : ""
}
// -- Reaction button---///
// menu sổ xuống
document.querySelector(".vimo")
    .addEventListener('click', function(e) {
        var index = wiKeyword.findIndex(x => x.name === e.target.id);
        if (index > -1) {
            if (e.ctrlKey) {
                e.preventDefault();
                addchart = true;
            }
            if (wiKeyword[index].type == "cw") mastrade(e.target.id)
            else getMyChart(index)
        }
    })
// nhấn esc
document.addEventListener("keyup", function(t) {
    27 === t.keyCode && (t.preventDefault(), window.close())
});
// ô tim kiếm
var timkiem = document.getElementById("searchCK")
var listCK = document.getElementById("listCK")
const n = () => {
    listCK.innerHTML = "";
    var temp = [];
    // loại bỏ trùng lặp
    mack = mack.filter((o, i, self) => {
        return i === self.findIndex((e) => e.code === o.code);
    });
    mack.forEach(t => {
        if (!isNaN(t.type)) {
            listCK.innerHTML += `<span><li class="item" id="${t.code}">${t.code} - ${t.fullname_vi}</li></span>`;
            temp.push(t);
        } else if (t.type !== 'link') {
            listCK.innerHTML += `<span><li class="item" id="${t.code}"> ${t.fullname_vi}</li></span>`;
            temp.push(t)
        }
    })
    temp.length && listCK.setAttribute("style", "display:block!important")
};
listCK.addEventListener("click", function(e) {
    var codevm = e.target.id;
    if (codevm) {
        if (e.ctrlKey) {
            e.preventDefault();
            addchart = true;
        }
        const key = allKey.find(x => x.code == codevm);
        if (key) {
            if (key.type == 'cw' || key.type == 'index') mastrade(codevm)
            else if (!isNaN(key.type)) mastrade(codevm);
            else {
                var j = wiKeyword.findIndex(x => x.name === codevm || x.className === codevm);
                j !== -1 && getMyChart(j)
            }
        }
    }
    listCK.setAttribute("style", "display:none!important")
});
var faq = [{
        "code": "cpi",
        "fullname_vi": "Chỉ số giá tiêu dùng",
        "type": "vi_mo_tien_te"
    },
    {
        "code": "usa_cpi",
        "fullname_vi": "Chỉ số CPI Mỹ (%YoY)",
        "type": "investing"
    }, {
        "code": "dxy",
        "fullname_vi": "Dollar Index",
        "type": "investing"
    }, {
        "code": "crude-oil",
        "fullname_vi": "Crude Oil WTI Futures",
        "type": "investing"
    }, {
        "code": "LCOc1",
        "fullname_vi": "Brent Oil Futures",
        "type": "investing"
    }, {
        "code": "thep",
        "fullname_vi": "Giá thép",
        "type": "vi_mo_hang_hoa"
    },
    {
        "code": "usdvnd",
        "fullname_vi": "US Dollar Vietnamese Dong",
        "type": "investing"
    },
    {
        "code": "dhtg",
        "fullname_vi": "Tỷ giá trung tâm",
        "type": "vi_mo_tien_te"
    },
    {
        "code": "lslnh",
        "fullname_vi": "Lãi suất liên ngân hàng",
        "type": "vi_mo_tien_te"
    }

];
timkiem.addEventListener("input", function(t) {
    let a = t.target.value;
    t.target.value = a.toUpperCase();
    if (this.value.length >= 3) {
        mack = allKey.filter(t => (t.code + " " + t.fullname_vi)
            .toLowerCase()
            .includes(this.value.toLowerCase())), n()
    } else {
        mack = faq;
        n();
        //listCK.setAttribute("style", "display:none!important")
    }
});
window.addEventListener('click', (e) => {
    (e.target != listCK || !listCK.contains(e.target)) && listCK.setAttribute("style", "display:none!important")
});


function calculateSharpeRatio(returns, riskFreeRate) {
    const calculateAverage = (array) => {
        const sum = array.reduce((total, value) => total + value, 0);
        return sum / array.length;
    }
    const calculateStandardDeviation = (array) => {
        const average = calculateAverage(array);
        const squaredDifferences = array.map(value => Math.pow(value - average, 2));
        const variance = calculateAverage(squaredDifferences);
        const standardDeviation = Math.sqrt(variance);
        return standardDeviation;
    }
    // Tính lợi tức trung bình và độ lệch chuẩn của lợi tức
    const averageReturn = calculateAverage(returns);
    const standardDeviation = calculateStandardDeviation(returns);
    // Tính hệ số Sharpe
    const sharpeRatio = (averageReturn - riskFreeRate) / standardDeviation;
    return sharpeRatio;
}