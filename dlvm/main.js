"use strict";
// Khai báo API và URL
const log = console.log;
const hostHTTPs = 'https://'
const api24hmoney = hostHTTPs + 'api-finance-t19.24hmoney.vn/'
const apifialda3 = hostHTTPs + 'fwtapi3.fialda.com/'
const apivndirect = hostHTTPs + 'finfo-api.vndirect.com.vn/'
const fialdaNewsURL = apifialda3 + 'api/services/app/Home/GetLatestNews?pageNumber=1&pageSize=50'
const fialdaCompanyNewsURL = apifialda3 + 'api/services/app/StockInfo/GetCompanyNews'
const fialdaDetailNewsURL = apifialda3 + 'api/services/app/News/GetNewsDetail'
const briefEventsURL = apifialda3 + 'api/services/app/Event/GetBriefEvents'
const financialHighlightURL = apifialda3 + 'api/services/app/TechnicalAnalysis/GetFinancialHighlights'
const financialReportFileURL = api24hmoney + 'v1/web/announcement/financial-report-file'
const financialGraphURL = api24hmoney + 'v1/ios/company/financial-graph'
const companiesDetailURL = api24hmoney + 'v1/ios/company/detail'
const mastradingviewURL = hostHTTPs + 'mastrade.masvn.com/api/v1/tradingview/history' //? ?symbol=KDH&resolution=1D&from=1635292800&to=1690848000
const vndtradingviewURL = hostHTTPs + 'dchart-api.vndirect.com.vn/dchart/history' //?resolution=D&symbol=ANV&from=1655260585&to=1686364645 - sau chia tách
const hsctradingviewURL = hostHTTPs + 'online.hsc.com.vn/ta/history' // ?symbol=NBC&resolution=D&from=1685502121&to=1686366121
const witradingviewURL = hostHTTPs + 'chart.wichart.vn/data/history' //?symbol=QCG&resolution=1D&from=1652261712&to=1686389772
// Khai báo img
const tickicon = `<span style="right:0px"><svg data-icon="tick" width="16" height="16" viewBox="0 0 16 16" style="fill: #a79393;"><desc>tick</desc><path d="M14 3c-.28 0-.53.11-.71.29L6 10.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42l4 4c.18.18.43.29.71.29s.53-.11.71-.29l8-8A1.003 1.003 0 0014 3z" fill-rule="evenodd"></path></svg></span>`;
const loadingImg = '<div class="loading-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';
const emptyImg = '<svg width="90" height="60" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>';
const warningImg = '<svg  width="16" height="16" class="MuiSvgIcon-root MuiSvgIcon-colorError MuiSvgIcon-fontSizeMedium css-1s4zcpf" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ReportProblemRoundedIcon" aria-label="Đang bị cảnh báo"><path d="M2.73 21h18.53c.77 0 1.25-.83.87-1.5l-9.27-16c-.39-.67-1.35-.67-1.73 0l-9.27 16c-.38.67.1 1.5.87 1.5zM13 18h-2v-2h2v2zm-1-4c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"></path></svg>';
const dateIco = '<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="fill:var(--black);width: 12px; height: 12px;enable-background:new 0 0 512 512;" xml:space="preserve"><g><g> <path d= "M492,60.163h-98.489V40c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20.163H158.489V40c0-11.046-8.954-20-20-20 s-20,8.954-20,20v20.163H20c-11.046,0-20,8.955-20,20V472c0,11.045,8.954,20,20,20h472c11.046,0,20-8.955,20-20V80.163 C512,69.118,503.046,60.163,492,60.163z M472,452H40V100.163h78.489v20.164c0,11.046,8.954,20,20,20s20-8.954,20-20v-20.164 H353.51v20.164c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-20.164H472V452z"/></g></g><g><g><circle cx="256" cy="234.95" r="27"/></g></g><g><g><circle cx="256" cy="352.46" r="27"/></g></g><g><g><circle cx="138.49" cy="234.95" r="27"/></g></g><g><g><circle cx="373.51" cy="234.95" r="27"/></g></g><g><g><circle cx="138.49" cy="352.46" r="27"/></g></g><g><g><circle cx="373.51" cy="352.46" r="27"/></g></g></svg>';
const dateIco2 = '<svg version="1.1" id="Capa_1" fill="white"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="width: 12px; height: 12px;enable-background:new 0 0 512 512;" xml:space="preserve"><g><g> <path d= "M492,60.163h-98.489V40c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20.163H158.489V40c0-11.046-8.954-20-20-20 s-20,8.954-20,20v20.163H20c-11.046,0-20,8.955-20,20V472c0,11.045,8.954,20,20,20h472c11.046,0,20-8.955,20-20V80.163 C512,69.118,503.046,60.163,492,60.163z M472,452H40V100.163h78.489v20.164c0,11.046,8.954,20,20,20s20-8.954,20-20v-20.164 H353.51v20.164c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-20.164H472V452z"/></g></g><g><g><circle cx="256" cy="234.95" r="27"/></g></g><g><g><circle cx="256" cy="352.46" r="27"/></g></g><g><g><circle cx="138.49" cy="234.95" r="27"/></g></g><g><g><circle cx="373.51" cy="234.95" r="27"/></g></g><g><g><circle cx="138.49" cy="352.46" r="27"/></g></g><g><g><circle cx="373.51" cy="352.46" r="27"/></g></g></svg>'
const downicon = '<svg width="16" height="16" viewBox="0 0 24 24" style="fill: red;vertical-align: middle;"  focusable="false" class=" NMm5M"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>';
const upicon = '<svg width="16" height="16" style="fill: green;vertical-align: middle;"  viewBox="0 0 24 24" focusable="false" class=" NMm5M"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></svg>';
const btIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="#035A4B"></path><path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="#035A4B"></path></svg>';
const xicon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="#ff9"></path><path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="#fff"></path></svg>';
const kinhlup = '<li id="kinhlup"><a style="color: azure;" id="kinhlup" title="Mã CK Quan Tâm" aria-expanded="true" aria-label="follow" class=""><i class="AddStockCodes" aria-hidden="true"><?xml version="1.0" ?><svg id="kinhlup" style="display: initial;"class="feather feather-search" fill="none" height="16" width="16px" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg></i></a></li>';

// đóng dấu bản quyền
const getCopyrightText = async function() {
    log("\n %c " + chrome.runtime.getManifest()
        .name + " extension version: " + chrome.runtime.getManifest()
        .version + ", được viết bởi Anh Phê %c https://facebook.com/phebungphe1995 ", "color: #FFF; background: #222d38; padding:5px 0;background-size: 300% 100%;background-image: linear-gradient(to right, #25aae1, #024fd6, #04befe, #3f86ed);", "color: #FFF; border: 1px solid #8f8f8f;padding:4px 0;");
}

// Các hàm chức năng chính
function getwebsite(s) {
    fetch(companiesDetailURL + '?symbol=' + s)
        .then(response => response.json())
        .then(data => {
            let u = data.data.website;
            window.open("https://" + u, "_blank");
        })
}

async function refreshWatchlistData(list) {
    if (!list.length) return [];
    try {
        var symbolstring = list.map(s => s.symbol)
            .join(",")
        var url = 'https://mastrade.masvn.com/api/v1/market/symbolLatest?symbolList=' + symbolstring
        var res = await fetch(url)
        var data = await res.json();
        for (var i = 0; i < list.length; i++) {
            data[i].c ? (list[i].lastPrice = parseFloat(data[i].c)) : (list[i].lastPrice = parseFloat(data[i].odC))
            list[i].lastChange = changeFormatValue(data[i].r);
            list[i].lastChangep = data[i].ch;
            list[i].volume = data[i].vo;
        }
    } catch (e) {
        console.log(e)
    }
    return list;
}

function isStockMarketOpen() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const isBeforeOpening = hour < 9 ;
    const isRestTime = (hour == 11 && minute >= 30) ||hour == 12
    const isAfterClosing = hour >= 15;
    return isTradingDay() &&  !isBeforeOpening && !isAfterClosing && !isRestTime;
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

