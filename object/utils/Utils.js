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
 * Reset lại thuộc tính mọi Node về mặc định
 * @param {type} node
 * @returns {undefined}
 */
function resetAttributesOfAllNodes(node) {
    node.rectangle.style("stroke", d3.rgb(230, 153, 0))
            .style("fill", "white");
    for (var i = 0; i < node.children.length; i++)
        resetAttributesOfAllNodes(node.children[i]);
}
/**
 * Hightlight một Node
 * @param {type} node Node cần highlight
 * @returns {undefined}
 */
function hightlightNode(node) {
    node.rectangle.transition()
            .duration(350)
            .style('stroke', d3.rgb(30, 144, 255))
            .style('stroke-width', 2);
    for (i = 0; i < node.children.length; i++)
        node.children[i].rectangle.transition()
                .duration(350)
                .style('stroke', d3.rgb(95, 140, 0))
                .style('fill', d3.rgb(172, 230, 0));
}
