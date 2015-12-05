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