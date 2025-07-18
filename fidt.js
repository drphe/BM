let idarr = [];
var POSTS, NEWS;
var noidung = document.getElementById("noidung");
var pre = document.getElementById("pre")
const mailicon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3334 15.3337V20.667C29.3334 25.3337 26.6667 27.3337 22.6667 27.3337H9.33341C5.33341 27.3337 2.66675 25.3337 2.66675 20.667V11.3337C2.66675 6.66699 5.33341 4.66699 9.33341 4.66699H16.0001" stroke="#3CA116" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.33325 12L13.5066 15.3333C14.8799 16.4267 17.1333 16.4267 18.5066 15.3333" stroke="#3CA116" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M25.9733 3.75992L26.3466 4.51991C26.5333 4.89324 26.9999 5.23992 27.4133 5.31992L27.92 5.39992C29.44 5.65325 29.8 6.77325 28.7066 7.87992L28.2399 8.34657C27.9333 8.66657 27.76 9.27991 27.8533 9.70658L27.92 9.98659C28.3333 11.8266 27.36 12.5332 25.76 11.5732L25.4133 11.3732C24.9999 11.1332 24.3333 11.1332 23.92 11.3732L23.5733 11.5732C21.9599 12.5466 20.9866 11.8266 21.4133 9.98659L21.4799 9.70658C21.5733 9.27991 21.4 8.66657 21.0933 8.34657L20.6266 7.87992C19.5333 6.77325 19.8933 5.65325 21.4133 5.39992L21.92 5.31992C22.32 5.25325 22.7999 4.89324 22.9866 4.51991L23.3599 3.75992C24.0799 2.30659 25.2533 2.30659 25.9733 3.75992Z" stroke="#3CA116" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`

function loading(i = !0) {
    document.getElementById("load").innerHTML = i ? `<div class="loading-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>` : ""
}

document.getElementById("pres").style.display = "none";
get(4);


