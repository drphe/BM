       // Lưu danh sách cổ phiếu vào localStorage
        function saveStockList(stockList) {
            localStorage.setItem('stockList', JSON.stringify(stockList));
        }

        // Lấy danh sách cổ phiếu từ localStorage
        function getStockList() {
            const stockList = localStorage.getItem('stockList');
            return stockList ? JSON.parse(stockList) : [];
        }

        // Thêm mã cổ phiếu vào danh sách
        function addStockToList(stockCode) {
            const stockList = getStockList();
            if (!stockList.includes(stockCode)) {
                stockList.push(stockCode);
                saveStockList(stockList);
                console.log(`Đã thêm mã cổ phiếu: ${stockCode}`);
            } else {
                console.log(`Mã cổ phiếu ${stockCode} đã có trong danh sách.`);
            }
            fetchAndUpdateStockPrices();
        }

        // Xóa mã cổ phiếu khỏi danh sách
        function removeStockFromList(stockCode) {
            const stockList = getStockList();
            const updatedList = stockList.filter(code => code !== stockCode);
            saveStockList(updatedList);
            console.log(`Đã xóa mã cổ phiếu: ${stockCode}`);
            fetchAndUpdateStockPrices();
        }

        // Lấy giá cổ phiếu từ API
        async function fetchStockPrices(stockList) {
            const STOCK_API_URL = 'https://mastrade.masvn.com/api/v1/market/symbolLatest';
            try {
                const response = await fetch(`${STOCK_API_URL}?symbolList=${stockList.join(',')}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu giá cổ phiếu:', error);
                return [];
            }
        }
        // Cập nhật giá cổ phiếu và hiển thị
        async function fetchAndUpdateStockPrices() {
            const stockList = getStockList();
            if (stockList.length === 0) {
                displayStockTicker([]);
                return;
            }

            const prices = await fetchStockPrices(stockList);
            const stockData = stockList.map(stockCode => {
                const stockInfo = prices.find(item => item.s === stockCode) || {};
                const price = stockInfo.c || 'N/A';
                const change = changeFormatValue(stockInfo.r) || '0.0';
                const changeColor = change > 0 ? '#27AE60' : change < 0 ? '#E74C3C' : '#BDC3C7';
                return `<div class="item">${stockCode}: <span style="color: white;">${price}</span> <span style="color: ${changeColor};">(${change}%)</span></div>`;
            });

            displayStockTicker(stockData);
        }

        function changeFormatValue(value) {
            var DEFAULT_LOCALE = 'en-GB';
            var FORMAT_NUMBER = new Intl.NumberFormat(DEFAULT_LOCALE, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            if (!isNaN(value) && (value !== '')) {
                return FORMAT_NUMBER.format(parseFloat(value) * 100);
            } else {
                return '';
            }
        }
        // Hiển thị danh sách dưới dạng dòng chạy
        function displayStockTicker(stockData) {
            let stockTicker = document.getElementById('stockTicker');
            if (!stockTicker) {
                // Tạo thanh hiển thị nếu chưa tồn tại
                stockTicker = document.createElement('div');
                stockTicker.id = 'stockTicker';
                stockTicker.style.position = 'fixed';
                stockTicker.style.bottom = '0';
                stockTicker.style.left = '0';
                stockTicker.style.width = '100%';
                stockTicker.style.background = '#2C3E50'; // Màu nền xanh nhạt
                stockTicker.style.color = '#FFFFFF'; // Màu chữ trắng
                stockTicker.style.fontSize = '16px';
                stockTicker.style.overflow = 'hidden';
                stockTicker.style.whiteSpace = 'nowrap';
                // stockTicker.style.padding = '10px 0';
                stockTicker.style.display = 'flex';
                stockTicker.style.alignItems = 'center';
                stockTicker.style.justifyContent = 'space-between'
                document.body.appendChild(stockTicker);
            }

            // Cập nhật danh sách cổ phiếu
            stockTicker.innerHTML = `
<div id="stockTickers" style="height: 20px; overflow: hidden;">
    <div id="stockList">${stockData.join('  ') || "Không có cổ phiếu nào trong danh sách."}</div>
</div><input id="stockInput" type="text" placeholder="Nhập mã cổ phiếu" style="margin-left: 6px; width: 150px;padding: 6px; font-size: 14px;"/>
    `;

            // Gắn sự kiện xử lý cho ô input
            const stockInput = document.getElementById('stockInput');
            stockInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    const stockCode = stockInput.value.trim().toUpperCase();
                    if (stockCode) {
                        const stockList = getStockList();
                        if (stockList.includes(stockCode)) {
                            removeStockFromList(stockCode); // Nếu đã tồn tại, xóa
                        } else {
                            addStockToList(stockCode); // Nếu chưa tồn tại, thêm
                        }
                        stockInput.value = ''; // Xóa nội dung input sau khi xử lý
                    }
                    scrollStocks();
                }
            });

            // Tạo hàm cuộn
            var interval;
            scrollStocks();
            window.addEventListener('resize', scrollStocks);
            var currentIndex = 0;

            function scrollStocks() {
                clearInterval(interval);
                var stockList = document.getElementById('stockList');
                var stockTickers = document.getElementById('stockTickers');
                var stockItems = stockList.children;

                var width = stockTickers.offsetWidth;
                var items = stockList.getElementsByClassName('item')[0];
                var itemWidth = items.offsetWidth;;
                var totalItems = Math.round(stockItems.length * itemWidth / width);
                currentIndex++;
                if (currentIndex >= totalItems) {
                    // Cuộn thêm một dòng giả
                    stockList.style.transform = 'translateY(-' + (currentIndex * 20) + 'px)';
                    setTimeout(function() {
                        // Đặt lại vị trí cuộn về đầu danh sách
                        stockList.style.transition = 'none';
                        stockList.style.transform = 'translateY(0)';
                        currentIndex = 0;
                        setTimeout(function() {
                            stockList.style.transition = 'transform 1s ease-in-out';
                        }, 50);
                    }, 2000); // Thời gian hiệu ứng cuộn
                } else {
                    stockList.style.transform = 'translateY(-' + (currentIndex * 20) + 'px)';
                }
                interval = setInterval(scrollStocks, 4000);
            }

        }

        // Tự động hiển thị ticker và cập nhật giá mỗi 60 giây
        document.addEventListener('DOMContentLoaded', () => {
            if (/Mobi|Android/i.test(navigator.userAgent) == false) {
                //fetchAndUpdateStockPrices();
                // setInterval(fetchAndUpdateStockPrices, 60000); // Cập nhật giá mỗi 60 giây
            }

        });
