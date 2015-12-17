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
    return parseInt(node.g.select('.container').attr('x'));
}
function getY(node) {
    return parseInt(node.g.select('.container').attr('y'));
}
function getWidth(node) {
    return parseInt(node.g.select('.container').attr('width'));
}
function getHeight(node) {
    return parseInt(node.g.select('.container').attr('height'));
}
/**
 * 
 * @param {type} node
 * @param {type} x
 * @returns {undefined}
 */
function setX(node, x) {
    node.rectangle.attr('x', x);
    node.text.attr('x', x + TEXT.MARGIN_LEFT);
//    pack(node);
}
function setY(node, y) {
    node.rectangle.attr('y', y);
    node.text.attr('y', y + TEXT.MARGIN_TOP);
//    pack(node);
}
function setWidth(node, width) {
    node.rectangle.attr('width', width);
//    pack(node);
}
function setHeight(node, height) {
    node.rectangle.attr('height', height);
//    pack(node);
}
function setBackground(node, color) {
    node.rectangle.style('fill', color);
}
function setStroke(node, strokeColor) {
    node.rectangle.style('stroke', strokeColor);
}
function moveLeft(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setX(child, getX(child) - distance);
            moveLeft(child, distance)
        }
    });

    pack(node);
}
function moveRight(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setX(child, getX(child) + distance);
            moveRight(child, distance);
        }
    });
    pack(node);
}
function moveTop(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setY(child, getY(child) - distance);
            moveTop(child, distance);
        }
    });

    pack(node);
}
function moveBottom(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setY(child, getY(child) + distance);
            moveBottom(child, distance);
        }
    });

    pack(node);
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
    if (xA + widthA < xB)
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
    if (xB + widthB < xA)
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
    if (yA + heightA < yB)
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
    if (yB + heightB < yA)
        return true;
    return false;
}

var LEFT_ONLY = 0, RIGHT_ONLY = 1, TOP_ONLY = 2, BOTTOM_ONLY = 3;
/**
 * Xac dinh vi tri nodeA so voi nodeB
 */
function getRelativeLocation(nodeA, nodeB) {
    if (isLeft(nodeA, nodeB)) {
            return LEFT_ONLY;
    } else if (isRight(nodeA, nodeB)) {
            return RIGHT_ONLY;
    } else if (isTop(nodeA, nodeB))
        return TOP_ONLY;
    else
        return BOTTOM_ONLY;
}
/**
 * Lấy root của cây Node
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
    getNameElement(node).style('visibility', 'hidden');
    getChildContainerElement(node).style('visibility', 'hidden');
    getTextContainerElement(node).style('visibility', 'hidden');
    getStateElement(node).style('visibility', 'hidden');
    node.visibility = false;
}
function setVisible(node) {
     getNameElement(node).style('visibility', 'visible');
    getChildContainerElement(node).style('visibility', 'visible');
    getTextContainerElement(node).style('visibility', 'visible');
    getStateElement(node).style('visibility', 'visible');
    node.visibility = true;
}
/**
 * Enable a Node
 */
function isAvailable(node) {
    if (getX(node) >= 0 && getY(node) >= 0 && node.visibility == true)
        return true;
    return false;
}
//-------------add later
function getNameElement(node){
    return node.g.select('.name');
}
function getChildContainerElement(node){
    return node.g.select('.child-container');
}
function getTextContainerElement(node){
    return node.g.select('.text-container');
}
function getStateElement(node){
    return node.g.select('.state');
}