const button = document.getElementById("button")
let buttons = button.querySelectorAll('.button');
buttons.forEach(b => {
    b.addEventListener('click', async (e) => {
        var type = e.target.id
        if (type && type != "button") {
            pre.innerHTML = "", document.querySelector(".strategy").innerHTML = ``;
            document.getElementById("pres").style.display = "none";
            buttons.forEach(btn => btn.classList.remove('active'));
            b.classList.add('active');
            switch (type) {
                case "get5":
                    await getFIDTnews()
                    break;
                case "get8":
                    await get(8);
                    break;
                case "get7":
                    await get(7);
                    break;
                case "get4":
                    await get(4);
                    break;
                case "get3":
                    await get(3);
                    break;
                case "get2":
                    await get(2);
                    break;
                case "get1":
                    await get(1);
                    break;
                case "get0":
                    await getFIDTpredic();
                    noidung.innerHTML = ""
                    break;
                default:
                    await getFIDTpredic();
                    noidung.innerHTML = ""
            }

        }
    });
});
async function getFIDTnews() {
    loading(!0)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var raw = JSON.stringify({
        "action": "READ",
        "resource": "idp.overview.news"
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        mode: "cors"
    };
    try {
        var res = await fetch("https://guru.fidt.vn/do-action", requestOptions)
        var data = await res.json();
        NEWS = data.news.data;
        noidung.innerHTML = '';
        NEWS.forEach(article => {
            let l = document.createElement("div");
            l.setAttribute("class", "news-style");
            let s = document.createElement("a"),
                n = new Date(article.date_created);
            l.title = article.block ? "Tin độc quyền !" : article.title,
                s.innerHTML = article.title + `<br/> Ngày đăng: ${timeAgo(article.date_created)}`
            s.style = "line-height: 24px;font-size:14px;text-decoration: none; width:100%;color:var(--blue);",
                l.appendChild(s),
                l.innerHTML += '<span style="float:right;margin: 4px; style="width:60px; height: 60px;border-radius:5px;object-fit:cover;">' + mailicon + '</span><br/>';
            noidung.appendChild(l);
            noidung.style.display = "block";
            noidung.style.height = "calc(-50px + 100vh)";

            l.onclick = (e) => {
                e.preventDefault();
                showPopup(article.content, article.title);
            };
        })
    } catch (e) {
        showPopup("Trình duyệt không cho phép tắt kiểm duyệt CORS hoặc bị chặn.", "Thông báo");
    }
    loading(0)
}

async function getFIDTpredic() {
    loading(!0)
    var header = {
        method: "GET",
        mode: "cors"
    }

    await fetch("https://market-trending.fidt.vn/api/market-trend", header).then(response => response.text()).then(result => {
        let g = JSON.parse(result)
        let k = g.data[0]
        var predic = `<div class="prediction-section" title="Ngày đăng : ${timeAgo(k.date_created)}">
    <div class="heading">Dự báo thị trường trong tuần này</div>
    <div class="prediction ${k.prediction}" style="display: flex;align-items: flex-end;justify-content: center;"><span>${k.prediction == "up"? "TĂNG": "GIẢM"}</span><img style="width: 100px;" alt="" src="./${k.prediction == "up"? "bull": "bear"}.svg" width="114" height="120" decoding="async" data-nimg="1" loading="lazy" style="color: transparent;"></div>
</div>
<div class="information">
    <div class="items">
        <div class="info-item">
            <div class="inter label">Tỉ lệ rủi ro </div>
            <div class="${k.prediction}">${k.risk}</div>
        </div>
        <div class="info-item">
            <div class="inter label">Vĩ mô </div>
            <div class="${k.aggregate}">${getStatus(k.aggregate)}</div>
        </div>
        <div class="info-item">
            <div class="inter label">Động lượng thị trường </div>
            <div class="${k.momentum}">${getStatus(k.momentum)}</div>
        </div>
        <div class="info-item">
            <div class="inter label">Phân tích kỹ thuật </div>
            <div class="${k.technical}">${getStatus(k.technical)}</div>
        </div>
    </div>
</div></div>`;
        document.querySelector(".strategy").innerHTML = `<div class="" style="color:#000;font-weight:400;">${k.point_of_view||''}</div><div class="heading tooltip">Chiến lược giao dịch </div><div class="inter">${k.strategy||''}</div>`;
        let m = document.createElement("div");
        m.setAttribute("class", "main-content");
        m.innerHTML = predic
        pre.appendChild(m);
        noidung.style.display = "none";
        noidung.style.height = "0";
        document.getElementById("pres").style.display = "block";
        document.getElementById("pres").style.height = "calc(-50px + 100vh)";

    }).catch(error => showPopup("Trình duyệt không cho phép tắt kiểm duyệt CORS hoặc bị chặn.", "Thông báo"));

    loading(0)
}

async function get(id) {
    loading(!0)
    try {
        const response = await fetch("https://tintuc.fidt.vn/embed/dark?categoryId=" + id + "&page=0&size=20", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "vi,en;q=0.9,en-US;q=0.8",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "iframe",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrer": "https://tintuc.fidt.vn/embed/dark?categoryId=3&page=1&size=10",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        })
        let data = await response.text();
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, "text/html");
        var scriptContent = doc.querySelectorAll("body script");
        var result = JSON.parse(scriptContent[1].innerText)
        POSTS = result.pageProps.topPosts
        let temp = result.pageProps.posts.data
        //console.log(temp)
        for (var i = 0; i < temp.length; i++) POSTS.push(temp[i])
        await createlist(POSTS, id)
    } catch (e) {
        showPopup("Trình duyệt không cho phép tắt kiểm duyệt CORS hoặc bị chặn.", "Thông báo");
    }
    loading(0)
}

function createlist(arrs, id) {
    noidung.innerHTML = ""
    arrs.forEach(arr => {

        let l = document.createElement("div");
        l.setAttribute("class", "news-style");
        let s = document.createElement("a"),
            n = new Date(arr.postedAt);
        l.title = arr.title,
            s.innerHTML = arr.title + `<br/>Ngày đăng: ${n.getDate()}/${n.getMonth()+1}/${n.getFullYear()}`
        s.style = "line-height: 24px;font-size:14px;text-decoration: none; width:100%;color:var(--blue);",
            l.appendChild(s),
            l.innerHTML += '<span style="float:right;margin: 4px; "><img src="' + arr.image + '" style="width:60px; height: 60px;border-radius:5px;object-fit:cover;"/></span><br/>';
        noidung.appendChild(l);
        noidung.style.display = "block";
        noidung.style.height = "calc(-50px + 100vh)";
        l.onclick = (e) => {
            e.preventDefault();
            console.log(arr)
            showPopup(arr.contentHtml, arr.title);
        };
    });
}

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date + 7 * 60 * 60 * 1000;
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    if (days > 1) {
        return `${Math.round(days)} ngày trước`;
    } else if (hours > 1) {
        return `${Math.round(hours)} giờ trước`;
    } else {
        return `${Math.round(minutes)} phút trước`;
    }
}

function getStatus(s) {
    switch (s) {
        case "very_good":
            return "Tích cực";
        case "good":
            return "Khả quan";
        case "neutral":
            return "Trung tính";
        default:
            return "Kém khả quan";
    }
}

// Hàm hiển thị popup với nội dung bài viết
function showPopup(content, title) {
    // khi popup hiển thị
    window.parent.postMessage({
        popup: true,
        title: title || "",
        content: content,
    }, "*");
}