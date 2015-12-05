/**
 * Thêm con vào parent
 * @param {type} numChild Số lượng con muốn thêm
 * @param {type} parentNode Node cha
 * @returns {undefined}
 */
function iniChild(numChild, parentNode) {
    var WIDTH_CHILD = 50;
    var HEIGHT_CHILD = 10;
    for (i = 0; i < numChild; i++) {
        var nChild = new Node();
        nChild.rectangle = d3.select('body').select('svg').append("rect")
                .attr("x", parseInt(parentNode.rectangle.attr('x')) + WIDTH_CHILD * i + 10)
                .attr("y", parseInt(parentNode.rectangle.attr('y')) + HEIGHT_CHILD * i + 10)
                .attr("width", WIDTH_CHILD)
                .attr("height", HEIGHT_CHILD)
                .style("stroke", "black")
                .style("fill", "white");
        parentNode.children.push(nChild);
        nChild.parent = parentNode;
    }
}
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
//        var row = Math.round(i / Configuration.DISPLAY_CHILDREN_STRATEGY.NUMBER_CHILDREN_IN_ROW);
        node.children[i].rectangle
                .attr('x', parseInt(node.children[i].rectangle.attr('x')) + deltaX)
                .attr('y', parseInt(node.children[i].rectangle.attr('y')) + deltaY);
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
    if (childNode.parent != null)
    {
        var xMinLeft = 100000, xMaxRight = 0, yMinTop = 100000, yMaxBottom = 0;
        for (i = 0; i < childNode.parent.children.length; i++) {
            var nChild = childNode.parent.children[i];
            var xChild = parseInt(nChild.rectangle.attr('x'));
            var yChild = parseInt(nChild.rectangle.attr('y'));
            var widthChild = parseInt(nChild.rectangle.attr('width'));
            var heightChild = parseInt(nChild.rectangle.attr('height'));
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
        var parentHeight = parseInt(childNode.parent.rectangle.attr('height'));
        var parentWidth = parseInt(childNode.parent.rectangle.attr('width'));
        var xOldParent = parseInt(childNode.parent.rectangle.attr('x')) + parentWidth;
        var yOldParent = parseInt(childNode.parent.rectangle.attr('y')) + parentHeight;

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
function addBorderForNode(node) {
    if (node.rectangle.attr('x') > 0) {
        var xNode = parseInt(node.rectangle.attr('x'));
        var yNode = parseInt(node.rectangle.attr('y'));
        var widthNode = parseInt(node.rectangle.attr('width'));
        var heightNode = parseInt(node.rectangle.attr('height'));

        node.rectangle
                .attr('x', xNode - BORDER_OF_NODE.left)
                .attr('y', yNode - BORDER_OF_NODE.top)
                .attr('width', widthNode + BORDER_OF_NODE.left + BORDER_OF_NODE.right)
                .attr('height', heightNode + BORDER_OF_NODE.top + BORDER_OF_NODE.bottom);
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
function createLine(node) {
    if (node.parent == null)//root of tree
        d3.select('body').select('svg').select("line").remove();
    for (i = 0; i < node.callee.length; i++) {
        var nBiPhuThuoc = node.callee[i];
        var nGayPhuThuoc = node;
        if (getX(nBiPhuThuoc) >= 0 && getX(nGayPhuThuoc) >= 0) {
            console.log("----------");
            console.log(nBiPhuThuoc);
            console.log(nGayPhuThuoc);
            d3.select('body').select('svg').append("line")          // attach a line
                    .style("stroke", "black")
                    .attr("x1", getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2)
                    .attr("y1", getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2)
                    .attr("x2", getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2)
                    .attr("y2", getY(nGayPhuThuoc) + getHeight(nBiPhuThuoc) / 2);
        }
    }
    for (var i = 0; i < node.children.length; i++)
        createLine(node.children[i]);
}
//----------------------------------------------------------------------