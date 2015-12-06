/**
 * Khởi tạo web page
 * @param {type} myNode
 * @returns {undefined}
 */
function iniWebPage() {
    d3.select('body').append('svg')
            .attr("width", 3000)
            .attr("height", 3000);
}
function updateLocationOfChildren(node, deltaX, deltaY) {
    for (var i = 0; i < node.children.length; i++) {
        node.children[i].rectangle
                .attr('x', getX(node.children[i]) + deltaX)
                .attr('y', getY(node.children[i]) + deltaY);
        updateLocationOfChildren(node.children[i], deltaX, deltaY);
        setTextLocationForNode(node.children[i]);
    }
}
/**
 * Minimum size of parent with border
 * @param {type} childNode mot Node bat ki trong parent
 * @returns {undefined} Parent se bound vua du moi Node trong do, khong tinh border
 */
function packParent(childNode) {
    if (childNode.parent != null) {
        var xMinLeft = 100000, xMaxRight = 0, yMinTop = 100000, yMaxBottom = 0;
        for (i = 0; i < childNode.parent.children.length; i++) {
            var nChild = childNode.parent.children[i];
            var xChild = getX(nChild)
            var yChild = getY(nChild);
            var widthChild = getWidth(nChild);
            var heightChild = getHeight(nChild);

            if (xMinLeft > xChild)
                xMinLeft = xChild;
            if (xMaxRight < xChild + widthChild)
                xMaxRight = xChild + widthChild;
            if (yMinTop > yChild)
                yMinTop = yChild;
            if (yMaxBottom < yChild + heightChild)
                yMaxBottom = yChild + heightChild;
        }
        /**
         * Neu di chuyen goc phan tu I, II
         */
        var parentHeight = getHeight(childNode.parent);
        var parentWidth = getWidth(childNode.parent);
        var xOldParent = getX(childNode.parent) + parentWidth;
        var yOldParent = getY(childNode.parent) + parentHeight;

        childNode.parent.rectangle
                .attr('x', xMinLeft)
                .attr('y', yMinTop)
                .attr('width', parentWidth + (xOldParent - xMinLeft) + (xMaxRight - xOldParent - parentWidth))
                .attr('height', parentHeight + (yOldParent - yMinTop) + (yMaxBottom - yOldParent - parentHeight));
        addBorderForNode(childNode.parent);
        setTextLocationForNode(childNode.parent);
        packParent(childNode.parent);
    }
}
/**
 * 
 * @param {type} node
 * @returns {undefined}
 */
function addBorderForNode(node) {
    if (getX(node) > 0) {
        node.rectangle
                .attr('x', getX(node) - BORDER_OF_NODE.left)
                .attr('y', getY(node) - BORDER_OF_NODE.top)
                .attr('width', getWidth(node) + BORDER_OF_NODE.left + BORDER_OF_NODE.right)
                .attr('height', getHeight(node) + BORDER_OF_NODE.top + BORDER_OF_NODE.bottom);
    }
}
/**
 * Khởi tạo parent
 * @param {type} parentNode
 * @returns {undefined}
 */
function iniRectangleOfNode(parentNode, x, y) {
    var WIDTH_CHILD = 160;
    var HEIGHT_CHILD = 60;

    var X = 0;
    var Y = 0;
    if (typeof (x) === 'undefined')
        X = -1000;
    if (typeof (y) === 'undefined')
        Y = -1000;

    parentNode.rectangle = d3.select('body').select('svg').append("rect")
            .attr("x", X)
            .attr("y", Y)
            .attr("width", WIDTH_CHILD)
            .attr("height", HEIGHT_CHILD)
            .style("stroke", "black")
            .style("fill", "white");
    doubleClick(parentNode);
}
/**
 * 
 * @param {type} node
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
function setDisplayOfText(node) {
    if (getWidth(node) - BORDER_OF_NODE.left - BORDER_OF_NODE.right >= TEXT.DISPLAY_RANGE) {
        node.text.text(getName(node.path));
    } else {
        node.text.text(getSimplifiedName(node.path));
    }
}
function setTextLocationForAllNode(node) {
    node.text.attr("x", getX(node) + TEXT.MARGIN_LEFT)
            .attr("y", getY(node) + TEXT.MARGIN_TOP);
    for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        setTextLocationForAllNode(child);
        setDisplayOfText(child);
    }
}
function setTextLocationForNode(node) {
    node.text.attr("x", getX(node) + 10)
            .attr("y", getY(node) + 10);
    setDisplayOfText(node);
}
/**
 * Ve cac duong phu thuoc giua cac Node
 * @param {type} node
 * @returns {undefined}
 */
function createLine(node) {
//    removeAllLines();
//    var visibleLeafNodes = [];
//    searchVisibleLeaf(node, visibleLeafNodes);
//    console.log('begin create lines');
//    if (visibleLeafNodes.length >= 2)
//        for (i = 0; i < visibleLeafNodes.length - 1; i++)
//            for (j = i + 1; j < visibleLeafNodes.length; j++) {
//                console.log('pair:');
//                console.log(visibleLeafNodes[i]);
//                console.log(visibleLeafNodes[j]);
//                if (isDependencyRelation(visibleLeafNodes[i], visibleLeafNodes[j])) {
//                    console.log('new line');
//                    drawLine(visibleLeafNodes[i], visibleLeafNodes[j]);
//                }
//            }
}
function removeAllLines() {
    d3.select('body').select('svg').selectAll("line").remove();
}
function drawLine(nGayPhuThuoc, nBiPhuThuoc) {
    d3.select('body').select('svg').append("line")
            .style("stroke", "black")
            .attr("x1", getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2)
            .attr("y1", getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2)
            .attr("x2", getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2)
            .attr("y2", getY(nGayPhuThuoc) + getHeight(nBiPhuThuoc) / 2);
}
/**
 *  Get all nodes inside
 * @param {type} node the root of a sub-tree
 * @param {type} listNode an array
 * @returns {undefined}
 */
function getLeafs(node, leafs) {
    for (var i = 0; i < node.children.length; i++) {
        if (node.children[i].children.length == 0)
            leafs.push(node.children[i]);
        else
            getLeafs(node.children[i], leafs);
    }
}
/**
 * NodeA va NodeB co ton tai quan he phu thuoc hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isDependencyRelation(nodeA, nodeB) {
    var leafNodeA = [];
    getLeafs(nodeA, leafNodeA);
    console.log(leafNodeA);

    var leafNodeB = [];
    getLeafs(nodeB, leafNodeB);
    console.log(leafNodeB);

//   drawLine(nodeA, nodeB);
    for (i = 0; i < leafNodeA.length; i++)
        for (j = 0; j < leafNodeB.length; j++) {
            for (k = 0; k < leafNodeA[i].callee.length; k++)
                if (leafNodeA[i].callee[k] == leafNodeB[j]) {
                    console.log('ok');
                    return true;
                }

        }
    return false;
}