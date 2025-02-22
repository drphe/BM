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
        const url = `https://api-finance-t19.24hmoney.vn/v2/ios/stock/graph?&symbol=${symbol}&type=6`;
        const url2 = `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-graph?symbol=${symbol}&graph_type=6&year_report=5`;//pe, eps 4qgn
        const url3 = `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-graph?symbol=${symbol}&graph_type=3&year_report=5`;//dt và ln 4qgn

        try {
            const response = await fetch(url);
            const response2 = await fetch(url2);
            const response3 = await fetch(url3);
            // Kiểm tra nếu phản hồi không hợp lệ

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const datas = await response.json(); // Chuyển đổi dữ liệu thành JSON
            const datas2 = await response2.json(); // Chuyển đổi dữ liệu thành JSON
            const datas3 = await response3.json(); // Chuyển đổi dữ liệu thành JSON

            if (!datas || !datas.data || !datas.data.points || datas.data.points.length === 0) {
                throw new Error('No price data available');
            }

            // Lấy dữ liệu điểm (price data)
            const points = datas.data.points;
            const points2 = datas2.data.points;
            const points3 = datas3.data.points;

            // Chuyển đổi dữ liệu theo năm và quý
            const pricedatas = points.map(point => {
                const date = new Date(point.x * 1000); // Chuyển đổi timestamp thành đối tượng Date
                const year = date.getFullYear();
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                const quarter = Math.floor((month - 1) / 3) + 1; // Chia tháng vào quý
                if (month !== 1 && month !== 4 && month !== 7 && month !== 10) return null;

                return {
                    price: point.y, // Giá cổ phiếu
                    year: year,
                    month: month,
                    day: day,
                    quarter: quarter
                };

            }).filter(Boolean);

            const pedatas = points2.map(point => {
                const date = new Date(point.x * 1000); // Chuyển đổi timestamp thành đối tượng Date
                const year = date.getFullYear();
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                const quarter = Math.floor((month - 1) / 3) + 1; // Chia tháng vào quý
                if (month !== 1 && month !== 4 && month !== 7 && month !== 10) return null;
                return {
                    price: point.y1, // PE
                    year: year,
                    month: month,
                    day: day,
                    quarter: quarter
                };
            }).filter(Boolean);;

            const epsdatas = points2.map(point => {
                const date = new Date(point.x * 1000); // Chuyển đổi timestamp thành đối tượng Date
                const year = date.getFullYear();
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                const quarter = Math.floor((month - 1) / 3) + 1; // Chia tháng vào quý
                if (month !== 1 && month !== 4 && month !== 7 && month !== 10) return null;
                return {
                    price: point.y, // EPS
                    year: year,
                    month: month,
                    day: day,
                    quarter: quarter
                };
            }).filter(Boolean);;

            const dtdatas = points3.map(point => {
                const date = new Date(point.x * 1000); // Chuyển đổi timestamp thành đối tượng Date
                const year = date.getFullYear();
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                const quarter = Math.floor((month - 1) / 3) + 1; // Chia tháng vào quý
                if (month !== 1 && month !== 4 && month !== 7 && month !== 10) return null;
                return {
                    price: point.y, // DT
                    year: year,
                    month: month,
                    day: day,
                    quarter: quarter
                };
            }).filter(Boolean);;

            const lndatas = points3.map(point => {
                const date = new Date(point.x * 1000); // Chuyển đổi timestamp thành đối tượng Date
                const year = date.getFullYear();
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                const quarter = Math.floor((month - 1) / 3) + 1; // Chia tháng vào quý
                if (month !== 1 && month !== 4 && month !== 7 && month !== 10) return null;
                return {
                    price: point.y1, // LN
                    year: year,
                    month: month,
                    day: day,
                    quarter: quarter
                };
            }).filter(Boolean);;

            let pricedata = pricedatas.slice(-16).map(item => item.price).reverse();
            let pedata = pedatas.slice(-16).map(item => item.price).reverse();
            let epsdata = epsdatas.slice(-16).map(item => item.price).reverse();
            let dtdata = dtdatas.slice(-16).map(item => item.price).reverse();
            let lndata = lndatas.slice(-16).map(item => item.price).reverse();

            let tem = [], tem2=[], tem3=[], tem4=[], tem5=[];
            pricedata.forEach(s => {
                tem.push(s);
                tem.push(0);
            })
            pedata.forEach(s => {
                tem2.push(s);
                tem2.push(0);
            })
            epsdata.forEach(s => {
                tem3.push(s);
                tem3.push(0);
            })
            dtdata.forEach(s => {
                tem4.push(s);
                tem4.push(0);
            })
            lndata.forEach(s => {
                tem5.push(s);
                tem5.push(0);
            })
            data.data.rows.push({
                "key": "isa200",
                "level": 1,
                "get_raw": 1,
                "values": tem,
                "data": true,
                "name": "Giá CP"
            })
            data.data.rows.push({
                "key": "isa201",
                "level": 1,
                "get_raw": 1,
                "values": tem2,
                "data": true,
                "name": "P/E"
            })
            data.data.rows.push({
                "key": "isa202",
                "level": 1,
                "get_raw": 1,
                "values": tem3,
                "data": true,
                "name": "EPS 4QGN"
            })
            data.data.rows.push({
                "key": "isa203",
                "level": 1,
                "get_raw": 1,
                "values": tem4,
                "data": true,
                "name": "DT 4QGN"
            })
            data.data.rows.push({
                "key": "isa204",
                "level": 1,
                "get_raw": 1,
                "values": tem5,
                "data": true,
                "name": "LNST 4QGN"
            })
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