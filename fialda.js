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

async function getBCPTCP(s = '') {
    loading(!0)
    try {
        var d = new Date()
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year2 = (month < 4) ? (year - 1) : year
        var month2 = (month < 4) ? (month + 9) : (month - 3)
        url = `https://fwtapi3.fialda.com/api/services/app/AnalysisReport/GetByFilter?fromDate=${year2}-${month2}-${day}&toDate=${year}-${month}-${day}&symbols=${s.trim().toUpperCase()}`
        var res = await fetch(url);
        var data = await res.json();
        POST = data.result
        await taoTable(POST);
    } catch (e) {}
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
    ["MÃ", "ĐV PHÁT HÀNH", "TIÊU ĐỀ", "NGÀY", "GIÁ", "THAY ĐỔI", ""].forEach(function(el) {
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
    const symbols = Object.keys(POST);
    const symbolstring = symbols.join(",")
    var url = 'https://mastrade.masvn.com/api/v1/market/symbolLatest?symbolList=' + symbolstring
    var res = await fetch(url)
    var dataprice = await res.json();
    for (const symbol of symbols) {
        const reports = P[symbol];
        for (var i = 0; i < reports.length; i++) {
            var index = dataprice.findIndex(x => x.s === symbol)
            var change = `${dataprice[index].ch}/${(100*dataprice[index].r).toFixed(2)}%`
            var n = new Date(reports[i].reportDate);
            var tr = document.createElement('tr');
            cTd(symbol, tr)
            cTd(reports[i].reporter, tr)
            cTd(reports[i].title, tr)
            cTd(`${n.getDate()}/${n.getMonth()+1}/${n.getFullYear()}`, tr)
            cTd(dataprice[index].c, tr) //close
            cTd(change, tr) //change
            var tdlink = document.createElement('td');
            tdlink.setAttribute("style", "text-align:center;");
            tdlink.innerHTML = `<a href="https://cdn.fialda.com/Attachment/AnalysisReport/${symbol}_-_${reports[i].attachment}"  target="_blank"><svg fill="var(--black)" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M0 22.944q0 2.464 1.76 4.224l3.072 3.104q1.76 1.728 4.224 1.728t4.256-1.728l2.688-2.976q1.376-1.344 1.664-3.232t-0.512-3.552l-6.784 6.784q-0.576 0.576-1.408 0.576t-1.44-0.576l-2.816-2.816q-0.576-0.608-0.576-1.408t0.576-1.408l6.784-6.816q-1.632-0.8-3.52-0.512t-3.264 1.664l-2.944 2.72q-1.76 1.76-1.76 4.224zM9.792 20.256q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576l8.48-8.48q0.576-0.576 0.576-1.408t-0.576-1.408q-0.608-0.576-1.44-0.576t-1.408 0.576l-8.448 8.48q-0.576 0.576-0.576 1.408zM14.336 7.968q-0.288 1.888 0.512 3.552l6.816-6.816q0.576-0.576 1.408-0.576t1.408 0.576l2.816 2.848q0.576 0.576 0.576 1.408t-0.576 1.408l-6.784 6.784q1.632 0.832 3.52 0.512t3.264-1.664l2.944-2.944q1.76-1.76 1.76-4.224t-1.76-4.256l-2.816-2.816q-1.76-1.76-4.224-1.76t-4.256 1.76l-2.944 2.944q-1.344 1.376-1.664 3.264z"></path></svg></a>`, tr.appendChild(tdlink);
            tbody.appendChild(tr);
        }
    }
    table.appendChild(tbody);
    if (symbols.length) {
        await container.appendChild(table);
    } else {
        container.innerHTML = emptyData;
    };
}
async function getBCPTTT() {
    loading(!0)
    try {
        var url = 'https://fwtapi3.fialda.com/api/services/app/AnalysisReport/GetMarketAnalysisReport?pageNumber=1&pageSize=30'
        var res = await fetch(url);
        var data = await res.json();
        POST = data.result.items
        createBang(POST)
    } catch (e) {}
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
            s.style = "line-height: 24px;width:400px;font-size:14px;text-decoration: none; color:var(--blue);",
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
            var html = `<div class="ant-modal-confirm-body-wrapper"><div class="ant-modal-confirm-body"><span class="ant-modal-confirm-title"><div>${data.title}</div></span><div class="ant-modal-confirm-content"><div class=""><div id="popup-ff841b85-1d1f-d49d-1ed0-90bf3abae314" style="margin-top: 0px;"><div class=""><div><div class="border-bottom"><span class="bg-color-main" style="height: 2px; width: 50px; position: relative; top: 1px; display: block;"></span></div><table class="table" style="font-size: 12px;"><colgroup><col style="width: 150px;"><col></colgroup><tbody><tr><th class="border-bottom content-not-padding color">Nguồn báo cáo</th><td class="border-bottom color">${data.reporter}</td></tr><tr><th class="border-bottom content-not-padding color">Ngày báo cáo</th><td class="border-bottom color">${day}-${month}-${year}</td></tr><tr><th class="border-bottom content-not-padding color">File</th><td class="border-bottom "><a href="https://cdn.fialda.com/Attachment/AnalysisReport/${convertDateToYYYYMMDD(data.reportDate)}_-_${data.attachment}" class="" target="_blank"><button type="submit" class="btn btn-ico btn-primary" style="height: 25px; width: 200px;"><span>Xem nội dung chi tiết</span><span><i class="ico ico-cloud-download"></i></span></button></a></td></tr></tbody></table><div class="mt-px color2">${data.content}</div></div></div></div></div></div></div></div>`
            var temp = {
                "contentHtml": html,
                "title": data.title
            }
            showPopup(temp.contentHtml)
        } catch (e) {}
    }
}

window.addEventListener('dblclick', (event) => {
    let e = window.getSelection().toString().trim().toUpperCase();
    if (e.length == 3 && POST.hasOwnProperty(e)) {
        if (event.ctrlKey) chrome.tabs.create({
            url: "fireant.html?q=" + e
        })
        else chrome.runtime.sendMessage({
            action: "openPop",
            code: e
        })
    }
})
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
                    fetchArticles();
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
    let popup = document.querySelector(".popup");
    closeButton.contains(e.target) && (popup.style.display = "none");

});