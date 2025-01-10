chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (location.host == "forms.office.com") {
        let container = []
        let imgcontainer = [];
        let textinput = [];
        let choiceitem = [];

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

            const choice = child.querySelectorAll("div[data-automation-id='choiceItem']");
            let choiceitem_forQ = [];
            if (choice != null){
                choice.forEach(choice => {
                    choiceitem_forQ.push(choice.innerText);
                });
            }

            container.push(raw);
            imgcontainer.push(img);
            choiceitem.push(choiceitem_forQ);
        }
        // console.log(container);
        // console.log(imgcontainer);
        // console.log(textinput);

        let data = [];
        for (let i=0; i < container.length; i++){
            data.push({
                id: i+1,
                q: container[i],
                img: imgcontainer[i],
                is_text: textinput[i],
                choiceitem: choiceitem[i]
            })
        }

        console.log(data);
        chrome.runtime.sendMessage(data);
    }
    return;
});

