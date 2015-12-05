function randomInt(bound) {
    if (bound < 0)
        return null;
    return Math.abs(Math.floor(Math.random() * bound));
}
function getName(path) {
    var len = path.length;
    if (len > 8)
        return path.substring(0, 8) + "...";
    else
        return path;
}