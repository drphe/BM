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

// kiểm tra phiên nước rút
    function checkLatestGrowth(data) {
      const DAY = 86400;
      const latest = data[data.length - 1];
      const results = {
        week15: "📈 Giá tăng ít nhất 15% trong 1 tuần",
        twoWeek20: "🚀 Giá tăng hơn 20% trong 2 tuần",
        month30_50: "🌟 Giá tăng trong khoảng 30–50% trong 1 tháng"
      };
      let messages = {
        week15: results.week15 + " ❌",
        twoWeek20: results.twoWeek20 + " ❌",
        month30_50: results.month30_50 + " ❌"
      };

      let passed = false;

      for (let i = data.length - 2; i >= 0; i--) {
        const deltaDays = (latest.time - data[i].time) / DAY;
        const percent = ((latest.value - data[i].value) / data[i].value) * 100;

        if (deltaDays <= 7 && percent >= 15) {
          messages.week15 = `${results.week15} : +${percent.toFixed(2)}%`;
          passed = true;
        }
        if (deltaDays <= 14 && percent > 20) {
          messages.twoWeek20 = `${results.twoWeek20} : +${percent.toFixed(2)}%`;
          passed = true;
        }
        if (deltaDays <= 30 && percent >= 30 ) {
          messages.month30_50 = `${results.month30_50} : +${percent.toFixed(2)}%`;
          passed = true;
        }
      }

      return passed ? Object.values(messages) : [];
    }


function showDiscount(symbol, data) {
     const resultMe = checkLatestGrowth(data);
    var iframeHtml = `<div style="width: 400px;justify-content: center;margin: auto;">`;
	if (resultMe.length > 0) {
        	iframeHtml += `<h3>📊 Chú ý phiên chạy nước rút</h3><ul style="text-align:left;">` + resultMe.map(msg => `<li>${msg}</li>`).join('') + `</ul>`;
    	}

    iframeHtml += `<h3>📊 Các đợt điều chỉnh và mức chiết khấu</h3></div><iframe style="border: none;margin: auto;width: 500px;height: 400px;" src="discount.html?code=${symbol}" id="popupiframe" title="Tính mức chiết khấu"></iframe>`;

    showPopup(iframeHtml, "Phân tích biểu đồ kỹ thuật");


}
var andiko = localStorage.getItem("andiko");

function createlist(arrs) {
    let contentId = document.getElementById("content");
    contentId.innerHTML = `<div class="nowrap" title="" style="font-weight:600; transition: right 0.3s ease;position: sticky;top: 0px;font-size: 16px;left:5px;"><span style="margin: 4px; ">Tin tức liên quan</span><span style="float:right;cursor:pointer; " class="closenews">[x]</span><span style="float:right;cursor:pointer; " class="zoomnews">[+]</span></div>`;
    let ll = document.createElement("div");
    ll.setAttribute("class", "main_news");
    arrs.forEach(arr => {
        let l = document.createElement("div");
        l.setAttribute("class", "news-style");
        let s = document.createElement("a"),
            n = new Date(arr.postedAt);
        l.title = arr.title,
            s.innerHTML = arr.title + `<br/>${howmuchtime(arr.created)} - ${arr.source}`;
        s.style = "margin-left:4px;margin-right:4px;line-height: 24px;font-size:14px;text-decoration: none; width:100%;color:var(--blue);",
            l.innerHTML += '<span style="margin: 4px; "><img src="' + arr.featureImg + '" style="object-fit:cover;width:50px; height: 50px;border-radius:5px;"/></span>';
        l.appendChild(s),
            l.innerHTML += '<br/>';
        ll.appendChild(l);
        contentId.style.display = "block";
        l.onclick = (e) => {
            e.preventDefault();
            showPopup(arr.content, arr.title);
        };
    });
    andiko && contentId.classList.add("andi");
    document.querySelector(".closenews").textContent = andiko ? '[>]' : '[x]';
    contentId.appendChild(ll);
    const mainNewsDiv = document.querySelector('.main_news');

    document.querySelector(".closenews").addEventListener('click', function(event) {
        if (!contentId.classList.contains('andi')) {
            contentId.classList.add("andi");
            andiko = true;
            localStorage.setItem("andiko", andiko);
            event.target.title = "Hiện bảng tin";
            event.target.textContent = "[>]";
            mainNewsDiv.classList.remove('grid');
            contentId.classList.remove("phongto");
            document.querySelector(".zoomnews").textContent = "[+]";
        } else {
            andiko = false;
            localStorage.setItem("andiko", andiko);
            contentId.classList.remove("andi");
            event.target.title = "Ẩn bảng tin";
            event.target.textContent = "[x]";
        }
    });
    document.querySelector(".zoomnews").addEventListener('click', function(event) {
        if (!contentId.classList.contains('phongto')) {
            contentId.classList.add("phongto");
            event.target.title = "Thu nhỏ";
            mainNewsDiv.classList.add('grid');
            event.target.textContent = "[-]";
        } else {
            contentId.classList.remove("phongto");
            event.target.title = "Phóng to";
            mainNewsDiv.classList.remove('grid');
            event.target.textContent = "[+]"
        }
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
function showPopup(content, title) {
    // khi popup hiển thị
    window.parent.postMessage({
        popup: true,
        title: title,
        content: content ?? "Không có tóm tắt.",
    }, "*");
}

async function AddNews(code = []) {
    await getNews(code);
    if (!/Mobi|Android/i.test(navigator.userAgent)) addStylesToNews();
}

function addStylesToNews() {
    var newsElements = document.getElementsByClassName('news');
    for (var i = 0; i < newsElements.length; i++) {
        //newsElements[i].style.display = 'block';
        newsElements[i].style.position = 'absolute';
        newsElements[i].style.width = '500px';
        newsElements[i].style.height = '250px';
        newsElements[i].style.overflow = 'auto';
        newsElements[i].style.zIndex = '100';
        newsElements[i].style.bottom = '32px';
        newsElements[i].style.left = '5px';
        newsElements[i].style.background = 'white';
    }
}

function removeStylesFromNews() {
    var newsElements = document.getElementsByClassName('news');
    for (var i = 0; i < newsElements.length; i++) {
        //newsElements[i].style.display = '';
        newsElements[i].style.position = '';
        newsElements[i].style.width = '';
        newsElements[i].style.height = '';
        newsElements[i].style.overflow = '';
        newsElements[i].style.zIndex = '';
        newsElements[i].style.bottom = '';
        newsElements[i].style.background = '';
    }
}