function formatDate(dateString) {
    let year = dateString.slice(0, 4);
    let month = dateString.slice(4, 6);
    let day = dateString.slice(6, 8);
    return `${day}/${month}/${year}`;
}
function INDEXc(c, revert = false) {
    let code = c;
    let source = ["VN-INDEX", "HNXUpcomIndex", "HNXIndex"];
    let target = ["VNINDEX", "UPCOM", "HNX"];
    if (revert) {
        for (var i = 0; i < source.length; i++) c == target[i] && (code = source[i]);
    } else {
        for (var i = 0; i < source.length; i++) c == source[i] && (code = target[i]);
    }
    return code;
}
// điền thông tin tổng quan
async function popQuick(e) {
      var DSCK=[];await chrome.storage.local.get(["mack"]).then(e=>{Object.assign(DSCK,e.mack)});
            var ite = DSCK.findIndex(item => item['code'].toUpperCase() == e.toUpperCase());
    function dmy(t) {
        const e = new Date(t);
        return `${e.getDate()}-${e.getMonth()+1}-${e.getFullYear()}`
    }
    //Kiểm tra xem đó là mã chứng quyền hay chứng khoán
    if (e == "VNINDEX" || e == "HNX" || e == "UPCOM" || ite !== -1) getTickerDetail(INDEXc(e));
    else getCWinfo(e);
    // hàm hỗ trợ lấy thông tin
    async function getCWinfo(cw) {
        var t = new Headers;
        t.append("Content-Type", "application/json");
        var n = JSON.stringify([{
            symbol: cw
        }]);
        try {
            var a = await fetch("https://fwtapi4.fialda.com/api/services/app/Common/GetCWInfos", {
                method: "POST",
                headers: t,
                body: n
            })
            var b = await a.json();
            var c = b.result[cw];
            if (c) {
                var d = c.BasicInfo
                var f = c.PriceInfo
                document.getElementById("ttcb")
                    .innerHTML = `<p style = "margin-bottom: 0px;margin-left:20px;" title="${d.name}"><strong>${d.legalName||d.name}</strong><br/> <i>(${d.symbol}-${d.exchange})</i> <br/> <strong style="font-size:16px;margin:auto;">${parseFloat(f.closePrice)}<span style = "color: ${f.priceChange<0?"red":"green"}"> (${changeFormatValue(f.priceChangePercent)}%)</span></strong></p>`;
                document.getElementById("dinhgia")
                    .innerHTML = "<p><b>Giá TH: </b> " + (null == d.adjExercisePrice ? "0" : formatNumber(d.adjExercisePrice.toFixed(2))) + "<br/> <b> CKCS: </b> " + f.settlementPrice.toFixed(2) + "<br/><b>TLCĐ: </b>" + d.adjExerciseRatioText + " <br/></p>";
                document.getElementById("ngdd")
                    .innerHTML = `<p><b>TCPH: </b><a style="display: contents;" href="https://cdn.fialda.com${d.documents}" target= _blank>${d.issuer}</a> <br/> <b>PH:</b>${dmy(d.firstTradingDate)}<br/><b>GDCC:</b> ${dmy(d.expiryDate)}<br/></p>`;
                document.getElementById("ngdd")
                    .setAttribute("style", "width: 25%;");
                document.getElementById("vonhoa")
                    .setAttribute("style", "text-align: left;width: 20%;");
                document.getElementById("vonhoa")
                    .innerHTML = `<p><b>ĐHV: </b> ${f.breakevenPrice.toFixed(2)} <br/> <b>Premium :</b> ${(parseFloat(f.breakevenPrice)-parseFloat(f.settlementPrice)).toFixed(2)}<br/><b>%Premium: </b> ${(100*(parseFloat(f.breakevenPrice)/parseFloat(f.settlementPrice)-1)).toFixed(2)}<br/></p>`;
            }
        } catch (e) {
            console.log(e)
        }
    }
    async function getTickerDetail(symbol) {
        var t = new Headers;
        t.append("Content-Type", "application/json");
        var m = JSON.stringify({
            ticker: symbol,
            day: "0"
        });
        try {
            var h = await fetch("https://api.finbox.vn/api/app_new/getTickerDetail", {
                method: "POST",
                headers: t,
                body: m,
                redirect: "follow"
            })
            var g = await h.text();
            const n = JSON.parse(JSON.parse(g)
                .tickerData);
            if (n) {
                let e = `style = "color: ${n.pricePercent<0?"red":"green"}"`;
                document.getElementById("ttcb")
                    .innerHTML = '<p id="web" style = "cursor: pointer;margin-bottom: 0px;margin-left:20px;"><strong>' + n.company + "</strong> <b>[" + (n.rs_rating === void 0 ? '' : n.rs_rating) + "]</b><br/> <i>(" + n.industry + " - " + n.floor + ')</i> <br/> <strong style="font-size:16px;margin:auto;">' + parseFloat(n.priceFlat)
                    .toFixed(2) + " <span " + e + "> (" + changeFormatValue(n.pricePercent) + "%) </span></strong> </p>", document.getElementById("ngdd")
                    .innerHTML = "<p> <strong>Update: </strong><br/>" + formatDate(n.date) + "<br/>" + n.trend + "</p>", document.getElementById("ttcb")
                    .title = n.info, document.getElementById("vonhoa")
                    .innerHTML = "<p><b>KLGDTB: </b> " + (null == n.tb_klgd ? "0" : formatNumber(n.tb_klgd.toFixed(0))) + " CP<br/><b>GDNN: </b>" + (null == n.giaodichnn ? 0 : formatNumber(n.giaodichnn.toFixed(1))) + " tỷ<br/> <b>GTGDTB: </b> " + (null == n.tbgtdd ? 0 : formatNumber(n.tbgtdd.toFixed(1))) + " tỷ<br/></p>", document.getElementById("dinhgia")
                    .innerHTML = "<p><b>P/E: </b>" + (null == n.pe ? "0" : n.pe.toFixed(2)) + " lần<br/> <b>P/B:</b> " + (null == n.pb ? "0" : n.pb.toFixed(2)) + " lần<br/><b>PF: </b> " + (null == n.pf ? "0" : n.pf.toFixed(2)) + " <br/></p>", n.note !== void 0 && (document.getElementById("ngdd")
                        .title = n.note)
            } else vsStockInfo(symbol)
        } catch (s) {getCWinfo(symbol)}
    }
    async function vsStockInfo(symbol) {
        try {
            var a = await fetch(`https://mastrade.masvn.com/api/v2/vs/stockInfo?query=query{vsStockInfo(StockCode:"${symbol}"){FullName,Max52W,Min52W,PerChange52W,MarketCapital,EPS,PE,PB,Beta,Dividend,Yield,KLCPLH,KLCPNY,StockStatus,TotalVol,TotalRoom,TotalVal,CurrRoom,PerChange,Change,OwnedRatio,Freefloat,SubIndustry,ClosePrice,SectorName,IndustryID}}`);
            var e = await a.json();
            if (e) {
                let t = `style = "color: ${e.Change<0?"red":"green"}"`;
                document.getElementById("ttcb")
                    .innerHTML = '<p id="web" style = "cursor: pointer;margin-bottom: 0px;margin-left:20px;"><strong>' + e.FullName + "</strong><br/> <i>(" + e.SectorName + ')</i> <br/> <strong style="font-size:16px;margin:auto;">' + parseFloat(e.ClosePrice) + " <span " + t + "> (" + changeFormatValue(e.PerChange) + "%)" + (e.StockStatus && '<span id="ghichu_" title = "' + e.StockStatus + '"style ="filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%); margin:0px;padding:0px;">' + warningImg + "</span>") + "</span></strong></p>", document.getElementById("vonhoa")
                    .innerHTML = "<p><b>SLCPLH: </b> " + (null == e.KLCPLH ? "0" : formatNumber(e.KLCPLH.toFixed(0))) + " CP<br/><b>SLCPNY: </b>" + formatNumber(e.KLCPNY) + " CP<br/> <b>Vốn hoá: </b> " + formatNumber(parseFloat(e.MarketCapital / 1e9)
                        .toFixed(1)) + " tỷ<br/></p>", document.getElementById("dinhgia")
                    .innerHTML = "<p><b>P/E: </b>" + (null == e.PE ? "0" : e.PE.toFixed(2)) + " lần<br/> <b>P/B:</b> " + (null == e.PB ? "0" : e.PB.toFixed(2)) + " lần<br/><b>Beta: </b> " + (null == e.Beta ? "0" : e.Beta.toFixed(2)) + " <br/></p>", document.getElementById("ngdd")
                    .remove()
            } else alert("Ma co phieu khong dung"), window.close()
        } catch (e) {
            document.getElementById("revenu")
                .innerHTML = '<div style="display: flex;align-items: center;height: 150px;"><span style="margin:auto;display: block;">' + loadingImg + "</span></div>";
            document.getElementById("profit")
                .innerHTML = '<div style="display: flex;align-items: center;height: 150px;"><span style="margin:auto;display: block;">' + loadingImg + "</span></div>";
        }
    }
    document.addEventListener("click", function(e) {
        var n = document.querySelector(".loading-container");
        n && n.parentNode.removeChild(n);
    })
}
// lấy dữ liệu highlight KQKD
function getFinancialHiglight(t){function e(){document.getElementById("revenu").innerHTML='<div style="margin:auto;display:  flex;height: 220px;text-align:center;align-items: center;" title ="Không có dữ liệu"><span style="display: block;">'+emptyImg+"</span></div>",document.getElementById("profit").innerHTML='<div style="margin:auto;display:  flex;height: 220px;text-align:center;align-items: center;" title ="Không có dữ liệu"><span style="display: block;">'+emptyImg+"</span></div>"}function r(t,e,r,a){var l=document.getElementById(r);document.getElementById(r).innerHTML="";for(var n=0;n<t.length;n++){var s=l.insertRow(n),o=s.insertCell(0),i=s.insertCell(1),p=s.insertCell(2),h=s.insertCell(3),u=s.insertCell(4);0==n?(s.style="font-weight: bold;",o.innerHTML=a,u.innerHTML=t[n].first,h.innerHTML=t[n].second,p.innerHTML=t[n].third,i.innerHTML=t[n].forth):(o.innerHTML=5==n?"Cả năm":"Quý "+n,o.style="font-weight:bold;",u.innerHTML=cel(t[n].first,e[n].first),h.innerHTML=cel(t[n].second,e[n].second),p.innerHTML=cel(t[n].third,e[n].third),i.innerHTML=cel(t[n].forth,e[n].forth))}}fetch(financialHighlightURL+"?symbol="+t).then(t=>t.json()).then(t=>{let a=t.result,l=new Date;if(a.length){let t=!1,e=[{stt:0},{stt:1},{stt:2},{stt:3},{stt:4},{stt:5}],s=[{stt:0},{stt:1},{stt:2},{stt:3},{stt:4},{stt:5}],o=[{stt:0,first:l.getFullYear(),second:l.getFullYear()-1,third:l.getFullYear()-2,forth:l.getFullYear()-3},{stt:1},{stt:2},{stt:3},{stt:4},{stt:5}],i=[{stt:0,first:l.getFullYear(),second:l.getFullYear()-1,third:l.getFullYear()-2,forth:l.getFullYear()-3},{stt:1},{stt:2},{stt:3},{stt:4},{stt:5}];for(var n=0;n<a.length;n++)l.getFullYear()==a[n].year&&(t=null==a[n].netSale,a[n].quarter&&(e[a[n].quarter].first=parseFloat(a[n].profit_Growth_YoY),o[a[n].quarter].first=parseFloat(a[n].profit)/1e9,s[a[n].quarter].first=parseFloat(a[n].netSale_Growth_YoY)||parseFloat(a[n].eps_Growth_YoY),i[a[n].quarter].first=parseFloat(a[n].netSale)/1e9||parseFloat(a[n].eps))),l.getFullYear()-1==a[n].year&&a[n].quarter&&(e[a[n].quarter].second=parseFloat(a[n].profit_Growth_YoY),o[a[n].quarter].second=parseFloat(a[n].profit)/1e9,s[a[n].quarter].second=parseFloat(a[n].netSale_Growth_YoY)||parseFloat(a[n].eps_Growth_YoY),i[a[n].quarter].second=parseFloat(a[n].netSale)/1e9||parseFloat(a[n].eps)),l.getFullYear()-2==a[n].year&&a[n].quarter&&(e[a[n].quarter].third=parseFloat(a[n].profit_Growth_YoY),o[a[n].quarter].third=parseFloat(a[n].profit)/1e9,s[a[n].quarter].third=parseFloat(a[n].netSale_Growth_YoY)||parseFloat(a[n].eps_Growth_YoY),i[a[n].quarter].third=parseFloat(a[n].netSale)/1e9||parseFloat(a[n].eps)),l.getFullYear()-3==a[n].year&&a[n].quarter&&(e[a[n].quarter].forth=parseFloat(a[n].profit_Growth_YoY),o[a[n].quarter].forth=parseFloat(a[n].profit)/1e9,s[a[n].quarter].forth=parseFloat(a[n].netSale_Growth_YoY)||parseFloat(a[n].eps_Growth_YoY),i[a[n].quarter].forth=parseFloat(a[n].netSale)/1e9||parseFloat(a[n].eps));r(o,e,"profit","Lợi nhuận"),r(i,s,"revenu",t?"EPS":"Doanh thu")}else e()}).catch(t=>{log(t),e()})};

