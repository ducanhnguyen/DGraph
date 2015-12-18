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
    return parseFloat(d3.transform(getGroupElement(node).attr("transform")).translate[0]);
}
function getY(node) {
    return parseFloat(d3.transform(getGroupElement(node).attr("transform")).translate[1]);
}
function getWidth(node) {
    return parseFloat(getChildContainerInSvg(node).attr('width'));
}
function getHeight(node) {
    return parseFloat(getTextContainerInSvg(node).attr('height')) + parseFloat(getChildContainerInSvg(node).attr('height'));
}
function getHeightOfChildContainer(node) {
    return parseFloat(getChildContainerInSvg(node).attr('height'));
}
/**
 * 
 * @param {type} node
 * @param {type} x
 * @returns {undefined}
 */
function setX(node, x) {
    setNodeLocation(node, x, getY(node));
}
function setY(node, y) {
    setNodeLocation(node, getX(node), y);
}
function setWidth(node, width) {
    getChildContainerInSvg(node).attr('width', width);
    getTextContainerInSvg(node).attr('width', width);
}
function setHeight(node, height) {
    getChildContainerInSvg(node).attr('height', height);
}
function setBackground(node, color) {
    getChildContainerInSvg(node).style('fill', color);
}
function setStroke(node, strokeColor) {
    getChildContainerInSvg(node).style('stroke', strokeColor);
}
function moveLeft(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setX(child, getX(child) - distance);
            moveLeft(child, distance)
        }
    });
}
function moveRight(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setX(child, getX(child) + distance);
            moveRight(child, distance);
        }
    });
}
function moveTop(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setY(child, getY(child) - distance);
            moveTop(child, distance);
        }
    });
}
function moveBottom(node, distance) {
    node.children.forEach(function (child) {
        if (isAvailable(child)) {
            setY(child, getY(child) + distance);
            moveBottom(child, distance);
        }
    });
}
/**
 * node A co nam ben trai nodeInforB hay khong
 * @param {type} nodeInforA
 * @param {type} nodeInforB
 * @returns {undefined}
 */
function isLeft(nodeInforA, nodeInforB) {
    var xA = nodeInforA.x, xB = nodeInforB.x;
    var widthA = nodeInforA.width;
    if (xA + widthA <= xB)
        return true;
    return false;
}
/**
 * node A co nam ben phai nodeInforB hay khong
 * @param {type} nodeInforA
 * @param {type} nodeInforB
 * @returns {undefined}
 */
function isRight(nodeInforA, nodeInforB) {
    var xA = nodeInforA.x, xB = nodeInforB.x;
    var widthB = nodeInforB.width;
    if (xB + widthB <= xA)
        return true;
    return false;
}
/**
 * node A co nam ben tren nodeInforB hay khong
 * @param {type} nodeInforA
 * @param {type} nodeInforB
 * @returns {undefined}
 */
function isTop(nodeInforA, nodeInforB) {
    var yA = nodeInforA.y, yB = nodeInforB.y;
    var heightA = nodeInforA.height;
    if (yA + heightA <= yB)
        return true;
    return false;
}
/**
 * node A co nam ben duoi nodeInforB hay khong
 * @param {type} nodeInforA
 * @param {type} nodeInforB
 * @returns {undefined}
 */
function isBottom(nodeInforA, nodeInforB) {
    var yB = nodeInforB.y, yA = nodeInforA.y;
    var heightB = nodeInforB.height;
    if (yB + heightB <= yA)
        return true;
    return false;
}

var LEFT_ONLY = 0, RIGHT_ONLY = 1, TOP_ONLY = 2, BOTTOM_ONLY = 3;
/**
 * Xac dinh vi tri nodeInforA so voi nodeInforB
 */
function getRelativeLocation(nodeInforA, nodeInforB) {
    if (isLeft(nodeInforA, nodeInforB)) {
        return LEFT_ONLY;
    } else if (isRight(nodeInforA, nodeInforB)) {
        return RIGHT_ONLY;
    } else if (isTop(nodeInforA, nodeInforB))
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
    if (node.visibility == true)
        return true;
    return false;
}
//-------------add later
function getNameElement(node) {
    return node.g.select('.name');
}
function getNameInSvg(node) {
    return node.g.name;
}

function getChildContainerElement(node) {
    return node.g.select('.child-container');
}
function getChildContainerInSvg(node) {
    return node.g.childContainer;
}

function getTextContainerElement(node) {
    return node.g.select('.text-container');
}
function getTextContainerInSvg(node) {
    return node.g.textContainer;
}

function getStateElement(node) {
    return node.g.select('.state');
}
function getStateInSvg(node) {
    return node.g.state;
}

function getGroupElement(node) {
    return node.g;
}
function setNodeLocation(node, x, y) {
    getGroupElement(node).attr('transform', 'translate(' + x + ',' + y + ')');
}