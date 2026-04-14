// ==UserScript==
// @name         NguonC Movie Iframe Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Chèn iframe xem phim trực tiếp trên nguonc.com
// @author       You
// @match        *://nguonc.com/*
// @match        *://*.nguonc.com/*
// @updateURL    https://vnindex.vercel.app/CCQ/nguonc.user.js
// @downloadURL  https://vnindex.vercel.app/CCQ/nguonc.user.js
// ==/UserScript==

(function () {
    'use strict';

    const idIframe = "movie";
    console.log("chen nguonc userscript.js");

    let interval = setInterval(() => {
        chenIframeMovie();
    }, 1000);

    let tapId = getTapIdFromUrl();
    let oldTitle = document.title;

    function chenIframeMovie() {
        try {
            const movieIframe = document.getElementById(idIframe);
            if (movieIframe) {
                clearInterval(interval);
                return;
            }

            const card = document.querySelector('.card-collapse');
            if (!card) return;

            const iframe = document.createElement('iframe');
            iframe.id = idIframe;
            iframe.width = '100%';
            iframe.height = '480';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.style.display = 'none';

            card.appendChild(iframe);
            console.log("iframe added");

            clearInterval(interval);
        } catch (e) {
            console.error(e);
        }
    }

    function addTapParam(tapId) {
        const url = new URL(window.location.href);
        url.searchParams.set("tap", tapId);
        window.history.pushState({}, "", url);
    }

    function getTapIdFromUrl() {
        const url = new URL(window.location.href);
        return url.searchParams.get("tap");
    }

    document.addEventListener("click", chenIframeMovie);

    const observers = new MutationObserver((mutations, obs) => {
        const iframe = document.querySelector("#" + idIframe);
        const allLink = document.querySelectorAll('a.overflow-hidden');

        if (iframe && allLink.length > 0) {
            allLink.forEach(link => {

                // remove target _blank
                if (link.target) {
                    link.removeAttribute("target");
                    link.style.display = "inline-flex";
                }

                // auto load từ URL ?tap=
                if (tapId && link.innerText.trim() === tapId) {
                    showVideo(link);
                    tapId = null;
                }

                link.addEventListener('click', e => {
                    e.preventDefault();
                    showVideo(link);
                });
            });

            obs.disconnect();
        }
    });

    observers.observe(document.body, { childList: true, subtree: true });

    function showVideo(source) {
        chenIframeMovie();

        const url = source.getAttribute('href');

        document.querySelectorAll('a.overflow-hidden').forEach(a => {
            a.style.background = "";
        });

        source.style.background = "rgb(139 92 246 / 1)";

        const iframe = document.getElementById(idIframe);
        if (!iframe) return;

        if (iframe.src !== url) {
            iframe.src = url;
            iframe.style.display = 'block';

            addTapParam(source.innerText.trim());
            document.title = oldTitle + " - Tập " + source.innerText.trim();
        }

        document.querySelector('.card-collapse')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Hotkey: F fullscreen
    document.addEventListener("keydown", function (e) {
        if (e.key === "f" || e.key === "F") {
            const iframe = document.getElementById(idIframe);
            if (!iframe) return;

            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            }
        }
    });

})();