const url = "https://lists.office.com/Images/72fe835d-5e95-4512-8ae0-a7b38af25fc8/f2108bb6-80c4-4b7a-b130-8f17174d4994/T1IJ1II0LXSSJHDWMJ3HFJP823/541bb726-a5d7-4e92-8253-d7b6eef91227";
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
        console.error('Failed to fetch and convert image to Base64:', error);
        throw error;
    }
}

fetchImageAsBase64(url)
    .then(base64 => {
        console.log(base64);
    })
    .catch(error => {
        console.error('Error:', error);
    });


chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    console.log(request);

    return true
})
