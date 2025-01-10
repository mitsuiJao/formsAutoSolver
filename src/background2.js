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

// fetchImageAsBase64(url)
//     .then(base64 => {
//         console.log(base64);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

const API_KEY = "APIKEY"
const URL = "https://api.openai.com/v1/chat/completions?Content-Type=application/json";
body = {
    "model": "gpt-4o",
    "store": true,
    "messages": [
        { "role": "user", "content": "" }
    ]
}

async function openAIreqest(body) {
    try {
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

const template1 = "Please answer using only the options"
const template2 = "If you can answer the question accurately with the above information, please return only the answer. If you absolutely cannot answer the question, please return 'null'."
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    console.log(request);
    request.forEach(element => {
        let content = element.q;
        if (element.img != null) {
            fetchImageAsBase64(element.url)
                .then(base64 => {
                    content += base64;
                    if (element.is_text == true){
                        content += "\n" + template2;
                    } else {
                        content += "\n" + template1;
                        content += "\n\n" + (element.choiceitem).join("\n");
                    }
                    return content;
                })
                .then(content => {
                    return openAIreqest(content);
                })
                .then(res => console.log(res));
        } else {
            if (element.is_text == true){
                content += "\n" + template2;
            } else {
                content += template1;
                content += "\n\n" + (element.choiceitem).join("\n");
            }
            openAIreqest(content)
                .then(res => console.log(res));
        }
    });

    return true
})
