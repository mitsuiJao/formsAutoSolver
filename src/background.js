async function fetchImageAsBase64(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        const base64 = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return base64;
    } catch (error) {
        throw new Error(`image fetch error: ${error}`);
    }
}

const API_KEY = ""
const URL = "https://api.openai.com/v1/chat/completions?Content-Type=application/json";

async function openAIreqest(s) {
    let body = {
        model: "gpt-4o-mini",
        store: true,
        messages: [
            { role: "user", content: "" }
        ]
    }
    try {
        body.messages[0].content += s;
        // console.log(body);
        const response = fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + API_KEY
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())

        return response
    } catch (error) {
        console.log("openAI API error");
        throw new Error(`openAI API error: ${error}`);
    }
}

const template1 = "\nPlease answer only the options no matter what. This is because the following programs may not work properly."
const template2 = "\nIf you can answer the question accurately with the above information, please return only the answer."
const template3 = "\n\nHere are your choices:"
const template4 = "\nIf you absolutely cannot answer the question, please return 'null'."
// console.log(request);

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    console.log(request);
    request.forEach(element => {
        let content = element.q;
        if (element.img != null) {
            fetchImageAsBase64(element.img)
                .then(base64 => {
                    content += "\n" + base64 + "\n";
                    if (element.is_text == true) {
                        content += template2 + template4;
                    } else {
                        content += template1 + template4;
                        content += template3 + "\n" + (element.choiceitem).join("\n");
                    }
                    return content;
                })
                .then(content => {
                    console.log(content);
                    return openAIreqest(content);
                })
                .then(res => {
                    console.dir(res, { depth: null });
                    console.log(element.id);
                });
        } else {
            if (element.is_text == true) {
                content += template2 + template4;
            } else {
                content += template1 + template4;
                content += template3 + "\n" + (element.choiceitem).join("\n");
            }
            console.log(content)
            openAIreqest(content)
            .then(res => {
                console.dir(res, { depth: null });
                console.log(element.id);
            });
        }
    });
})