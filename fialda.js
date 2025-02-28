function checkDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    const isTablet = /ipad|android|tablet/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    if (isMobile || window.innerWidth <= 768) {
        document.querySelector('.containers').style.display = 'block';
    } else {
        document.querySelector('.containers').style.display = 'grid';
    }
}
window.addEventListener('resize', checkDevice);
window.addEventListener('load', checkDevice);

const emptyData = '<div style="margin:auto;text-align: center;padding:50px;"> <svg width="90"  height="60" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg></div>'
var POST, BCPT, container = document.getElementById("noidung");
getBCPTCP();
async function getBCPTCP(s = '') {
    loading(!0)
    try {
        var d = new Date()
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        // Tạo đối tượng Date cho 3 tháng trước
        var previousDate = new Date(year, month - 3, day);
        var year2 = previousDate.getFullYear();
        var month2 = previousDate.getMonth() + 1; // Thêm 1 vì getMonth() trả về giá trị từ 0-11
        var day2 = previousDate.getDate();
        url = `https://fwtapi3.fialda.com/api/services/app/AnalysisReport/GetByFilter?fromDate=${year2}-${month2}-${day2}&toDate=${year}-${month}-${day}&symbols=${s.trim().toUpperCase()}`
        var res = await fetch(url);
        var data = await res.json();
        POST = data.result;
        await taoTable(POST);
    } catch (e) {
        showPopup("Trình duyệt không cho phép tắt kiểm duyệt CORS hoặc bị chặn.", "Thông báo");
    }
    loading(0)
}
async function taoTable(P) {
    container.innerHTML = '';
    var table = document.createElement('table');
    container.style.grid = "none";
    table.id = "BCPTCP"
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var headRow = document.createElement('tr');
    ["Mã", "Tiêu đề", "Nguồn", "Ngày công bố", "Tài liệu"].forEach(function(el) {
        var th = document.createElement('th');
        th.rowspan = 2
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    function cTd(d, t) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(d));
        t.appendChild(td);
    }
    var listCP = Object.values(P).flat();
    listCP.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
    listCP.forEach(reports => {
        var n = new Date(reports.reportDate);
        var tr = document.createElement('tr');
        cTd(reports.symbol, tr)
        cTd(reports.title, tr)
        cTd(reports.reporter, tr)
        cTd(`${n.getDate()}/${n.getMonth()+1}/${n.getFullYear()}`, tr)
        var tdlink = document.createElement('td');
        tdlink.setAttribute("style", "text-align:center;");
        tdlink.innerHTML = `<a href="https://cdn.fialda.com/Attachment/AnalysisReport/${reports.symbol}_-_${reports.attachment}"  target="_blank"><svg style="    fill: green;" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PictureAsPdfIcon"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"></path></svg></a>`, tr.appendChild(tdlink);
        tbody.appendChild(tr);
    })
    table.appendChild(tbody);
    container.appendChild(table);
}
async function getBCPTTT() {
    loading(!0)
    try {
        var url = 'https://fwtapi3.fialda.com/api/services/app/AnalysisReport/GetMarketAnalysisReport?pageNumber=1&pageSize=30'
        var res = await fetch(url);
        var data = await res.json();
        POST = data.result.items
        createBang(POST)
    } catch (e) {
        showPopup("Trình duyệt không cho phép tắt kiểm duyệt CORS hoặc bị chặn.", "Thông báo");
    }
    loading(0)
}

function createBang(P) {
    if (P.length) {
        container.innerHTML = ''
        container.style.removeProperty('grid');
        for (var i = 0; i < P.length; i++) {
            let l = document.createElement("div");
            l.setAttribute("class", "news-style");
            let s = document.createElement("a"),
                n = new Date(P[i].reportDate);
            s.id = 'fialda-' + P[i].id,
                l.title = P[i].title,
                s.innerHTML = P[i].title + ` (${P[i].reporter})<br/> Ngày đăng: ${n.getDate()}/${n.getMonth()+1}/${n.getFullYear()}`
            s.style = "line-height: 24px;font-size:14px;text-decoration: none; color:var(--blue);",
                l.appendChild(s),
                container.appendChild(l)
            l.onclick = (e) => {
                e.preventDefault();
                let id = e.target.id.match(/\d+/g);
                getnews(id);
            };



        }
    }
}

function convertDateToYYYYMMDD(date, sep = '') {
    var d = new Date(date);
    var string = [];
    string[0] = d.getFullYear();
    string[1] = d.getMonth() + 1;
    string[2] = d.getDate();
    if (string[1] < 10) {
        string[1] = "0" + string[1];
    }
    if (string[2] < 10) {
        string[2] = "0" + string[2];
    }
    return string.join(sep);
}
async function getnews(id) {
    var url = 'https://fwtapi3.fialda.com/api/services/app/AnalysisReport/GetMarketAnalysisReportDetail?id=' + id
    if (id) {
        try {
            var res = await fetch(url);
            var resd = await res.json();
            var data = resd.result;
            var d = new Date(data.reportDate)
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var html = `<div class="ant-modal-confirm-body-wrapper"><div class="ant-modal-confirm-body"><div class="ant-modal-confirm-content"><div class=""><div id="popup-ff841b85-1d1f-d49d-1ed0-90bf3abae314" style="margin-top: 0px;"><div class=""><div><div class="border-bottom"><span class="bg-color-main" style="height: 2px; width: 50px; position: relative; top: 1px; display: block;"></span></div><table class="table" style="font-size: 12px;"><colgroup><col style="width: 150px;"><col></colgroup><tbody><tr><th class="border-bottom content-not-padding color">Nguồn báo cáo</th><td class="border-bottom color">${data.reporter}</td></tr><tr><th class="border-bottom content-not-padding color">Ngày báo cáo</th><td class="border-bottom color">${day}-${month}-${year}</td></tr><tr><th class="border-bottom content-not-padding color">File</th><td class="border-bottom "><a href="https://cdn.fialda.com/Attachment/AnalysisReport/${convertDateToYYYYMMDD(data.reportDate)}_-_${data.attachment}" class="" target="_blank"><button type="submit" class="btn btn-ico btn-primary" style="height: 25px; width: 200px;"><span>Xem nội dung chi tiết</span><span><i class="ico ico-cloud-download"></i></span></button></a></td></tr></tbody></table><div class="mt-px color2">${data.content||''}</div></div></div></div></div></div></div></div>`
            var temp = {
                "contentHtml": html,
                "title": data.title
            }
            showPopup(temp.contentHtml, temp.title)
        } catch (e) {
            showPopup("Trình duyệt không cho phép tắt kiểm duyệt CORS hoặc bị chặn.", "Thông báo");
        }
    }
}


const button = document.getElementById("button")
let buttons = button.querySelectorAll('.button');
buttons.forEach(b => {
    b.addEventListener('click', (e) => {
        var type = e.target.id
        if (type && type != "button") {
            switch (type) {
                case "getBCPTTT":
                    getBCPTTT()
                    break;
                case "getBCPTCP":
                    getBCPTCP();
                    break;
                case "finbox":
                    //fetchArticles();
                    break;
                default:
            }
            buttons.forEach(btn => btn.classList.remove('active'));
            b.classList.add('active');
        }
    });
});


document.addEventListener("keyup", function(e) {
    if (27 === e.keyCode) {
        let popup = document.querySelector(".popup");
        popup.style.display = "none";

    }
})

document.body.addEventListener("click", function(e) {
    document.getElementById("load").contains(e.target) && loading(0);
    const closeButton = document.querySelector(".popup-close");
    try {
        let popup = document.querySelector(".popup");
        closeButton.contains(e.target) && (popup.style.display = "none");
    } catch (e) {}

});