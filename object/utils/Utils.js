function randomInt(bound) {
    if (bound < 0)
        return null;
    return Math.abs(Math.floor(Math.random() * bound));
}
function getNameFromPath(path) {
    var elements = path.split(DELIMITER_BETWEEN_COMPONENT_IN_PATH);
    var nameFile = elements[elements.length - 1];
    return nameFile;
}
function getSimplifiedName(path) {
    var nameFile = getName(path);
    var len = nameFile.length;
    if (len > 8)
        return nameFile.substring(0, 8) + '...';
    else
        return nameFile;
}

/**
 * Di chuyển một Node
 * @param {type} node
 * @param {type} deltaX
 * @param {type} deltaY
 * @returns {undefined}
 */
function moveNode(node, deltaX, deltaY) {
    node.rectangle.attr('x', getX(node) + deltaX)
            .attr('y', getY(node) + deltaY);
    node.text.attr('x',parseInt(node.text.attr('x')) + deltaX)
            .attr('y',parseInt(node.text.attr('y')) + deltaY);
    node.children.forEach(function (child){
       if (isAvailable(child)) 
            moveNode(child, deltaX, deltaY);
    });
}