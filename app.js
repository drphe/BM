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
    let data, pricedata;
    //view =2: kết quả kinh doanh
    // view = 1: cân đối tài chính
    // view = 3 lưu chuyển tiền tệ

    async function getFinancialReport(symbol, view = 2, period = 2, page = 1) {
        const url = `https://api-finance-t19.24hmoney.vn/v1/ios/company/financial-report?symbol=${symbol}&period=${period}&view=${view}&page=${page}&expanded=true`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            data = await response.json(); // Chuyển đổi dữ liệu thành JSON

        } catch (error) {
            console.error('Error fetching financial report:', error);
        }
    }
    async function getPriceChart(symbol) {
        const url = `https://api-finance-t19.24hmoney.vn/v2/ios/stock/graph?&symbol=${symbol}&type=6`;
        try {
            const response = await fetch(url);

            // Kiểm tra nếu phản hồi không hợp lệ
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const datas = await response.json(); // Chuyển đổi dữ liệu thành JSON

            // Kiểm tra nếu dữ liệu trả về không có giá trị 'points'
            if (!datas || !datas.data || !datas.data.points || datas.data.points.length === 0) {
                throw new Error('No price data available');
            }

            // Lấy dữ liệu điểm (price data)
            const points = datas.data.points;

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

            }).filter(Boolean);;
            //	pricedatas.pop();
            pricedata = pricedatas.slice(-8).map(item => item.price).reverse();
            console.log('Processed chart data:', data);
            let tem = [];
            pricedata.forEach(s => {
                tem.push(s);
                tem.push(0);
            })
            data.data.rows.push({
                "key": "isa200",
                "level": 1,
                "get_raw": 1,
                "values": tem,
                "data": true,
                "name": "Giá CP"
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

        Highcharts.chart('container', {
            chart: {
                type: 'column' // Mặc định kiểu biểu đồ cột
            },
            title: {
                text: stockSymbol
            },
            xAxis: {
                reversed: true, // Đảo ngược trục X
                categories: data.data.headers.filter(header => header.type === 'normal').map(header => `Q${header.quarter}/${header.year}`)
            },
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
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = row.key;
	    ["LỢI NHUẬN SAU THUẾ TNDN","Lợi nhuận sau thuế thu nhập doanh nghiệp","Lợi nhuận cổ đông công ty mẹ","Lợi nhuận của Cổ đông của Công ty mẹ","Lợi nhuận sau thuế", "Giá CP"].forEach(nam => {
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
                option.value = type === 'Cột' ? 'column' : (type === 'Miền' ? 'area' : 'spline');
                option.textContent = type;
                chartTypeSelect.appendChild(option);
            });
            if (row.name == "Giá CP") {
                chartTypeSelect.value = 'spline';
            }

            div.appendChild(chartTypeSelect);

            const yAxisTypeSelect = document.createElement('select');
            yAxisTypeSelect.className = 'y-axis-type';
            yAxisTypeSelect.setAttribute('data-key', row.key);
            ['Trục trái', 'Trục phải'].forEach(type => {
                const option = document.createElement('option');
                option.value = type === 'Trục trái' ? 'left' : 'right';
                option.textContent = type;
                yAxisTypeSelect.appendChild(option);
            });
            if (row.name == "Giá CP") {
                yAxisTypeSelect.value = 'right';
            }
            div.appendChild(yAxisTypeSelect);

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