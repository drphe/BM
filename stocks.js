function saveStockList(stockList) { // Lưu danh sách cổ phiếu vào localStorage
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
}

// Xóa mã cổ phiếu khỏi danh sách
function removeStockFromList(stockCode) {
    const stockList = getStockList();
    const updatedList = stockList.filter(code => code !== stockCode);
    saveStockList(updatedList);
    console.log(`Đã xóa mã cổ phiếu: ${stockCode}`);
}

// Hiển thị danh sách dưới dạng dòng chạy
function displayStockTicker() {
    // Tạo div để hiển thị dòng chạy
    const stockTicker = document.createElement('div');
    stockTicker.id = 'stockTicker';
    stockTicker.style.position = 'fixed';
    stockTicker.style.bottom = '0';
    stockTicker.style.left = '0';
    stockTicker.style.width = '100%';
    stockTicker.style.background = 'black';
    stockTicker.style.color = 'white';
    stockTicker.style.fontSize = '16px';
    stockTicker.style.overflow = 'hidden';
    stockTicker.style.whiteSpace = 'nowrap';
    stockTicker.style.padding = '10px 0';
    document.body.appendChild(stockTicker);

    // Lấy danh sách cổ phiếu và hiển thị
    const stockList = getStockList();
    if (stockList.length > 0) {
        stockTicker.innerHTML = `<marquee behavior="scroll" direction="left">${stockList.join(' • ')}</marquee>`;
    } else {
        stockTicker.textContent = "Không có cổ phiếu nào trong danh sách.";
    }
}

// Tự động hiển thị ticker khi file được nhúng
document.addEventListener('DOMContentLoaded', () => {
    displayStockTicker();
});