function cel(e, s) {
    let c = "",
        d = "green";
    return s < 0 ? (d = "red", c = '</p><svg class="css-2qx0w8" focusable="false"  viewBox="0 0 24 24" ><path d="m7 10 5 5 5-5z"></path></svg>') : c = '</p><svg class="css-2qx0w8" focusable="false"  viewBox="0 0 24 24" "><path d="m7 14 5-5 5 5z"></path></svg>', "--" == checkUndefined(s, "%") ? "--" : '<div style = "color:' + d + '";><p>' + checkUndefined(e, "") + c + checkUndefined(100 * s, "%") + "</div>"
}

function checkUndefined(n, e) {
    return void 0 === n || null == n || isNaN(n) ? "--" : n.toFixed(1) + e
}

function subtxt(t, e) {
    return t.length > e ? t.slice(5, e) + "..." : t.slice(5)
}

function saveLastSymbol(t) {
    3 == t.length && localStorage.setItem("lastSymbol", t)
}

function formatNumber(e) {
    return e >= 1e6 ? (e / 1e6)
        .toFixed(1)
        .replace(/\.0$/, "") + "M" : e >= 1e3 ? (e / 1e3)
        .toFixed(1)
        .replace(/\.0$/, "") + "k" : e
}

function getCurrentDate() {
    const t = new Date;
    return t.getFullYear() + "-" + String(t.getMonth() + 1)
        .padStart(2, "0") + "-" + String(t.getDate())
        .padStart(2, "0")
}

