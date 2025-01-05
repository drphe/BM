// Lấy tin tức báo chí liên quan cổ phiếu
async function getNews(list = []) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rw = {
        "limit": 25,
        "page": 1,
        "sort": "-created",
        "condition": {
            "isHidden": false,
            "sourceCategory": "cms",
        }
    }
    if (list.length) {
        rw.condition.tags = {
            "$in": list
        }
    }
    var raw = JSON.stringify(rw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        "mode": "cors",
        "credentials": "omit"
    };
    try {
        const res = await fetch("https://articles.finbox.vn/api/articleCrawl/list", requestOptions);
        const newsdata = await res.json();
        if (newsdata) createlist(newsdata);
    } catch (e) {}
}

function createlist(arrs) {
    let contentId = document.getElementById("content");
    contentId.innerHTML = "";
    arrs.forEach(arr => {
        let l = document.createElement("div");
        l.setAttribute("class", "news-style");
        let s = document.createElement("a"),
            n = new Date(arr.postedAt);
        l.title = arr.title,
            s.innerHTML = arr.title + `<br/>${howmuchtime(arr.created)} - ${arr.source}`;
        s.style = "line-height: 24px;font-size:14px;text-decoration: none; width:100%;color:var(--blue);",
            l.appendChild(s),
            l.innerHTML += '<span style="float:right;margin: 4px; "><img src="' + arr.featureImg + '" style="width:50px; height: 50px;"/></span><br/>';
        contentId.appendChild(l);
        contentId.style.display = "block";
        l.onclick = (e) => {
            e.preventDefault();
            showPopup(arr.content);
        };
    });
}
// trả về thời gian cách bao lâu
function howmuchtime(e) {
    const t = new Date - new Date(e),
        n = Math.round(t % 864e5 % 36e5 / 6e4),
        o = Math.floor(t % 864e5 / 36e5),
        r = Math.floor(t / 864e5);
    return r > 0 ? `${r} ngày trước` : o > 0 ? `${o} giờ trước` : `${n} phút trước`
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
        popupContent.scrollTo({ top: 0, behavior: "smooth" });
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
    popup.onclick = (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    };
    popup.appendChild(popupContent);
    popupContent.appendChild(closeButton);
    document.body.appendChild(popup);

    // Áp dụng CSS cho popup
    const style = document.createElement("style");
    style.textContent = `
	.popup img {width: -webkit-fill-available!important;height:auto!important;}
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
	    width: -webkit-fill-available;
	    overflow-y:scroll;
	    line-height: 24px;
        }
	.popup-content span {color:black!important;}
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
document.addEventListener("keyup", function(e) {
    if (27 === e.keyCode) {
        let popup = document.querySelector(".popup");
        popup.style.display = "none";
    }
})

document.body.addEventListener("click", function(e) {
    const closeButton = document.querySelector(".popup-close");
    try {
        let popup = document.querySelector(".popup");
        closeButton.contains(e.target) && (popup.style.display = "none");
    } catch (e) {}

});
async function AddNews(isopen, code = []) {
    if (isopen) {
        await getNews(code);
        document.querySelector('.news').style.display = "block";
        if (!/Mobi|Android/i.test(navigator.userAgent)) addStylesToNews();
    } else {
        document.querySelector('.news').style.display = "none";
    }
}

function addStylesToNews() {
    var newsElements = document.getElementsByClassName('news');
    for (var i = 0; i < newsElements.length; i++) {
        newsElements[i].style.display = 'block';
        newsElements[i].style.position = 'absolute';
        newsElements[i].style.width = '400px';
        newsElements[i].style.height = '250px';
        newsElements[i].style.overflow = 'auto';
        newsElements[i].style.zIndex = '100';
        newsElements[i].style.bottom = '25px';
        newsElements[i].style.left = '5px';
        newsElements[i].style.background = 'white';
    }
}

function removeStylesFromNews() {
    var newsElements = document.getElementsByClassName('news');
    for (var i = 0; i < newsElements.length; i++) {
        newsElements[i].style.display = '';
        newsElements[i].style.position = '';
        newsElements[i].style.width = '';
        newsElements[i].style.height = '';
        newsElements[i].style.overflow = '';
        newsElements[i].style.zIndex = '';
        newsElements[i].style.bottom = '';
        newsElements[i].style.background = '';
    }
}