'use strict';

function loading(i = !0) {
    document.getElementById("load")
        .innerHTML = i ? `<div class="loading-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>` : "";
}
getStockData();

function toUpperCase() {
    const stockSymbolInput = document.getElementById('stockSymbol');
    stockSymbolInput.value = stockSymbolInput.value.toUpperCase();
}
async function getStockData() {
    const stockSymbol = document.getElementById('stockSymbol').value;
    const reportType = document.getElementById('reportType').value;
    if (stockSymbol) {
        if (reportType) {
            loading(1);
            console.log("Đang lấy dữ liệu cho cổ phiếu: " + stockSymbol + " với loại báo cáo mã: " + reportType);
        } else {
            alert("Vui lòng chọn loại báo cáo.");
            return;
        }
    } else {
        alert("Vui lòng nhập mã cổ phiếu.");
        return;
    }
    let data;
    //view =2: kết quả kinh doanh
    // view = 1: cân đối tài chính
    // view = 3 lưu chuyển tiền tệ

    async function getFinancialReport(symbol, view = 2, period = 2, page = 1) {
        const url = `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-report?symbol=${symbol}&period=${period}&view=${view}&page=${page}&expanded=true`;
        const url2 = `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-report?symbol=${symbol}&period=${period}&view=${view}&page=${page+1}&expanded=true`;
        try {
            const response = await fetch(url);
            const response2 = await fetch(url2);

            if (!response.ok ||!response2.ok ) {
                throw new Error('Network response was not ok');
		loading(0)
            }

            data = await response.json(); // Chuyển đổi dữ liệu thành JSON
            let data2 = await response2.json(); // Chuyển đổi dữ liệu thành JSON

   	   const findObjectByKey = (key) => {
    		return data2.data.rows.find(obj => obj.key === key);
	   };

		data2.data.headers.forEach(s=> {data.data.headers.push(s)});
		data.data.rows.forEach(row=> {
			let obj = findObjectByKey(row.key);
			if(obj) {
				row.values = row.values.concat(obj.values)
			}
		});
        } catch (error) {
            console.error('Error fetching financial report:', error);
        }
    }

async function getPriceChart(symbol) {
    const urls = [
        `https://api-finance-t19.24hmoney.vn/v2/ios/stock/graph?&symbol=${symbol}&type=6`, // giá cp
        `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-graph?symbol=${symbol}&graph_type=6&year_report=5`, // pe, eps 4qgn
        `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-graph?symbol=${symbol}&graph_type=3&year_report=5`, // dt và ln 4qgn
        `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-graph?symbol=${symbol}&graph_type=7&year_report=5`//roa, roe
    ];

    try {
        const [response, response2, response3,response4] = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));

        if (!response || !response2 || !response3|| !response4) throw new Error('Invalid data received');

        const getDataPoints = (response, index) => response.data.points.map(point => {
            const date = new Date(point.x * 1000);
            const month = date.getMonth() + 1;
            if (![1, 4, 7, 10].includes(month)) return null;
            return {
                price: point[`y${index || ''}`], // Giá dựa trên index (y1 hoặc y)
                year: date.getFullYear(),
                month,
                day: date.getDate(),
                quarter: Math.floor((month - 1) / 3) + 1
            };
        }).filter(Boolean);

        const priceData = getDataPoints(response).slice(-16).map(item => item.price).reverse();
        const peData = getDataPoints(response2, 1).slice(-16).map(item => item.price).reverse();
        const epsData = getDataPoints(response2).slice(-16).map(item => item.price).reverse();
        const dtData = getDataPoints(response3).slice(-16).map(item => item.price).reverse();
        const lnData = getDataPoints(response3, 1).slice(-16).map(item => item.price).reverse();
        const roa = getDataPoints(response4).slice(-16).map(item => item.price).reverse();
        const roe = getDataPoints(response4, 1).slice(-16).map(item => item.price).reverse();
        const roa4 = getDataPoints(response4, 2).slice(-16).map(item => item.price).reverse();
        const roe4 = getDataPoints(response4, 3).slice(-16).map(item => item.price).reverse();

        const createRow = (key ,name, data) => ({
            "key": `isa${key}`,
            "level": 1,
            "get_raw": 1,
            "values": data.flatMap(item => [item, 0]),
            "data": true,
            "name": name
        });

        data.data.rows.push(
            createRow("200","Giá CP", priceData),
            createRow("201","P/E", peData),
            createRow("202","EPS 4QGN", epsData),
            createRow("203", "DT 4QGN", dtData),
            createRow("204","LNST 4QGN", lnData),
            createRow("205","ROA quý", roa),
            createRow("206","ROE quý", roe),
            createRow("206","ROA 4QGN", roa4),
            createRow("207","ROE 4QGN", roe4),
        );

        createOption(data);
    } catch (error) {
        console.error('Error fetching financial report:', error);
    }
}

    await getFinancialReport(stockSymbol, reportType);
    await getPriceChart(stockSymbol);
    loading(0)
    // Hàm vẽ biểu đồ
    function drawChart(selectedDataKeys, chartTypes, yAxisTypes) {
        let seriesData = selectedDataKeys.map(key => {
            const selectedRow = data.data.rows.find(row => row.key === key);
            if (!selectedRow) return null;

            const chartData = selectedRow.values.filter((_, index) => index % 2 === 0); // Lấy các giá trị "normal"
            const chartType = chartTypes[key] || 'column'; // Lấy kiểu biểu đồ cho dòng dữ liệu
            const yAxisPosition = yAxisTypes[key] === 'right' ? 1 : 0; // Xác định trục Y trái hoặc phải

            return {
                name: selectedRow.name,
                data: chartData,
                type: chartType,
                yAxis: yAxisPosition
            };
        }).filter(Boolean); // Loại bỏ các dòng dữ liệu null
	let cat = data.data.headers.filter(header => header.type === 'normal').map(header => `Q${header.quarter}/${header.year}`)
        Highcharts.chart('container', {
            chart: {
                 zoomType: "x",
                type: 'column', // Mặc định kiểu biểu đồ cột
            },
            title: {
                text: stockSymbol
            },
            xAxis: {
		crosshair: 1,
                reversed: true, // Đảo ngược trục X
                categories: data.data.headers.filter(header => header.type === 'normal').map(header => `Q${header.quarter}/${header.year}`),
            },

    tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name} ' +
            '</td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
    },
    // Thêm nút reset zoom

            credits: {
                enabled: false
            },
            yAxis: [{
                // Trục Y bên trái
                title: {
                    text: ''
                }
            }, {
                // Trục Y bên phải
                title: {
                    text: ''
                },
                opposite: true
            }],
            series: seriesData
        });
    }

    // Lắng nghe sự kiện thay đổi checkbox hoặc dropdown
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    const dropdowns = document.querySelectorAll('.checkbox-container .chart-type');
    const yAxisDropdowns = document.querySelectorAll('.checkbox-container .y-axis-type');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedDataKeys = getSelectedDataKeys();
            const chartTypes = getChartTypes();
            const yAxisTypes = getYAxisTypes();
            drawChart(selectedDataKeys, chartTypes, yAxisTypes);
        });
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            const selectedDataKeys = getSelectedDataKeys();
            const chartTypes = getChartTypes();
            const yAxisTypes = getYAxisTypes();
            drawChart(selectedDataKeys, chartTypes, yAxisTypes);
        });
    });

    yAxisDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            const selectedDataKeys = getSelectedDataKeys();
            const chartTypes = getChartTypes();
            const yAxisTypes = getYAxisTypes();
            drawChart(selectedDataKeys, chartTypes, yAxisTypes);
        });
    });

    // tạo option tùy theo từng loại báo cáo tài chính
    function createOption(datas) {
        const container = document.getElementById('checkbox-container');
        container.innerHTML = "";
        datas.data.rows.forEach(row => {
            const div = document.createElement('div');
	    div.setAttribute("class", "selectOption");
            const divs = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = row.key;
	    ["LỢI NHUẬN SAU THUẾ TNDN","Lợi nhuận sau thuế thu nhập doanh nghiệp","Lợi nhuận sau thuế", "Giá CP"].forEach(nam => {
            		if (row.name == nam) {
                		input.checked = true;
           		}
		});

            label.appendChild(input);
            label.appendChild(document.createTextNode(' ' + row.name));
            div.appendChild(label);

            const chartTypeSelect = document.createElement('select');
            chartTypeSelect.className = 'chart-type';
            chartTypeSelect.setAttribute('data-key', row.key);
            ['Cột', 'Đường', 'Miền'].forEach(type => {
                const option = document.createElement('option');
                option.value = type === 'Cột' ? 'column' : (type === 'Miền' ? 'areaspline' : 'spline');
                option.textContent = type;
                chartTypeSelect.appendChild(option);
            });
            if (row.name == "Giá CP") {
                chartTypeSelect.value = 'spline';
            }

            divs.appendChild(chartTypeSelect);

            const yAxisTypeSelect = document.createElement('select');
            yAxisTypeSelect.className = 'y-axis-type';
            yAxisTypeSelect.setAttribute('data-key', row.key);
            ['Trái', 'Phải'].forEach(type => {
                const option = document.createElement('option');
                option.value = type === 'Trái' ? 'left' : 'right';
                option.textContent = type;
                yAxisTypeSelect.appendChild(option);
            });
            if (row.name == "Giá CP") {
                yAxisTypeSelect.value = 'right';
            }
            divs.appendChild(yAxisTypeSelect);
            div.appendChild(divs);

            container.appendChild(div);
        });
    }

    // Lấy các dòng dữ liệu đã chọn từ các checkbox
    function getSelectedDataKeys() {
        const selectedCheckboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
        return Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
    }

    // Lấy kiểu biểu đồ đã chọn cho từng dòng dữ liệu
    function getChartTypes() {
        const chartTypes = {};
        const dropdowns = document.querySelectorAll('.checkbox-container .chart-type');
        dropdowns.forEach(dropdown => {
            const key = dropdown.getAttribute('data-key');
            const type = dropdown.value;
            chartTypes[key] = type;
        });
        return chartTypes;
    }

    // Lấy lựa chọn trục Y đã chọn cho từng dòng dữ liệu
    function getYAxisTypes() {
        const yAxisTypes = {};
        const dropdowns = document.querySelectorAll('.checkbox-container .y-axis-type');
        dropdowns.forEach(dropdown => {
            const key = dropdown.getAttribute('data-key');
            const type = dropdown.value;
            yAxisTypes[key] = type;
        });
        return yAxisTypes;
    }

    // Vẽ biểu đồ lần đầu tiên
    const initialSelectedKeys = getSelectedDataKeys();
    const initialChartTypes = getChartTypes();
    const initialYAxisTypes = getYAxisTypes();
    drawChart(initialSelectedKeys, initialChartTypes, initialYAxisTypes);

}