function cTitle(n = []) {
    for (var r = "", t = 0; t < n.length; t++) r = r + n[t] + "\n";
    return r
}
////----------------/////
////-------------------////
var autoUpdate;
// tạo biểu đồ lightweight
async function renderChart(container, rong, dai, symbolName, isMaxWidth = false, theme = 'light', re=false) {
    const ThemeOptions = {
        "dark": {
            layout: {
                backgroundColor: 'rgb(24, 28, 39)',
                textColor: 'rgb(178, 181, 190)',
            },
            timeScale: {
                rightOffset: 20,
                borderColor: "rgba(240, 243, 250, 0.06)"
            },
            rightPriceScale: {
                borderColor: "rgba(240, 243, 250, 0.06)",
                autoScale: true,
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.08,
                }
            },
            grid: {
                vertLines: {
                    color: 'rgba(240, 243, 250, 0.06)',
                },
                horzLines: {
                    color: 'rgba(240, 243, 250, 0.06)',
                },
            },
        },
        "light": {
            layout: {
                backgroundColor: 'rgb(255, 255, 255)',
                textColor: '#000',
            },
            timeScale: {
                rightOffset: 20,
                borderColor: "rgb(225, 226, 227)"
            },
            rightPriceScale: {
                borderColor: "rgb(225, 226, 227)",
                autoScale: true,
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.08,
                }
            },
            grid: {
                vertLines: {
                    color: "rgba(42, 46, 57, 0.06)"
                },
                horzLines: {
                    color: "rgba(42, 46, 57, 0.06)"
                }
            },
        },
    };
    var DSCK = [],
        wiKeyword = [];
    await chrome.storage.local.get(["mack"])
        .then(e => {
            Object.assign(DSCK, e.mack)
        }), await chrome.storage.local.get(["key"])
        .then(e => {
            Object.assign(wiKeyword, e.key)
        });
    let vimo = wiKeyword.map(e => ({
            code: e.name,
            fullname_vi: e.keyWord,
            type: e.type
        })),
        allKey = DSCK.concat(vimo);
    var items = allKey.find(item => item['code'].toUpperCase() == symbolName.toUpperCase());
    const domElement = document.getElementById(container);
    domElement.setAttribute("allowfullscreen", true);
    domElement.innerHTML = `<div class="loading-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;
    var ohlc = [],
        volume = [],
        closep = [],
        change = [],
        changep = [],
        ma20 = [],
        ma50 = [],
        ma150 = [],
        ma200 = [],
        banker_rsi = [],
        hot_rsi = [],
        bankermcdx = [],
        hotmcdx = [];
    await getData();
    domElement.innerHTML = "";
    // khởi tạo biểu đồ
    const chart = LightweightCharts.createChart(domElement, {
        width: rong,
        height: dai,
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        overlayPriceScales: {
            scaleMargins: {
                top: 0.7,
                bottom: 0,
            }
        },
        pane: 0,
    });
    chart.applyOptions(ThemeOptions[theme]);
    re && setInterval(async () => {
        chrome.storage.local.get(["theme"])
            .then(s => {
                s.theme !== theme && (chart.applyOptions(ThemeOptions[s.theme]), theme = s.theme);
            });
    }, 1e2);
    // thêm biểu đồ nến
    const candleSeries = chart.addCandlestickSeries({
        title: symbolName,
        upColor: "#179f89",
        downColor: "#f55c68",
        borderDownColor: "#f55c68",
        borderUpColor: "#179f89",
        wickDownColor: "#f55c68",
        wickUpColor: "#179f89",
        pane: 0
    })
    // thêm biểu đồ miền
    const areaSeries = chart.addAreaSeries({
        title: symbolName,
        topColor: 'rgba(70, 130, 180, 0.5)',
        bottomColor: 'rgba(70, 130, 180, 0.1)',
        lineColor: '#4682B4',
        lineWidth: 2,
        visible: !1
    });
    // thêm khối lượng
    const volumeSeries = chart.addHistogramSeries({
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '',
        priceLineVisible: false,
        priceScale: {
            scaleMargins: {
                top: 0.7,
                bottom: 0
            },
        },
        pane: 0
    });
    // SMA20 volume
    const smavolumeseries = chart.addAreaSeries({
        topColor: 'rgba(56, 33, 110,0.6)',
        bottomColor: 'rgba(56, 33, 110, 0.1)',
        lineWidth: 1,
        priceFormat: {
            type: 'volume'
        },
        lineStyle: 0,
        axisLabelVisible: true,
        crosshairMarkerVisible: false,
        priceScaleId: '',
        lastValueVisible: true,
        priceLineVisible: false,
        pane: 0
    });
    // ma20
    const ma20series = chart.addLineSeries({
        color: '#3289F5',
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: false,
        //title: 'MA20',
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: true,
        pane: 0
    });
    // thêm MA50
    const ma50series = chart.addLineSeries({
        color: '#f68c2f',
        lineWidth: 1,
        lineStyle: 0,
        axisLabelVisible: true,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: true,
        pane: 0
    });
    // thêm MA150
    const ma150series = chart.addLineSeries({
        color: 'rgb(33, 150, 243)',
        lineWidth: 1.5,
        lineStyle: 1,
        visible: !1,
        axisLabelVisible: true,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: true,
        pane: 0
    });
    // thêm MA200
    const ma200series = chart.addLineSeries({
        color: 'rgb(33, 150, 243)',
        lineWidth: 1.5,
        lineStyle: 0,
        visible: !0,
        axisLabelVisible: true,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: true,
        pane: 0
    });
    candleSeries.setData(ohlc);
    areaSeries.setData(closep);
    volumeSeries.setData(volume);
    smavolumeseries.setData(calculateSMA(volume, 20))
    ma20series.setData(ma20)
    ma50series.setData(ma50)
    ma150series.setData(ma150)
    ma200series.setData(ma200)
    // indicator phụ
    var current_indicator;
    await addIndicator();
    var oldw, oldh;
    // thay đổi kích thước khi kích thước màn hình thay đổi
    window.addEventListener("click", () => {
        let w = window.innerWidth,
            h = window.innerHeight;
        if (document.fullscreenElement) {
            chart.resize(w, h);
        }
        else if (isMaxWidth) {
            chart.resize(w, h - 40);
        }
    });
    window.addEventListener("resize", () => {
        let w = window.innerWidth,
            h = window.innerHeight;
        if (document.fullscreenElement) {
            chart.resize(w, h);
        }
        else if (isMaxWidth) {
            chart.resize(w, h - 40);
        }
    });
    // thay đổi kích thước khi chuyển fullscreen
    document.addEventListener("fullscreenchange", () => {
        let w = window.innerWidth,
            h = window.innerHeight;
        if (!document.fullscreenElement) {
            chart.resize(rong, dai);
            domElement.querySelector(".input_code")
                .setAttribute("style", "display:none;");
        }
        else {
            domElement.querySelector("#fullscreen")
                .title = "Thoát chế độ toàn màn hình!";
            domElement.querySelector(".input_code")
                .setAttribute("style", "font-size:18px; font-weight:600;position:absolute;color:var(--black); top:10px; left: 10px; width: 500px;z-index:10;");
            chart.resize(w, h);
        }
    });
    var showDumua = true;
    var isCandleStick = true,
        ispop = true,
        isMA20 = true,
        isMA50 = true,
        isMA150 = false,
        isMA200 = true;
    autoUpdate = isStockMarketOpen() && setInterval(autoRefresh, 1000);
    // Thêm chú giải
    const legend = document.createElement('div');
    legend.style = `position: absolute; top: 40px; z-index: 100; font-size: 13px; font-family: Inter, "Nunito Sans", Lexend, "Noto Sans", sans-serif; line-height: 18px; font-weight: bold; width:100%;background-color:transparent;display: flex;justify-content: space-between;width: 100%; margin:auto;`;
    const tickicon2 = `<svg data-icon="tick" width="16" height="16" viewBox="0 0 16 16" style="fill: #a79393;"><desc>tick</desc><path d="M14 3c-.28 0-.53.11-.71.29L6 10.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42l4 4c.18.18.43.29.71.29s.53-.11.71-.29l8-8A1.003 1.003 0 0014 3z" fill-rule="evenodd"></path></svg>`
    const indi = document.createElement('div');
    indi.style = `font-size: 11px; font-family: Inter, "Nunito Sans", Lexend, "Noto Sans", sans-serif; line-height: 18px; font-weight: bold;float:right; background-color:transparent;margin-right:60px;`;
    indi.innerHTML = `<style>#Indicator a:hover {background-color: #ebf1f5;cursor:pointer;}#Indicator a{color:#106ba3}</style><button type="button" id="changeTypeChart" title="Thay đổi kiểu biểu đồ" class="bp3-button bp3-small" style="margin-right: 4px;border-radius: 4px;box-sizing: border-box;"><img  src="${chrome.runtime.getURL("icons/"+(isCandleStick? 'area':'candle')+".png")}" style="width:16px;height:16px;pointer-events: none;"/></button><button type="button" title="Lựa chọn biểu đồ kỹ thuật"  style="margin-right: 4px;border-radius: 4px;box-sizing: border-box;" class="bp3-button bp3-small" id="fxindicator"><img  src="${chrome.runtime.getURL("icons/fx.png")}" style="width:16px;height:16px;pointer-events: none;"/></button><button type="button" id="fullscreen" title="Xem toàn màn hình." style="margin-right: 4px;border-radius: 4px;box-sizing: border-box;" class="bp3-button bp3-small"><img src="${chrome.runtime.getURL("icons/fullscreen.png")}" style="width:16px;height:16px;pointer-events: none;"/></button>`;
    const firstRow = document.createElement('div');
    firstRow.style = `color:var(--black);margin-left:10px;`;
    legend.appendChild(firstRow);
    legend.appendChild(indi);
    domElement.appendChild(legend);
    var tencophieu = document.createElement("div");
    tencophieu.setAttribute("class", "input_code");
    tencophieu.setAttribute("style", "display:none;color:var(--black)");
    tencophieu.innerHTML = items.fullname_vi + ` (${symbolName})`;
    domElement.appendChild(tencophieu);
    const dumua = document.createElement('div');
    dumua.setAttribute("class", "dumuaban");
    dumua.style = `position: absolute; top: 40px; left:10px; z-index: 1000; font-size: 11px; line-height: 18px; margin:auto;`;
    legend.appendChild(dumua);
    var symbolmarkers = [],
        showMarkers = false;

    function addIndicator() {
        try {
            chart.removePane(1)
        }
        catch (e) {}
        chrome.storage.local.get(["indicator", "dumuaban"], async function (t) {
            current_indicator = t.indicator;
            showDumua = t.dumuaban;
            switch (t.indicator) {
            case "rs":
                var RS = await calculateRS(ohlc);
                var RSsignal = await calculateEMA(RS, 20);
                const RSline = chart.addLineSeries({
                    title: 'RS Line',
                    color: '#f68c2f',
                    lineWidth: 2,
                    lineStyle: 0,
                    axisLabelVisible: true,
                    lastValueVisible: 0,
                    priceLineVisible: false,
                    crosshairMarkerVisible: true,
                    pane: 1
                });
                const RSsma20 = chart.addLineSeries({
                    title: 'RS Signal',
                    color: '#3289F5',
                    lineWidth: 1,
                    lineStyle: 0,
                    axisLabelVisible: true,
                    lastValueVisible: 0,
                    priceLineVisible: false,
                    crosshairMarkerVisible: true,
                    pane: 1
                });
                RSsma20.setData(RSsignal);
                RSline.setData(RS);
                break;
            case "mcdx":
                // thêm MCDX - hot
                const mcdx_hot = chart.addHistogramSeries({
                    title: 'Hot Money',
                    priceFormat: {
                        minMove: 1,
                        precision: 2,
                    },
                    color: '#FFFF00',
                    pane: 1,
                    priceScale: {
                        min: 0,
                        max: 20
                    }
                })
                const mcdx_banker = chart.addHistogramSeries({
                    title: 'Banker',
                    priceFormat: {
                        minMove: 1,
                        precision: 2,
                    },
                    autoScale: true,
                    priceScale: {
                        min: 0,
                        max: 20
                    },
                    color: '#FF0000',
                    pane: 1,
                })
                banker_rsi.forEach(r => {
                    let a = 1.5 * (r.value - 50);
                    let b = a > 20 ? 20 : a < 0 ? 0 : a
                    bankermcdx.push({
                        time: r.time,
                        value: b,
                        color: b > 5 ? '#FF0000' : 'pink'
                    })
                });
                mcdx_banker.setData(bankermcdx);
                hot_rsi.forEach(r => {
                    let a = .7 * (r.value - 30);
                    let b = a > 20 ? 20 : a < 0 ? 0 : a;
                    hotmcdx.push({
                        time: r.time,
                        value: b
                    })
                });
                mcdx_hot.setData(hotmcdx);
                break;
            case "bs":
                var BS = await getBuySell(symbolName, change);
                const BSline = chart.addHistogramSeries({
                    title: 'Buy/Sell Line',
                    color: '#f68c2f',
                    lineWidth: 2,
                    lineStyle: 0,
                    axisLabelVisible: true,
                    lastValueVisible: 0,
                    priceLineVisible: false,
                    crosshairMarkerVisible: true,
                    pane: 1
                });
                BSline.setData(BS);
                var lineData = BS.map(s => ({
                    time: s.time,
                    value: 0
                }));
                var PriceLine = chart.addLineSeries({
                    color: '#be1238',
                    lineWidth: 1,
                    lineStyle: 1,
                    axisLabelVisible: true,
                    pane: 1
                })
                PriceLine.setData(lineData);
                break;
            default:
            }
        });
    }
    domElement.addEventListener('click', (e) => {
        try {
            const oldp = document.getElementById('Indicator');
            !indi.contains(e.target) && oldp && (indi.removeChild(oldp), ispop = true);
        }
        catch (e) {
            ispop = true;
        }
    });
    indi.addEventListener('click', async (e) => {
        var idtarget = e.target.id
        try {
            const oldp = document.getElementById('Indicator');
            indi.removeChild(oldp);
            ispop = false;
        }
        catch (e) {
            ispop = true;
        }
        if (idtarget) {
            switch (idtarget) {
            case "fullscreen":
                document.fullscreenElement ? document.exitFullscreen() : domElement.requestFullscreen();
                break;
            case "rs-indicator":
                current_indicator = "rs" === current_indicator ? "all" : "rs";
                chrome.storage.local.set({
                    'indicator': current_indicator
                }, function () {
                    addIndicator();
                });
                break;
            case "mcdx-indicator":
                current_indicator = "mcdx" == current_indicator ? "all" : "mcdx";
                chrome.storage.local.set({
                    'indicator': current_indicator
                }, function () {
                    addIndicator();
                });
                break;
            case "bs-indicator":
                current_indicator = "bs" == current_indicator ? "all" : "bs";
                chrome.storage.local.set({
                    'indicator': current_indicator
                }, function () {
                    addIndicator();
                });
                break;
            case "ma20-indicator":
                isMA20 = !isMA20
                ma20series.applyOptions({
                    visible: isMA20
                });
                break;
            case "ma50-indicator":
                isMA50 = !isMA50
                ma50series.applyOptions({
                    visible: isMA50
                });
                break;
            case "ma150-indicator":
                isMA150 = !isMA150
                ma150series.applyOptions({
                    visible: isMA150
                });
                break;
            case "ma200-indicator":
                isMA200 = !isMA200
                ma200series.applyOptions({
                    visible: isMA200
                });
                break;
            case "show-marker":
                showMarkers = !showMarkers;
                candleSeries.setMarkers(showMarkers ? symbolmarkers : []);
                break;
            case "show-dumua":
                showDumua = !showDumua;
                chrome.storage.local.set({
                    'dumuaban': showDumua
                }, function () {
                    !showDumua && (domElement.querySelector(".dumuaban")
                        .innerHTML = "");
                    DuMuaBan();
                });
                break;
            case "changeTypeChart":
                isCandleStick = !isCandleStick
                areaSeries.applyOptions({
                    visible: !isCandleStick
                });
                candleSeries.applyOptions({
                    visible: isCandleStick
                });
                document.getElementById('changeTypeChart')
                    .src = chrome.runtime.getURL("icons/" + (isCandleStick ? 'area' : 'candle') + ".png");
                break;
            default:
                if (ispop) {
                    var selectDiv = document.createElement('div');
                    selectDiv.id = "Indicator";
                    selectDiv.style = `position:absolute; right:100px; top:30px; box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2);-webkit-transform: scale(1);transform: scale(1);border-radius: 3px;display: inline-block;z-index: 100;width:140px;padding:2px;background-color:#fff;color:#5c7080;`;
                    chrome.storage.local.get(['indicator'], async function (t) {
                        selectDiv.innerHTML = `<a id="ma20-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA20<span style="float:right">${isMA20?tickicon2:''}</span></a>
<a id="ma50-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA50<span style="float:right">${isMA50?tickicon2:''}</span></a>
<!--<a id="ma150-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA150<span style="float:right">${isMA150?tickicon2:''}</span></a>-->
<a id="ma200-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA200<span style="float:right">${isMA200?tickicon2:''}</span></a>
<span style="border-top: 1px solid rgba(16,22,26,.15);display: block; margin: 5px;width:90%"></span>
<a id="mcdx-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Dòng tiền MCDX<span style="float:right">${t.indicator == "mcdx"?tickicon2:''}</span></a>
<a id="rs-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Relative Strength<span style="float:right">${t.indicator == "rs"?tickicon2:''}</span></a>
<a id="bs-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Mua bán chủ động<span style="float:right">${t.indicator == "bs"?tickicon2:''}</span></a>
<span style="border-top: 1px solid rgba(16,22,26,.15);display: block; margin: 5px;width:90%"></span>
<a id="show-marker" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Sự kiện<span style="float:right">${showMarkers?tickicon2:''}</span></a>
<a id="show-dumua" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Dư mua bán<span style="float:right">${showDumua?tickicon2:''}</span></a>
`;
                    });
                    indi.appendChild(selectDiv);
                }
            }
        }
    });
    let latestBar = ohlc[ohlc.length - 1]
    let o = latestBar.open,
        h = latestBar.high,
        l = latestBar.low,
        c = latestBar.close,
        v = formatNumber(volume[volume.length - 1].value),
        ma1 = 0,
        ma2 = 0;
    firstRow.innerHTML = `O: <span style="color: #2962FF">${o}</span> H: <span style="color: #2942FF">${h}</span> L: <span style="color: #2862FF">${l}</span> C: <span style="color: #2961fF">${c}</span> Vol: <span style="color: #2952FF">${v}</span> <br/> MA20: <span style="color: #2552FF">${ma1}</span> MA50: <span style="color: #1162FF">${ma2}</span></div>`;
    // Tạo tooltip
    const toolTipWidth = 80,
        toolTipHeight = 80,
        toolTipMargin = 20;
    const toolTip = document.createElement('div');
    const events = document.createElement('div');
    toolTip.style = `width: 96px; height: 96px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 14px; text-align: left; z-index: 100; top: 12px; left: 12px; line-height:18px;pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;background:white;color:#131722;`;
    toolTip.style.borderColor = '#2962FF';
    events.style = `display:none;z-index:100;position:absolute;font-size: 11px; font-family: sans-serif;width:250px;line-height: 20px; padding:8px; font-weight: bold;background-color: white;color:#000; border: 1px solid #ddd;border-radius: 2px;`
    domElement.appendChild(events);
    domElement.appendChild(toolTip);
    const sukien = document.createElement('ul');
    // Thêm marker event
    getMarker();
    chart.subscribeCrosshairMove(param => {
        var p = 0,
            ch = 0,
            chp = 0,
            mevent = '';
        for (var i = 0; i < symbolmarkers.length; i++) {
            mevent += isSameDay(param.time, symbolmarkers[i].time) ? "<li>" + symbolmarkers[i].eventName + "</li>" : "";
        }
        if (mevent && showMarkers) {
            events.innerHTML = mevent;
            events.appendChild(sukien);
            events.style.display = "block";
        }
        else {
            events.innerHTML = "";
            events.style.display = "none";
        }
        try {
            if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > domElement.clientWidth || param.point.y < 0 || param.point.y > domElement.clientHeight) {
                toolTip.style.display = 'none';
            }
            else {
                // update tooltip
                const dateStr = convertNumberToDate(param.time * 1000);
                toolTip.style.display = 'block';
                const datas = param.seriesPrices.get(candleSeries);
                const datacp = getSeriesData(change, param.time);
                const datacc = getSeriesData(changep, param.time);
                const datav = getSeriesData(volume, param.time);
                const datam1 = getSeriesData(ma20, param.time);
                const datam2 = getSeriesData(ma50, param.time);
                l = datas.low !== undefined ? datas.low.toFixed(2) : 0;
                h = datas.high !== undefined ? datas.high.toFixed(2) : 0;
                o = datas.open !== undefined ? datas.open.toFixed(2) : 0;
                c = datas.close !== undefined ? datas.close.toFixed(2) : 0;
                v = datav.value !== undefined ? formatNumber(datav.value) : 0;
                ma1 = datam1.value !== undefined ? datam1.value.toFixed(2) : 0;
                ma2 = datam2.value !== undefined ? datam2.value.toFixed(2) : 0;
                p = (Math.round(datas.close * 100) / 100)
                    .toFixed(2);
                ch = datacp.value.toFixed(2);
                chp = (datacc.value * 100)
                    .toFixed(2);
                let colorChange = ch > 0 ? 'green' : 'red';
                toolTip.innerHTML = `<div style="color: ${'#2962FF'}">${symbolName}</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">${p} </div>
<div style = "font-weight : bold;font-size:12px;margin: 4px 0px;color: ${colorChange};">(${ch}/${chp}%)</div><div style="font-size:12px;color: ${'black'}">${dateStr}</div>`;
                firstRow.innerHTML = `O: <span style="color: #2962FF">${o}</span> H: <span style="color: #2942FF">${h}</span> L: <span style="color: #2862FF">${l}</span> C: <span style="color: #2961fF">${c}</span> Vol: <span style="color: #2952FF">${v}</span> <br/> MA20: <span style="color: #2552FF">${ma1}</span> MA50: <span style="color: #1162FF">${ma2}</span></div>`;
                const y = param.point.y;
                let left = param.point.x + toolTipMargin;
                if (left > container.clientWidth - toolTipWidth) {
                    left = param.point.x - toolTipMargin - toolTipWidth;
                }
                let top = y + toolTipMargin;
                if (top > container.clientHeight - toolTipHeight) {
                    top = y - toolTipHeight - toolTipMargin;
                }
                events.style.left = (left > 550 ? left - 250 + 80 : left) + 'px';
                events.style.top = top + toolTipHeight + toolTipMargin + 'px';
                toolTip.style.left = left + 'px';
                toolTip.style.top = top + 'px';
            }
        }
        catch (e) {}
    });
    DuMuaBan();
    async function autoRefresh() {
        await DuMuaBan();
        await getData();
        candleSeries.update(ohlc[ohlc.length - 1]);
        areaSeries.update(closep[closep.length - 1]);
        volumeSeries.update(volume[volume.length - 1]);
        ma20series.update(ma20[ma20.length - 1]);
        ma50series.update(ma50[ma50.length - 1]);
        ma150series.update(ma150[ma150.length - 1]);
        ma200series.update(ma200[ma200.length - 1]);
    }
    async function DuMuaBan() {
        const getV = (t, e) => void 0 !== e ? e[t] : 0;
        const f = (s) => {
            if (s === 'ATC' || s === 'ATO') return s
            else return s == null ? "0,0" : s.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })
        }
        if (isNaN(items.type) && items.type !== 'cw') {
            domElement.querySelector(".dumuaban")
                .innerHTML = "";
            return;
        }
        if (!showDumua) return;
        var dumua = await fetch("https://mastrade.masvn.com/api/v1/market/symbolLatest?symbolList=" + symbolName);
        var data = await dumua.json();
        if (!data) return;
        let totalM = 0,
            totalB = 0;
        let m = data[0];
        for (const item of m.bb) totalM += item.v;
        for (const item of m.bo) totalB += item.v;
        var cel1 = `<span>O: ${f(getV("o", m))}</span><span>H: ${f(getV("h", m))}</span><span >L: ${f(getV("l",m))}</span>`;
        var cel2 = `<span>${f(getV("p", m.bo[2]))}</span><span>${f(getV("p",m.bo[1]))}</span><span style=" ${getV("p",m.bo[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(m.ss == "ATC" ||m.ss == "ATO"? m.ss: getV("p",m.bo[0]))}</span>`;
        var cel3 = `<span>${f(getV("v", m.bo[2]))}</span><span>${f(getV("v",m.bo[1]))}</span><span style=" ${getV("p",m.bo[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(getV("v", m.bo[0]))}</span>`;
        var cel4 = `<span style=" ${getV("p", m.bb[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(getV("v",m.bb[0]))}</span><span>${f(getV("v",m.bb[1]))}</span><span>${f(getV("v",m.bb[2]))}</span>`;
        var cel5 = `<span style=" ${getV("p",m.bb[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(m.ss == "ATC"||m.ss == "ATO"?m.ss: getV("p",m.bb[0]))}</span><span>${f(getV("p", m.bb[1]))}</span><span>${f(getV("p",m.bb[2]))}</span>`;
        var cel6 = `<span >${m.s}</span><span>C: ${f(m.c)}</span><span>TC: ${f(m.frTr)}</span>`;
        domElement.querySelector(".dumuaban")
            .innerHTML = showDumua ? `<table><tbody>
		<tr><td style="text-align: left; width: 80px;">${cel1}</td>
		<td style="text-align: center; width: 80px;">${cel2}</td>
		<td style="text-align: right; width: 80px;">${cel3}</td></tr>
		<tr><td style="text-align: left; width: 80px;">${cel4}</td>
		<td style="text-align: center; width: 80px;">${cel5}</td>
		<td style="text-align: right; width: 80px;">${cel6}</td></tr>
		<tr><td style="text-align: left; width: 80px;"><span style="background-color: rgba(255,42,90,.18)">${f(totalM)}</span><span style="background-color: rgba(255,42,90,.18)">${f(m.frBvo)}</span></td>
		<td style="text-align: center; width: 80px;"><span style="background-color: rgba(255,42,90,.18)">Tổng</span><span style="background-color: rgba(255,42,90,.18)">Nước ngoài</span></td>
		<td style="text-align: right; width: 80px;"><span style="background-color: rgba(255,42,90,.18)">${f(totalB)}</span><span style="background-color: rgba(255,42,90,.18)">${f(m.frSvo)}</span></td></tr>
		</tbody></table>` : '';
    }
    async function getData() {
        const url = mastradingviewURL + '?symbol=' + symbolName + '&resolution=1D&from=' + parseInt(Date.parse("2015-01-01") / 1000) + '&to=' + parseInt(Date.parse(getCurrentDate()) / 1000);
        var res = await fetch(url)
        var data = await res.json();
        try {
            var lastTime = ohlc[ohlc.length - 1].time;
            if (lastTime !== void 0) data.t[data.t.length - 1] = lastTime;
        }
        catch (e) {}
        var k = items.type == "index" ? 1 : 1000;
        for (var i = 0; i < data.t.length; i += 1) {
            ohlc.push({
                "time": parseInt(data.t[i]),
                "open": parseFloat(data.o[i]) / k,
                "high": parseFloat(data.h[i]) / k,
                "low": parseFloat(data.l[i]) / k,
                "close": parseFloat(data.c[i]) / k
            });
            volume.push({
                "time": data.t[i],
                "value": parseFloat(data.v[i]),
                "color": getcolor(data.c[i], data.c[i - 1])
            });
            closep.push({
                "time": data.t[i],
                "value": parseFloat(data.c[i]) / k
            });
            change.push({
                "time": data.t[i],
                "value": (parseFloat(data.c[i]) - parseFloat(data.c[i - 1])) / k
            });
            changep.push({
                "time": data.t[i],
                "value": parseFloat(data.c[i]) / parseFloat(data.c[i - 1]) - 1
            });
        }
        ma20 = calculateSMA(closep, 20);
        ma50 = calculateSMA(closep, 50);
        ma150 = calculateSMA(closep, 150);
        ma200 = calculateSMA(closep, 200);
        banker_rsi = calculateRSI(ohlc, 50);
        hot_rsi = calculateRSI(ohlc, 40);
    };
    async function getMarker() {
        try {
            for (var e, t, s = await fetch(briefEventsURL + "?symbol=" + symbolName + "&pageNumber=1&pageSize=50"),
                    r = await s.json(), a = [], i = r.result.items.length, m = 0; m < i; m += 1) e = r.result.items[m].exrightDate ? Date.parse(r.result.items[m].exrightDate) : r.result.items[m].reservedDateFrom ? Date.parse(r.result.items[m].reservedDateFrom) : r.result.items[m].startDate ? Date.parse(r.result.items[m].startDate) : Date.parse(r.result.items[m].issuedDate),
                t = r.result.items[m].exrightDate ? "D" : r.result.items[m].reservedDateFrom ? "N" : r.result.items[m].startDate ? "G" : "P", e < Date.now() && a.push({
                    time: Math.round(e / 1e3),
                    position: "aboveBar",
                    color: "#ff8410",
                    shape: "circle",
                    text: t,
                    id: r.result.items[m].id,
                    eventName: r.result.items[m].eventName
                });
            symbolmarkers = a.filter((e, t) => a.findIndex(t => t.eventName === e.eventName) === t)
                .reverse()
            candleSeries.setMarkers(showMarkers ? symbolmarkers : [])
            return symbolmarkers;
        }
        catch (e) {}
    }

    function isSameDay(e, t) {
        let a = new Date(1e3 * e),
            n = new Date(1e3 * t);
        return a.getDate() === n.getDate() && a.getMonth() === n.getMonth() && a.getFullYear() === n.getFullYear()
    }

    function getSeriesData(e, n) {
        let t = e.findIndex(e => e.time === n);
        return -1 !== t ? e[t] : []
    }
    // Tính RS
    function calculateRS(data) {
        const RS = async (d) => {
            var a = mastradingviewURL + '?symbol=VN-INDEX&resolution=1D&from=' + parseInt(Date.parse("2015-01-01") / 1000) + '&to=' + parseInt(Date.parse(getCurrentDate()) / 1000);
            var b = await fetch(a)
            var c = await b.json();
            var rs = [],
                tmp = [],
                e = d.length - c.t.length;
            for (var i = 0; i < c.t.length; i++) {
                tmp.push({
                    "time": parseInt(c.t[i]),
                    "close": parseFloat(c.c[i])
                });
                try {
                    rs.push({
                        "time": parseInt(c.t[i]),
                        "value": 1000 * d[e + i].close / parseFloat(c.c[i]) || 0.0000001
                    });
                }
                catch (e) {}
            }
            console.log('Beta: ', calculateBeta(data, tmp));
            return rs;
        }
        return RS(data);
    }

    function calculateBeta(mackin, vnindexin) {
        const slope = (e, t) => {
            for (var r = e.length, a = 0, n = 0, h = 0, o = 0, l = 0; l < r; l++) a += t[l],
                n += e[l],
                h += t[l] * e[l], o += t[l] * t[l], e[l] * e[l];
            return (r * h - a * n) / (r * o - a * a)
        }
        let stockPrices = mackin.slice(-250)
            .map(s => s.close);
        let vnIndexPrices = vnindexin.slice(-250)
            .map(s => s.close);
        stockPrices = stockPrices.map((r, c) => {
            if (0 === c) return 0;
            const e = stockPrices[c - 1];
            return (r - e) / e * 100
        });
        vnIndexPrices = vnIndexPrices.map((r, c) => {
            if (0 === c) return 0;
            const e = vnIndexPrices[c - 1];
            return (r - e) / e * 100
        });
        return slope(stockPrices, vnIndexPrices);
    }
    async function getBuySell(s, data) {
        const date = new Date();
        var a = apifialda3 + 'api/services/app/StockInfo/GetTradingChartData?symbol=' + s + '&interval=1d&fromTime=2020-01-01&toTime=' + `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        var b = await fetch(a)
        var c = await b.json();
        var d = data.reverse();
        var bs = [];
        for (var i = 0; i < c.result.length; i++) {
            bs.push({
                "time": d[i].time,
                "value": (c.result[i].buyValue - c.result[i].sellValue) / 1e9,
                "color": d[i].value > 0 ? '#179f89' : '#f55c68'
            });
        }
        return bs.reverse();
    }
    //tính RSI
    function calculateRSI(data, period) {
        var gains = []; // Mảng lưu trữ các giá trị tăng trong mỗi ngày
        var losses = []; // Mảng lưu trữ các giá trị giảm trong mỗi ngày
        var avgGain = 0; // Giá trị trung bình của các giá trị tăng trong period ngày
        var avgLoss = 0; // Giá trị trung bình của các giá trị giảm trong period ngày
        var rs = 0; // Giá trị RS (Relative Strength)
        var rsi = 0; // Giá trị RSI (Relative Strength Index)
        var rsiData = []; // RSI (Relative Strength Index)
        for (var i = 0; i < data.length; i++) {
            if (i == 0) {
                gains.push(0);
                losses.push(0);
            }
            else {
                var change = data[i].close - data[i - 1].close;
                if (change > 0) {
                    gains.push(change);
                    losses.push(0);
                }
                else {
                    losses.push(-change);
                    gains.push(0);
                }
            }
            if (i >= period) {
                if (i == period) {
                    var sumGain = 0;
                    var sumLoss = 0;
                    for (var j = 0; j < period; j++) {
                        sumGain += gains[j];
                        sumLoss += losses[j];
                    }
                    avgGain = sumGain / period;
                    avgLoss = sumLoss / period;
                }
                else {
                    avgGain = (avgGain * (period - 1) + gains[i]) / period;
                    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
                }
                if (avgLoss == 0) {
                    rs = 100;
                }
                else {
                    rs = avgGain / avgLoss;
                }
                rsi = 100 - (100 / (1 + rs));
                rsiData.push({
                    time: data[i].time,
                    value: rsi
                });
            }
        }
        return rsiData;
    }
    // tinh SMA
    function calculateSMA(data, count) {
        var avg = function (data) {
            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                sum += data[i].value;
            }
            return sum / data.length;
        };
        var result = [];
        for (var i = count - 1, len = data.length; i < len; i++) {
            var val = avg(data.slice(i - count + 1, i));
            result.push({
                time: data[i].time,
                value: val
            });
        }
        return result;
    }
    // tính EMA
    function calculateEMA(data, period) {
        const emaData = [];
        emaData.push({
            time: data[period - 1].time,
            value: data[period - 1].value
        });
        const weight = 2 / (period + 1);
        for (let i = period; i < data.length; i++) {
            emaData.push({
                time: data[i].time,
                value: data[i].value * weight + emaData[i - period].value * (1 - weight)
            });
        }
        return emaData;
    }

    function getcolor(t, e) {
        return t > e ? "#62c3b3" : "#f9838c"
    }
}

///----------------///
////-----------------////
function convertNumberToDate(t) {
    const e = new Date(t);
    return `${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()}`
}
// lấy dữ liệu CK từ cafef
function getCafef(n) {
    const t = new Date;
    fetch("https://msh-data.cafef.vn/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: ' query {\n\t\t\ttradingViewData(symbol:"' + n + '", from: "2001-01-01",to:"' + t.toISOString()
                    .split("T")[0] + '") {symbol\nopen\nclose\nhigh\nlow\nvolume\ntime\n}\nisTradeTime}'
            })
        })
        .then(n => n.json())
        .then(n => {
            console.log(n)
        })
}
// lấy danh sách chứng quyền
async function cwinfo() {
    try {
        var a = await fetch("https://apipubaws.tcbs.com.vn/tcbs-hfc-data/v1/cw-info?lang=vi");
        var data = await a.json();
        var cw = data.map((s) => ({
            "keyWord": s.cw + " - " + s.issuer,
            "name": s.cw,
            "className": s.underlyingStock + " - " + s.industry,
            "type": "cw",
            "expireDate": s.expiredDate
        }));
        await chrome.storage.local.get(["key"], async function (r) {
            chrome.storage.local.set({
                'key': r.key.concat(cw)
            });
        });
        console.log("Add CW info!")
        createNotification("Load dữ liệu chứng quyền!")
    }
    catch (e) {
        console.log(e)
    }
}
// thông tin chứng quyền
async function getCWinfos(cw) {
    function dmy(t) {
        const e = new Date(t);
        return `${e.getDate()}-${e.getMonth()+1}-${e.getFullYear()}`
    }
    var t = new Headers;
    let temp = {};
    t.append("Content-Type", "application/json");
    var n = JSON.stringify([{
        symbol: cw
    }]);
    try {
        var a = await fetch("https://fwtapi4.fialda.com/api/services/app/Common/GetCWInfos", {
            method: "POST",
            headers: t,
            body: n
        })
        var b = await a.json();
        var c = b.result[cw];
        if (c) {
            var d = c.BasicInfo
            var f = c.PriceInfo
            temp.contentHtml = `
<p title="${d.name}" style="padding-top:0px;max-width: 400px;margin: auto;">
<span style="color:blue;font-weight:500;">Tên: </span><span style="float:right;font-weight:600">${d.legalName}</span><br/>
<span style="color:blue;font-weight:500;">Mã giao dịch: </span><span style="float:right;">${d.symbol}</span><br/>
<span style="color:blue;font-weight:500;">Sàn:  </span><span style="float:right;">${d.exchange}</span><br/>
<span style="color:blue;font-weight:500;">Tổ chức phát hành:  </span><span style="float:right;"><a style="display: contents;" href="https://cdn.fialda.com${d.documents}" target= _blank>${d.issuer}</a> </span><br/>
<span style="color:blue;font-weight:500;">Giá chứng quyền:  </span><span style="float:right;font-weight:600">${parseFloat(f.closePrice)} <span style = "color: ${f.priceChange < 0 ? "red" : "green"}"> (${changeFormatValue(f.priceChangePercent)}%)</span></span><br/>
<span style="color:blue;font-weight:500;">Giá thực hiện:  </span><span style="float:right;">${null == d.adjExercisePrice ? "0" : formatNumber(d.adjExercisePrice.toFixed(2))}</span><br/>
<span style="color:blue;font-weight:500;">Giá CK cơ sở:  </span><span style="float:right;"> ${f.settlementPrice.toFixed(2)} </span><br/>
<span style="color:blue;font-weight:500;">Tỷ lệ chuyển đổi:  </span><span style="float:right;">${d.adjExerciseRatioText}</span><br/>
<span style="color:blue;font-weight:500;">Điểm hoà vốn:  </span><span style="float:right;"> ${f.breakevenPrice.toFixed(2)} </span><br/>
<span style="color:blue;font-weight:500;">Premium:  </span><span style="float:right;">${(parseFloat(f.breakevenPrice) - parseFloat(f.settlementPrice)).toFixed(2)}</span><br/>
<span style="color:blue;font-weight:500;">%Premium:  </span><span style="float:right;font-weight:600">${(100 *(parseFloat(f.breakevenPrice) / parseFloat(f.settlementPrice) - 1)).toFixed(2)}</span><br/>
<span style="color:blue;font-weight:500;">GTNT </span><span style="float:right;font-weight:600">${(f.settlementPrice-d.adjExercisePrice).toFixed(2)}</span><br/>
<span style="color:blue;font-weight:500;">GTNT/TLCĐ = GTNT/1CW </span><span style="float:right;font-weight:600">${((f.settlementPrice-d.adjExercisePrice)/d.adjExerciseRatio).toFixed(2)}</span><br/>
<span style="color:blue;font-weight:500;">Ngày giao dịch đầu tiên: </span><span style="float:right;">${dmy(d.firstTradingDate)}</span><br/>
<span style="color:blue;font-weight:500;">Ngày Giao dịch cuối cùng: </span><span style="float:right;">${dmy(d.expiryDate)}</span><br/>
</p>`;
            temp.title = d.name;
            createPopup(temp);
        }
    }
    catch (e) {
        console.log(e)
    }
}
//Kéo thả đối tượng
function drageItems(e, xmode = false) {
    var t = document.getElementById(e),
        n = !1,
        offsetX = 10,
        offsetY = 10;
    t.addEventListener("mousedown", function (e) {
        n = !0, offsetX = e.offsetX, offsetY = e.offsetY
    }), document.addEventListener("mousemove", function (e) {
        n && (t.style.top = e.clientY - offsetY + "px", xmode && (t.style.left = e.clientX - offsetX + "px"))
    }), document.addEventListener("mouseup", function (e) {
        n = !1
    })
}
// Tạo thông báo ở góc trái màn hình
function createNotification(message) {
    const notificationID = "f2thongbao"
    const oldPopup = document.getElementById(notificationID);
    if (oldPopup) document.body.removeChild(oldPopup);
    var x = document.createElement("div");
    x.setAttribute("class", "f2notification");
    x.id = notificationID
    x.innerHTML = `<div style="display: flex;align-items: center;">
    <img style="width:50px;position: inherit;margin-right: 10px;" src="${chrome.runtime.getURL("icons/info.png")}">
    <div style="display: contents;padding: 4px;font-size: 16px;">Thông báo</div>
    <br><div style="display: contents;font-size: 14px;">${message} </div></div>`
    document.body.appendChild(x);
    setTimeout(function () {
        x.classList.add('hide')
    }, 5000);
    setTimeout(function () {
        try {
            x.remove()
        }
        catch (e) {}
    }, 10000);
}

// tạo popup hiển thị thông tin
var myPopup, myInterval;

function createPopup(data) {
    myPopup && !myPopup.closed && myPopup.close();
    myPopup = window.open("f2chart-popup", "popup", `width=640,height=500,top=${parseInt((window.screen.height - 500) / 2)},left=${parseInt((window.screen.width - 640) / 2)}`);
    var html = `<html>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <head>
        <title>${data.title}</title>
	<link rel="shortcut icon" type="image/png" href="${chrome.runtime.getURL("../icons/16.png")}"/>
        <link href="${chrome.runtime.getURL("../style/popup.css")}" rel="stylesheet" />
        <link href="${chrome.runtime.getURL("../style/loading.css")}" rel="stylesheet" />
    </head>

    <body>
        <div id="load">
            <div class="loading-container">
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
<div style="float:right;display: flex;margin-right: 20px;">
    <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="font-size" width="0.8em" height="0.8em" fill="currentColor" aria-hidden="true">
        <path d="M920 416H616c-4.4 0-8 3.6-8 8v112c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-56h60v320h-46c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h164c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-46V480h60v56c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V424c0-4.4-3.6-8-8-8zM656 296V168c0-4.4-3.6-8-8-8H104c-4.4 0-8 3.6-8 8v128c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-64h168v560h-92c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-92V232h168v64c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8z"></path>
    </svg>
    <input type="range" min="80" max="160" value="100" id="Range"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="font-size" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M920 416H616c-4.4 0-8 3.6-8 8v112c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-56h60v320h-46c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h164c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-46V480h60v56c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V424c0-4.4-3.6-8-8-8zM656 296V168c0-4.4-3.6-8-8-8H104c-4.4 0-8 3.6-8 8v128c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-64h168v560h-92c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-92V232h168v64c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8z"></path>
    </svg>
</div>
        <div  id="maincontainer" style="padding-left:10px;font-size: 14px;"> ${data.contentHtml} 
        <br />
        <div>${data.source ?"<a href=\""+data.source+"\" target = \"_blank\">Đọc bài gốc tại đây</a>":""}</div>
	</div>

    </body>
</html>`;
    myPopup.document.write(html);
    onImagesLoaded(myPopup.document.body, function() {
        myPopup.document.getElementById("load")
            .innerHTML = "";
        var images = myPopup.document.getElementsByTagName("img");
        for (const image of images) {
            if (image.width < 20 || image.height < 20) {
                image.style.display = "none";
            } else {
                image.setAttribute("style", "max-width:95%;")
                image.setAttribute("align", "middle")
            }
        }
    });
    myPopup.document.querySelector('#load')
        .addEventListener('click', () => {
            myPopup.document.getElementById("load")
                .innerHTML = ""
        })
    myPopup.document.addEventListener("keyup", function(e) {
        27 === e.keyCode && (e.preventDefault(), myPopup.close())
    })
    myPopup.document.querySelector('#Range')
        .addEventListener('click', () => {
            var e = myPopup.document.getElementById("maincontainer");
            k = myPopup.document.getElementById("Range"),
                k.title = k.value + " %",
                e.style.fontSize = k.value + "%"
        })
    clearTimeout(myInterval);
    myPopup.addEventListener("blur", () => {
        myInterval = setTimeout(() => {
            myPopup.close();
        }, 300000);
    });

    function onImagesLoaded(container, event) {
        var images = container.getElementsByTagName("img");
        var loaded = images.length;
        0 == loaded && event();
        for (var i = 0; i < images.length; i++) images[i].complete ? loaded-- : images[i].addEventListener("load", function() {
            loaded--, 0 == loaded && event()
        }), 0 == loaded && event();
    }
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
// mở trang web trong tab riêng
function a(t, w = 900, h = 520) {
    chrome.windows.create({
        url: chrome.runtime.getURL(t),
        width: w,
        height: h,
        type: "popup",
        focused: !0,
        left: parseInt((window.screen.width - w) / 2),
        top: parseInt((window.screen.height - h) / 2)
    })
}