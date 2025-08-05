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
          messages.week15 = `${results.week15} : <span class="tb">+${percent.toFixed(2)}%</span>`;
          passed = true;
        }
        if (deltaDays <= 14 && percent > 20) {
          messages.twoWeek20 = `${results.twoWeek20} : <span class="tb">+${percent.toFixed(2)}%</span>`;
          passed = true;
        }
        if (deltaDays <= 30 && percent >= 30 ) {
          messages.month30_50 = `${results.month30_50} :<span class="tb"> +${percent.toFixed(2)}%</span>`;
          passed = true;
        }
      }

      return passed ? Object.values(messages) : [];
    }

        function calculateMA(data, period) {
            return data.map((_, index) => {
                if (index < period - 1) return null;
                const slice = data.slice(index - period + 1, index + 1);
                const average = slice.reduce((sum, val) => sum + val, 0) / period;
                return average;
            });
        }
        function formatTimestamp(timestamp) {
            // Chuyển đổi timestamp (giây) sang milliseconds
            const date = new Date(timestamp * 1000);

            // Lấy ngày, tháng và năm
            const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo 2 chữ số
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = String(date.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm

            // Trả về định dạng dd/mm/yy
            return `${day}/${month}/${year}`;
        }
	
	var ckht='';
        function findRecoveries(data) {
            const results = [];
            var ab = data.map(s => s.value);
            var ma10 = calculateMA(ab, 20); // tính MA10
            let peak = data[0].value; // Giá đỉnh ban đầu
            let tpeak = data[0].time; // Giá đỉnh ban đầu
            let trough = data[0].value; // Giá đáy ban đầu
            let ttrough = data[0].time; // Giá đáy ban đầu
            let inDecline = false; // Trạng thái đang sụt giảm, mặc định là không
            for (let i = 1; i < data.length; i++) {
                if (!inDecline) { // đang tăng
                    if (data[i].value < peak) { // Bắt đầu sụt giảm
                        inDecline = true;
                        trough = data[i].value;
                        ttrough = data[i].time;
                    } else {
                        peak = data[i].value; // Cập nhật đỉnh nếu vẫn tăng
                        tpeak = data[i].time;
                        inDecline = false;
                    }
                } else { // đang giảm 
                    if (trough > data[i].value) {
                        trough = data[i].value; // Cập nhật đáy nếu vẫn giảm
                        ttrough = data[i].time
                        inDecline = true;
                    } else {
                        if (data[i].value > peak) {
                            peak = data[i].value; // Cập nhật đỉnh nếu giá hồi vượt đỉnh (không có đợt giảm sâu)
                            tpeak = data[i].time;
                            inDecline = false;
                        } else {
                            // điều kiện xác nhận hồi phục khi đáy ở dưới ma20 và giá hồi phục vượt được ma20
                            if (data[i].value > ma10[i] && trough < ma10[i]) { // giá vượt ngưỡng  phục hồi hoặc vượt MA20
                                const recoveryDate = data[i].time; // Thời điểm hồi phục
                                results.push({
                                    drawdown: (1 - trough / peak) * 100,
                                    start: peak,
                                    startDate: formatTimestamp(tpeak),
                                    bottom: trough,
                                    bottomDate: formatTimestamp(ttrough),
                                    recoveryDate: formatTimestamp(recoveryDate),
                                    recoveryPrice: data[i].value,
                                    recover: 0,
                                });
                                inDecline = false; // Xác nhận hồi phục
                                peak = data[i].value; // Reset đỉnh
                                tpeak = data[i].time; // Reset đỉnh
                            } else {
                                // chưa xác nhận đã hồi phục, tiếp tục giảm
                                inDecline = true;
                            }
                        }
                    }
                }
            }
            // lọc các đợt drawdown <2% do sideway nằm trong biên độ nhỏ
            const output = results.filter(item => item.drawdown > 2);
            // tính mức hồi phục bằng đỉnh mới- đáy cũ
            for (i = 0; i < output.length - 1; i++) {
                output[i].recover = 100 * output[i + 1].start / output[i].bottom - 100;
            }
            output[output.length - 1].recover = 100 * peak / output[output.length - 1].bottom - 100; // tính mức recover

            ckht = ''; //reset ckht;
	    let temp ='';
	    // kiểm tra giá trị mới nhất và đáy
            if (data[data.length - 1].value > trough) {
                temp= `Đã hồi phục từ ngày ${formatTimestamp(ttrough)}:<span class="tb"> ${((data[data.length-1].value/trough-1)*100).toFixed(2)}%</span>. `;
            }else {
                temp= `Đã tăng từ đáy ${output[output.length-1].bottomDate}: <span class="tb">${output[output.length-1].recover.toFixed(2)}%</span>.`;
	    }

            if (data[data.length - 1].value * 1.02 < peak) {
                let gg = ((1 - data[data.length - 1].value / peak) * 100).toFixed(2);
                ckht += ` <span title="Đang hồi phục sau chiết khấu">HIỆN TẠI</span> đang chiết khấu từ đỉnh ${formatTimestamp(tpeak)}: <span class="tb" >${gg}% </span>.${temp}<br/>${predict(output, gg)}`;
            } else {
                let gg = output[output.length - 1].drawdown.toFixed(2);
		temp= ` Đã tăng từ đáy ${results[results.length-1].bottomDate}: <span class="tb">${results[results.length-1].recover.toFixed(2)}</span>%.`;
                ckht += `Mức chiết khấu của <span title="Đang xu hướng tăng hoặc đi ngang" đỉnh gần nhất </span>${output[output.length-1].startDate}: <span class="tb" >${gg}%</span>.${temp}<br/>${predict(output, gg)}`;
            }

            return output;
        }

        function calculateConfidenceInterval(data) {
            if (data.length === 0) return null; // Kiểm tra nếu mảng trống

            const n = data.length;
            const mean = data.reduce((sum, value) => sum + value, 0) / n;

            // Tính độ lệch chuẩn
            const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (n - 1);
            const standardDeviation = Math.sqrt(variance);

            // Sai số chuẩn
            const standardError = standardDeviation / Math.sqrt(n);

            // Giá trị Z cho mức tin cậy 95%
            const zScore = 1.96;

            // Khoảng tin cậy
            const marginOfError = zScore * standardError;
            const lowerBound = mean - marginOfError;
            const upperBound = mean + marginOfError;

            return {
                mean,
                lowerBound,
                upperBound,
                standardDeviation,
                marginOfError,
                n
            };
        }
        // vẽ bảng
function renderResults(results) {
    results.reverse();
    let table = `<h3>📊 Bảng tổng hợp các đợt điều chỉnh/hồi phục</h3><table id="resultsTable" style="height:230px; overflow:auto;">
        <thead>
            <tr>
                <th>Tạo đỉnh</th>
                <th>Giá</th>
                <th>Tạo đáy</th>
                <th>Giá</th>
                <th>Chiết khấu</th>
                <th>Hồi phục</th>
            </tr>
        </thead>
        <tbody>`;

    results.forEach(result => {
        table += `<tr>
            <td>${result.startDate}</td>
            <td>${result.start.toFixed(0)}</td>
            <td>${result.bottomDate}</td>
            <td>${result.bottom.toFixed(0)}</td>
            <td>${result.drawdown.toFixed(2)} %</td>
            <td>${result.recover.toFixed(2)} %</td>
        </tr>`;
    });

    table += `</tbody></table>`;
    return table;

}
    
function showDiscount(symbol, data) {
// tính toán drawdown
                var drawdown = findRecoveries(data);

                var sampleData = [],
                    sampleData2 = [];
                for (let i = 1; i < drawdown.length; i++) {
                    sampleData.push(drawdown[i].drawdown)
                    sampleData2.push(drawdown[i].recover)
                }
                const ci = calculateConfidenceInterval(sampleData);
                const ci2 = calculateConfidenceInterval(sampleData2);

                let table = renderResults(drawdown.slice(-20)); // bảng dữ liệu
                const mockResult = `Mức chiết khấu trung bình là <span class="tb">${ci.mean.toFixed(2)}%  [${ci.lowerBound.toFixed(2)}, ${ci.upperBound.toFixed(2)}]</span>. Mức hồi phục trung bình là <span class="tb">${ci2.mean.toFixed(2)}% [${ci2.lowerBound.toFixed(2)}, ${ci2.upperBound.toFixed(2)}]</span><br/> ${ckht}<br/>${table}`;

// tính phiên chạy nước rút
     const resultMe = checkLatestGrowth(data);
    var iframeHtml = ``;
	if (resultMe.length > 0) {
        	iframeHtml += `<h3>📊 Chú ý phiên chạy nước rút</h3><ul style="text-align:left;">` + resultMe.map(msg => `<li>${msg}</li>`).join('') + `</ul><br/>`;
    	}

    iframeHtml += `<h3>📊 Các đợt điều chỉnh và mức chiết khấu</h3> `+ mockResult;

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

        //Dự báo
        function predict(data, dropValue) {
            // Tính toán hồi quy tuyến tính
            function calculateRegression(data) {
                const n = data.length;
                // Tính trung bình của x (drop) và y (recovery)
                const meanX = data.reduce((sum, point) => sum + point.drawdown, 0) / n;
                const meanY = data.reduce((sum, point) => sum + point.recover, 0) / n;

                // Tính Covariance và Variance
                let covariance = 0;
                let varianceX = 0;

                data.forEach(point => {
                    covariance += (point.drawdown - meanX) * (point.recover - meanY);
                    varianceX += Math.pow(point.drawdown - meanX, 2);
                });

                // Tính slope (a) và intercept (b)
                const slope = covariance / varianceX;
                const intercept = meanY - slope * meanX;

                return {
                    slope,
                    intercept
                };
            }

            // Dự báo mức hồi phục
            function predictRecovery(drop, model) {
                const {
                    slope,
                    intercept
                } = model;
                return slope * drop + intercept;
            }

            // Xây dựng mô hình hồi quy
            const model = calculateRegression(data);

            // Chuẩn bị dữ liệu cho biểu đồ
            const scatterData = data.map(point => ({
                x: point.drawdown,
                y: point.recover
            }));
            const regressionLine = [];
            for (let x = Math.min(...data.map(d => d.drawdown)) - 0; x <= Math.max(...data.map(d => d.drawdown)) + 5; x += 1) {
                regressionLine.push({
                    x: x,
                    y: predictRecovery(x, model)
                });
            }

            function findRecoveryLevel(recoveryArray) {
                recoveryArray = recoveryArray.filter(obj => obj.drawdown >= dropValue);
                recoveryArray.sort((a, b) => a.recover - b.recover);
                const index = Math.ceil(recoveryArray.length * 0.1);
                //console.log(recoveryArray, index)
                return recoveryArray[index];
            }
            let probabilitys = findRecoveryLevel(data).recover

        function calculateCorrelation(x, y) {
            const n = x.length;
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
            const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
            const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
            const numerator = (n * sumXY) - (sumX * sumY);
            const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
            return numerator / denominator;
        }
        function linearRegression(x, y) {
            const n = x.length;
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
            const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            return {
                slope,
                intercept
            };
        }

        function tTestCorrelation(r, n) {
            const t = r * Math.sqrt((n - 2) / (1 - r * r));
            return t;
        }

        function isSignificant(tValue, df, alpha = 0.05) {
            const criticalValue = 2.306;
            return Math.abs(tValue) > criticalValue ? 'có' : 'không';
        }
            // tương quan
            const dropLevels = data.map(d => d.drawdown);
            const recoveryLevels = data.map(d => d.recover);

            const correlation = calculateCorrelation(dropLevels, recoveryLevels);
            const regression = linearRegression(dropLevels, recoveryLevels);
            const tValue = tTestCorrelation(correlation, dropLevels.length);
            const df = dropLevels.length - 2;
            const significant = isSignificant(tValue, df);

            return `<i>Mức hồi phục dự báo là:<span class="tb"> ${probabilitys.toFixed(2)}% </span>(xs 90%)</i><br/>------<br/>Hệ số tương quan: ${correlation.toFixed(2)}. Hệ số hồi quy: Slope = ${regression.slope.toFixed(2)}, Intercept = ${regression.intercept.toFixed(2)}<br>Giá trị t: ${tValue.toFixed(2)}, Mối tương quan ${significant} ý nghĩa thống kê.<br/>`;
        }
