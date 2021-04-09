export default function dataURLtoBlob(dataUrl) {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return URL.createObjectURL(new Blob([u8arr], { type: mime }));
}