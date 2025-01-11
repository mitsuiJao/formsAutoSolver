function sendToContents() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
            JSON.stringify({ from: "popup", contents: null }));
    });
}

// document.getElementById('send').addEventListener('click', sendToContents());
sendToContents()