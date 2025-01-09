function fetchImageAsBinaryXHR(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer'; // バイナリ形式で取得
    xhr.onload = function () {
        if (xhr.status === 200) {
            const arrayBuffer = xhr.response;
            const binaryData = new Uint8Array(arrayBuffer);
            callback(null, binaryData);
        } else {
            callback(new Error(`HTTP error! status: ${xhr.status}`));
        }
    };
    xhr.onerror = function () {
        callback(new Error('Network error'));
    };
    xhr.send();
}

// 使用例
fetchImageAsBinaryXHR('https://example.com/image.png', (err, binaryData) => {
    if (err) {
        console.error('Error fetching image:', err);
    } else {
        console.log(binaryData); // Uint8Array形式のバイナリデータ
    }
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (location.host == "forms.office.com"){
        let container = []
        let elem = document.getElementById("question-list");
        console.log(elem);
        for (let i = 0; i < elem.childNodes.length; i++){
            let raw;
            const child = elem.childNodes[i];
            const title = child.querySelectorAll("div[data-automation-id='questionTitle']");
            title.forEach(title => {
                const title2 = title.querySelectorAll(".text-format-content");
                title2.forEach(title2 => {
                    raw = title2.innerText;
                });
            });
            const subtitle = child.querySelectorAll("div[data-automation-id='questionSubTitle']");
            subtitle.forEach(subtitle => {
                const subtitle2 = subtitle.querySelectorAll(".text-format-content");
                subtitle2.forEach(subtitle2 => {
                    raw += "\n" + (subtitle2.innerText).replace(/\n/, "");
                });
            });
            container.push(raw);
        }
        console.log(container)
        chrome.runtime.sendMessage(elem.outerHTML);
    }
    return;
});

