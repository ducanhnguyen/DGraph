/**
 * Khởi tạo tên một Node
 * @param {type} node Node cần hiển thị tên
 * @returns {undefined}
 */
function iniNameOfNode(node) {
    node.text = d3.select('body').select('svg').append("text")
            .attr("x", getX(node) + TEXT.MARGIN_LEFT)
            .attr("y", getY(node) + TEXT.MARGIN_TOP)
            .text(getName(node.path))
            .style('fill', 'black')
            .style('font-size', TEXT.SIZE_TEXT)
            .style('font-weight', 'bold')
            .style('font-family', 'Arial');
    setDisplayOfText(node);
}
/**
 * Hiển thị đầy đủ tên hay một phần của tên
 * @param {type} node Node cần hiển thị tên
 * @returns {undefined}
 */
function setDisplayOfText(node) {
    if (getWidth(node) - BORDER_OF_NODE.left - BORDER_OF_NODE.right >= TEXT.DISPLAY_RANGE) {
        node.text.text(getName(node.path));
    } else {
        node.text.text(getSimplifiedName(node.path));
    }
}
/**
 * Cập nhật lại tọa độ hiển thị text của các Nodes trong sub-trê
 * @param {type} node Root của sub-trê
 * @returns {undefined}
 */
function setTextLocationForAllNode(node) {
    node.text.attr("x", getX(node) + TEXT.MARGIN_LEFT)
            .attr("y", getY(node) + TEXT.MARGIN_TOP);
    for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        setTextLocationForAllNode(child);
        setDisplayOfText(child);
    }
}
/**
 * Hiển thị tên Node
 * @param {type} node
 * @returns {undefined}
 */
function setTextLocationForNode(node) {
    node.text.attr("x", getX(node) + 10)
            .attr("y", getY(node) + 10);
    setDisplayOfText(node);
}
