function loadStructureFile(path) {
    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    reader.open('get', path, true);
    reader.onreadystatechange = function () {
        if (reader.readyState == 4) {
            var el = document.getElementById('structure');
            el.innerHTML = reader.responseText;
        }
    }
    reader.send(null);
}
//------------------
function loadDependencyFile(path) {
    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    reader.open('get', path, true);
    reader.onreadystatechange = function () {
        if (reader.readyState == 4) {
            var el = document.getElementById('dependency');
            el.innerHTML = reader.responseText;
        }
    }
    reader.send(null);

}
