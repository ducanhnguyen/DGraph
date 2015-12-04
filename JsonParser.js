var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
function loadFile(path) {
    reader.open('get', path, true);
    reader.onreadystatechange = addFileContentToHtml;
    reader.send(null);
}
function addFileContentToHtml() {
    if (reader.readyState == 4) {
        var el = document.getElementById('main');
        el.innerHTML = reader.responseText;
    }
}