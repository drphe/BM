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
    const container = document.getElementById("container");
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
        link.style = "line-height: 24px; font-size: 14px; text-decoration: none; color: var(--blue);";
        link.innerHTML = `${article.title} <br> Ngày đăng: ${new Date(article.created).toLocaleDateString()}`;
        link.href = "#";
        id++;
        listItem.onclick = (e) => {
            e.preventDefault();
            showPopup(cleanHTML(article.content), article.title);
        };

        listItem.appendChild(link);
        container.appendChild(listItem);
    });
}

function cleanHTML(html) {
    // Tạo thẻ div tạm để chứa nội dung
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Xóa các thẻ <p> trống hoặc chỉ chứa thẻ <br>
    tempDiv.querySelectorAll("p").forEach(p => {
        if (!p.textContent.trim() || p.innerHTML.trim().match(/^(<br\s*\/?>|\s|<[^>]+>)*$/)) {
            p.remove();
        }
    });

    // Xóa các đoạn <br/><br/> và <br/><br/><br/>
    tempDiv.innerHTML = tempDiv.innerHTML.replace(/<br\s*\/?><br\s*\/?>/g, "")
        .replace(/<br\s*\/?><br\s*\/?><br\s*\/?>/g, "");
    // Lấy tất cả <p> có style cụ thể
    let paragraphs = tempDiv.querySelectorAll('p[style="font-size: 14px;text-align: justify;"]');

    // Xóa 2 phần tử cuối cùng
    if (paragraphs.length >= 2) {
        paragraphs[paragraphs.length - 1].remove();
        paragraphs[paragraphs.length - 2].remove();
    }
    // Trả về HTML đã làm sạch
    return tempDiv.innerHTML;
}
document.body.addEventListener("click", function(e) {
    document.getElementById("load").contains(e.target) && loading(0);

});

// Hàm hiển thị popup với nội dung bài viết
function showPopup(content, title) {
    // khi popup hiển thị
    window.parent.postMessage({
        popup: true,
        title: title || "",
        content: content,
    }, "*");
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