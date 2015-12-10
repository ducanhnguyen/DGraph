function Node() {
    this.id = null; // id cua Node
    this.path = null; // duong dan tuyet doi hoac tuong doi
    this.children = []; // danh sach Nodes con
    this.parent = null; // cha Node
    this.callee = []; // danh sach Node duoc goi
    this.caller = [];// danh sach goi Node
    this.visibility = false; // Node duoc visible hay invisible
    
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
/**
 * 
 */
function moveLeft(node, distance) {
    setX(node, getX(node) - distance);
}
function moveRight(node, distance) {
    setX(node, getX(node) + distance);
}
function moveTop(node, distance) {
    setY(node, getY(node) - distance);
}
function moveBottom(node, distance) {
    setY(node, getY(node) + distance);
}
/**
 * node A co nam ben trai nodeB hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isLeft(nodeA, nodeB) {
    var xA = getX(nodeA), xB = getX(nodeB);
    var widthA = getWidth(nodeA);
    if (xA + widthA <= xB)
        return true;
    return false;
}
/**
 * node A co nam ben phai nodeB hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isRight(nodeA, nodeB) {
    var xA = getX(nodeA), xB = getX(nodeB);
    var widthB = getWidth(nodeB);
    if (xB + widthB <= xA)
        return true;
    return false;
}
/**
 * node A co nam ben tren nodeB hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isTop(nodeA, nodeB) {
    var yA = getY(nodeA), yB = getY(nodeB);
    var heightA = getHeight(nodeA);
    if (yA + heightA <= yB)
        return true;
    return false;
}
/**
 * node A co nam ben duoi nodeB hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isBottom(nodeA, nodeB) {
    var yB = getY(nodeB), yA = getY(nodeA);
    var heightB = getHeight(nodeB);
    if (yB + heightB <= yA)
        return true;
    return false;
}
/**
 * Xac dinh vi tri nodeA so voi nodeB
 */
var LEFT_ONLY = 0, RIGHT_ONLY = 1, TOP_ONLY = 2, BOTTOM_ONLY = 3, LEFT_TOP = 4, LEFT_BOTTOM = 5, RIGHT_TOP = 6, RIGHT_BOTTOM = 7;
function getRelativeLocation(nodeA, nodeB) {
    if (isLeft(nodeA, nodeB)) {
        if (isTop(nodeA, nodeB))
            return LEFT_TOP;
        else if (isBottom(nodeA, nodeB))
            return LEFT_BOTTOM;
        else
            return LEFT_ONLY;
    } else if (isRight(nodeA, nodeB)) {
        if (isTop(nodeA, nodeB))
            return RIGHT_TOP;
        else if (isBottom(nodeA, nodeB))
            return RIGHT_BOTTOM;
        else
            return RIGHT_ONLY;
    } else if (isTop(nodeA, nodeB))
        return TOP_ONLY;
    else
        return BOTTOM_ONLY;
}
/**
 * 
 * @param {type} currentNode
 * @returns {unresolved}
 */
function getRoot(currentNode) {
    if (currentNode.parent != null)
        return getRoot(currentNode.parent);
    else
        return currentNode;
}

/**
 * Disable a Node
 */
function setInvisible(node) {
    node.rectangle.style('visibility', "hidden");
    node.text.style('visibility', "hidden");
    node.visibility = false;
}
function setVisible(node) {
    node.rectangle.style('visibility', "visible");
    node.text.style('visibility', "visible");
    node.visibility = true;
}
/**
 * Enable a Node
 */
function isAvailable(node) {
    console.log(node.visibility);
    if (getX(node) >= 0 && getY(node) >= 0 && node.visibility == true)
        return true;
    return false;
}