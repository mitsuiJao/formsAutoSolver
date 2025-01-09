function sendToContents() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
            JSON.stringify({ contents: "from popup" }),
            function (response) {
            });
    });
}

document.getElementById('send').addEventListener('click', sendToContents());