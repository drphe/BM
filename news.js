function loading(i = !0) {
    document.getElementById("load").innerHTML = i ? `<div class="loading-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>` : ""
}
// Hàm xử lý dữ liệu nhận được
function processArticlesData(data) {
    if (data && Array.isArray(data.articles)) {
        return data.articles.map(article => ({
            id: article._id,
            title: article.title,
            category: article.category,
            createdAt: article.createdAt,
            content: article.content // Thêm nội dung bài viết
        }));
    }
    return [];
}

// Hàm tạo danh sách bản tin và sự kiện click để mở popup
function createArticlesList(articles) {
    const container = document.getElementById("noidung");
    container.style.removeProperty('grid');
    if (!container) {
        console.error("Container element not found!");
        return;
    }
    container.innerHTML = ""; // Xóa nội dung cũ
    var id = 0;
    articles.forEach(article => {
        const listItem = document.createElement("div");
        listItem.className = "news-style";
        listItem.title = article.title;

        const link = document.createElement("a");
        link.id = `article-${id}`;
        link.style = "line-height: 24px; width: 400px; font-size: 14px; text-decoration: none; color: var(--blue);";
        link.innerHTML = `${article.title} <br> Ngày đăng: ${new Date(article.created).toLocaleDateString()}`;
        link.href = "#";
        id++;
        listItem.onclick = (e) => {
            e.preventDefault();
            showPopup(article.content);
        };

        listItem.appendChild(link);
        container.appendChild(listItem);
    });
}

// Hàm hiển thị popup với nội dung bài viết
function showPopup(content) {
    let popup = document.querySelector(".popup");
    const closeButton = document.createElement("button");
    closeButton.className = "popup-close";
    closeButton.textContent = "Close";

    // Nếu popup đã tồn tại, cập nhật nội dung
    if (popup) {
        const popupContent = popup.querySelector(".popup-content");
        popupContent.innerHTML = `<p>${content}</p>`;
        popupContent.appendChild(closeButton);
        popup.style.display = "flex";
        return;
    }

    // Tạo popup mới nếu chưa có
    popup = document.createElement("div");
    popup.className = "popup";

    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    popupContent.innerHTML = `<p>${content}</p>`;

    closeButton.onclick = () => {
        popup.style.display = "none";
    };

    popup.appendChild(popupContent);
    popupContent.appendChild(closeButton);
    document.body.appendChild(popup);

    // Áp dụng CSS cho popup
    const style = document.createElement("style");
    style.textContent = `
	img {width: -webkit-fill-available;}
        .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .popup-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            text-align: left;
	    height:500px;
	    overflow:scroll;
        }

        .popup-close {
            margin-top: 10px;
            padding: 5px 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;    float: inline-end;
        }
        .popup-close:hover {
            background: #0056b3;
        }
    `;
    document.head.appendChild(style);
}


// Hàm fetch dữ liệu từ API
async function fetchArticles() {
    const url = "https://articles.finbox.vn/api/articlesFinbox?condition=%7B%22category%22:%7B%22$in%22:%5B%2259e9e8ec3fcb926c5b2d2f9f%22,%2259e9e8fc3fcb926c5b2d2fa0%22,%2259e9e8e23fcb926c5b2d2f9e%22%5D%7D%7D&limit=40&page=1&sort=-created";

    try {
        loading(1);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        createArticlesList(data);
        loading(0);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}
fetchArticles();