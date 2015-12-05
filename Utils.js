function randomInt(bound) {
    if (bound < 0)
        return null;
    return Math.abs(Math.floor(Math.random() * bound));
}
function getName(path) {
    var elements = path.split(DELIMITER_BETWEEN_COMPONENT_IN_PATH);
    var nameFile = elements[elements.length - 1];
    return nameFile;
}
function getSimplifiedName(path) {  
    var nameFile = getName(path);
    var len = nameFile.length;
    if (len > 8)
        return nameFile.substring(0, 8) + "...";
    else
        return nameFile;
}
/**
 * 
 * @param {type} node
 * @returns {undefined}
 */
function resetAttributesOfAllNodes(node) {
    node.rectangle.style("fill", 'white')
            .style('stroke', 'black')
            .style('stroke-width', 1);
    for (var i = 0; i < node.children.length; i++)
        resetAttributesOfAllNodes(node.children[i]);
}