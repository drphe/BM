
const urlParams = new URLSearchParams(window.location.search)
let s ='ACB';// urlParams.get("q").toUpperCase();
var bctcfile;
var listBCTC = document.getElementById("downloadbctc");
getData();

document.getElementById("getData").addEventListener("click", () => {
    getData()
})
document.getElementById("mack").addEventListener("keyup", function(t) {
    13 === t.keyCode && (t.preventDefault(), getData())
})
document.addEventListener("click", function(e) {
    if (e.target !== listBCTC && e.target.id !== 'download-pdf') {
        listBCTC.setAttribute("style", "display:none!important")
    }
});
document.getElementById("donvi").onchange = getData;
document.getElementById("type").onchange = getData;
document.getElementById("socot").onchange = getData;
document.getElementById("quy").onchange = getData;
document.getElementById('download-pdf').addEventListener('click', () => {linkBCTC(bctcfile)});
document.getElementById('download-text-container').addEventListener('click', () => download_table_as_csv("ket-qua-kinh-doanh"));

function download_table_as_csv(table_id, separator = ',') {
    var symbol = document.getElementById("mack").value
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            data = data.replace(/"/g, '""');
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = '﻿' + csv.join('\n');
    var filename = 'BCTC_'+symbol + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function hightlightCells() {
    const tables = document.querySelector('table');
    const cells = tables.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            const row = cell.parentNode;
            const rowIndex = row.rowIndex;
            const cellIndex = cell.cellIndex;
            for (let i = 0; i < cells.length; i++) {
                const currentRow = cells[i].parentNode;
                const currentRowIndex = currentRow.rowIndex;
                const currentCellIndex = cells[i].cellIndex;
                if (currentRowIndex === rowIndex && Math.abs(currentCellIndex - cellIndex) === 4 && currentCellIndex > 1 && cellIndex > 1) {
                    cells[i].classList.add('highlighted');
                } else {
                    cells[i].classList.remove('highlighted');
                }
            }
            (cellIndex > 1) && cell.classList.add('highlighted');
        });
    });
}
async function getBC() {
    var symbol = document.getElementById("mack").value.toUpperCase().trim()
    var res = await fetch('https://api-finance-t19.24hmoney.vn/v1/web/announcement/financial-report-file?page=1&symbol=' + symbol)
    var data = await res.json()
    bctcfile = data.data;
}

function linkBCTC(g) {
	listBCTC.innerHTML = '';
    g.length && listBCTC.setAttribute("style", "display:block!important")
    for (var i = 0; i < g.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "news-style");
        let a = document.createElement("a");
        a.href = g[i].file_url;
        a.target = '_blank';
        a.innerHTML = g[i].title + '<br/>';
        a.title = g[i].title;
        a.style = 'line-height: 1.5;font-size:14px;';
        div.appendChild(a);
        listBCTC.appendChild(div);
    }
}

async function getData() {
    var unit = document.getElementById("donvi").value
    var symbol = document.getElementById("mack").value
    var socot = document.getElementById("socot").value
    var type = document.getElementById("type").value
    var check = document.getElementById("quy").value
    const now = new Date,
        currentYear = now.getFullYear();
    if (symbol == '') {
        symbol = s, document.getElementById("mack").value = s
    }

//https://www.fireant.vn/api/Data/Finance/LastestFinancialInfo?symbol=DXG  // chỉ số tài chính
// https://www.fireant.vn/api/Data/Finance/YearlyFinancialInfo?symbol=VCB&fromYear=2016&toYear=2019 // chỉ số tài chính theo năm
// https://www.fireant.vn/api/Data/Finance/QuarterlyFinancialInfo?symbol=VCB&fromYear=2020&fromQuarter=1&toYear=2025&toQuarter=4 // theo quý
// báo cáo tài chính 

    var URL = `https://www.fireant.vn/api/Data/Finance/LastestFinancialReports?symbol=${symbol.toUpperCase()}&type=${type}&year=${currentYear+1}&quarter=${check}&count=${socot}`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL, false);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const result = this.responseText;
            const jsonArray = JSON.parse(result);
            if (jsonArray) {
                var table = document.createElement('table');
                table.id = "ket-qua-kinh-doanh"
                for (let i = 0; i < jsonArray.length; i++) {
                    let row = document.createElement('tr');
                    if (i == 0) {
                        //let id = document.createElement('th');
                        //id.textContent = "Mã";
                       // row.appendChild(id);
                        let ten = document.createElement('th');
                        ten.textContent = "Khoản mục";
                        row.appendChild(ten);
                        jsonArray[i].Values.forEach(e => {
                            let cell = document.createElement('th');
                            cell.textContent = e.Period;
                            row.appendChild(cell);
                        })
                    } else {
                        //let id = document.createElement('td');
                        //id.textContent = jsonArray[i].ID;
                        //row.appendChild(id);
                        let ten = document.createElement('td');
                        ten.textContent = jsonArray[i].Name;
                        row.appendChild(ten);
                        jsonArray[i].Values.forEach(e => {
                            let cell = document.createElement('td');
                            cell.textContent = num1(e.Value / unit)
                            row.appendChild(cell);
                        })
                    }
                    table.appendChild(row);
                }
                document.getElementById("data").innerHTML = ''
                document.getElementById("data").appendChild(table);
                (check == 1) && hightlightCells()
            } else {
            }
        }
    }
    xhr.send();
    listBCTC.setAttribute("style", "display:none!important")
    await getBC();
}

function num1(s) {
    return s.toLocaleString('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    })
}