chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (location.host == "forms.office.com") {
        let container = []
        let imgcontainer = [];
        let textinput = [];

        let elem = document.getElementById("question-list");
        console.log(elem);
        for (let i = 0; i < elem.childNodes.length; i++) {
            let raw;
            const child = elem.childNodes[i];

            const title = child.querySelectorAll("div[data-automation-id='questionTitle'], span[data-automation-id='questionTitle']");
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

            let img = child.querySelector("img[role='img']");
            if (img != null) {
                img = img.getAttribute("src");
            }

            let opt = child.querySelector("input[data-automation-id='textInput']");
            if (opt) {
                textinput.push(true);
            } else {
                textinput.push(false);
            }


            container.push(raw);
            imgcontainer.push(img);
        }
        // console.log(container);
        // console.log(imgcontainer);
        // console.log(textinput);

        let data = [];
        for (let i=0; i < container.length; i++){
            data.push({
                id: i,
                q: container[i],
                img: imgcontainer[i],
                is_text: textinput[i]
            })
        }

        console.log(data);
        chrome.runtime.sendMessage(elem.outerHTML);
    }
    return;
});

