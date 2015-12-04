var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
function loadFile(path) {
    reader.open('get', path, true);
    reader.onreadystatechange = displayContents;
    reader.send(null);
}
function displayContents() {
    if (reader.readyState == 4) {
        var el = document.getElementById('main');
        el.innerHTML = reader.responseText;
    }
}
loadFile("jsonForMai2.json");
displayContents();
setTimeout(function () {
    var content = document.getElementById('main').innerHTML;
    var jsonObject = JSON.parse(content);
    console.log(jsonObject);
}, 0);