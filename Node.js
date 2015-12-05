function Node() {
    this.id = null;
    this.path = null;
    this.clickInfor = {
        xClick: 10,
        yClick: 10,
        xCurrent: 10,
        yCurrent: 10
    };
    this.children = [];
    this.parent = null;
}
/**
 * Lay thong tin ve Node
 * @param {type} node
 * @returns {undefined}
 */
function getX(node) {
    return parseInt(node.rectangle.attr('x'));
}
function getY(node) {
    return parseInt(node.rectangle.attr('y'));
}
function getWidth(node) {
    return parseInt(node.rectangle.attr('width'));
}
function getHeight(node) {
    return parseInt(node.rectangle.attr('height'));
}
/**
 * 
 * @param {type} node
 * @param {type} x
 * @returns {undefined}
 */
function setX(node, x) {
    node.rectangle.attr('x', x);
}
function setY(node, y) {
    node.rectangle.attr('y', y);
}
function setWidth(node, width) {
    node.rectangle.attr('width', width);
}
function setHeight(node, height) {
    node.rectangle.attr('height', height);
}
function setBackground(node, color) {
    node.rectangle.style('fill', color);
}
function setStroke(node, strokeColor) {
    node.rectangle.style('stroke', strokeColor);
}