const API_KEY = "APIKEY"
const URL = "https://api.openai.com/v1/chat/completions?Content-Type=application/json";
body = {
    "model": "gpt-4o",
    "store": true,
    "messages": [
        { "role": "user", "content": "Use the following to answer the questions:\\nChoose the best answer to complete the sentence or conversation.\\nEver since the city hired the new police chief, the ____ in our city has been dropping.\\n\\ncrime rate\\npedestrians\\nvehicle traffic\\n" }
    ]
}

fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+API_KEY
    },
    body: JSON.stringify(body)
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });  