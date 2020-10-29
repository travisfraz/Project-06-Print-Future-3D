//function to format image binary data for viewing
function arrayBufferToBase64(img) {
    const base64Flag = `data:${img.contentType};base64,`
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(img.data.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    const imageStr = window.btoa(binary);
    return base64Flag + imageStr
}

module.exports = { arrayBufferToBase64 }