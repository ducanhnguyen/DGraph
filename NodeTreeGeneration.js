/**
 * Thêm con vào parent
 * @param {type} numChild Số lượng con muốn thêm
 * @param {type} parentNode Node cha
 * @returns {undefined}
 */
function iniChild(numChild, parentNode) {
    var WIDTH_CHILD = 20;
    var HEIGHT_CHILD = 20;
    for (i = 0; i < numChild; i++) {
        var nChild = new Node();
        nChild.rectangle = d3.select('body').select('svg').append("rect")
                .attr("x", parseInt(parentNode.rectangle.attr('x')) + WIDTH_CHILD * i + 10)
                .attr("y", parseInt(parentNode.rectangle.attr('y')) + HEIGHT_CHILD * i + 10)
                .attr("width", WIDTH_CHILD)
                .attr("height", HEIGHT_CHILD)
                .style("fill", "blue");
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
    for (i = 0; i < node.children.length; i++) {
        node.children[i].rectangle
                .attr('x', parseInt(node.children[i].rectangle.attr('x')) + deltaX)
                .attr('y', parseInt(node.children[i].rectangle.attr('y')) + deltaY);
    }
}
function updateSizeOfParent(childNode) {
    if (childNode.parent != null) {
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
    }
}
/**
 * Tạo hành vi di chuyển cho một Node
 * @param {type} myNode
 * @returns {undefined}
 */
function drag(myNode) {
    var deltaX, deltaY;
    var dragEvent =
            d3.behavior.drag()
            .on('dragstart', function () {
                /**
                 * Bat toa do click chuot
                 */
                myNode.clickInfor.xClick = parseInt(d3.mouse(this)[0]);
                myNode.clickInfor.yClick = parseInt(d3.mouse(this)[1]);
                /**
                 * Bat toa do doi tuong truoc khi di chuyen
                 */
                myNode.clickInfor.xCurrent = parseInt(myNode.rectangle.attr('x'));
                myNode.clickInfor.yCurrent = parseInt(myNode.rectangle.attr('y'));
            })
            .on('drag', function () {
                var mouseXY = {
                    x: parseInt(d3.mouse(this)[0]),
                    y: parseInt(d3.mouse(this)[1])
                };
                /**
                 * Tinh toan delta can phai di chuyen doi tuong tu vi tri click den vi tri moi
                 */
                deltaX = mouseXY.x - myNode.clickInfor.xClick;
                deltaY = mouseXY.y - myNode.clickInfor.yClick;
                /**
                 * Cap nhat toa do moi cua doi tuong
                 */
                myNode.rectangle.attr('x', myNode.clickInfor.xCurrent + deltaX)
                        .attr('y', myNode.clickInfor.yCurrent + deltaY);
                /**
                 * Cap nhat toa do moi
                 * @returns {undefined}
                 */
                myNode.clickInfor.xCurrent = parseInt(myNode.rectangle.attr('x'));
                myNode.clickInfor.yCurrent = parseInt(myNode.rectangle.attr('y'));
                myNode.clickInfor.xClick = mouseXY.x;
                myNode.clickInfor.yClick = mouseXY.y;
                /**
                 * Di chuyen children
                 * @returns {undefined}
                 */
                updateLocationOfChildren(myNode, deltaX, deltaY);
                /**
                 * Cap nhat parent
                 * @returns {undefined}
                 */
                updateSizeOfParent(myNode);

                /**
                 * Ve quan he phu thuoc
                 * @returns {undefined}
                 */
                createLine(lines);
            })
            .on('dragend', function () {
            });
    myNode.rectangle.call(dragEvent);
}


/**
 * Khởi tạo parent
 * @param {type} parentNode
 * @returns {undefined}
 */
function iniParent(parentNode, x, y) {
    var WIDTH_CHILD = 160;
    var HEIGHT_CHILD = 160;
    var X = x;
    var Y = y;
    parentNode.rectangle = d3.select('body').select('svg').append("rect")
            .attr("x", X)
            .attr("y", Y)
            .attr("width", WIDTH_CHILD)
            .attr("height", HEIGHT_CHILD)
            .style("fill", "purple")
            .on('mouseenter', function () {
                // select element in current context
                d3.select(this)
                        // add transition
                        .transition()
                        // change attribute
                        .style('fill', 'green');
            })
            .on('mouseout', function () {
                // select element in current context
                d3.select(this)
                        // add transition
                        .transition()
                        // change attribute
                        .style('fill', 'purple');
            });
}
function createLine(lines) {
    for (i = 0; i < lines.length; i++) {
        var nBiPhuThuoc = lines[i].biPhuThuoc;
        var nGayPhuThuoc = lines[i].gayPhuThuoc;
        d3.select('body').select('svg').select("line").remove();
        d3.select('body').select('svg').append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .attr("x1", parseInt(nBiPhuThuoc.rectangle.attr('x')) +
                        parseInt(nBiPhuThuoc.rectangle.attr('width')) / 2)     // x position of the first end of the line
                .attr("y1", parseInt(nBiPhuThuoc.rectangle.attr('y')) + parseInt(nBiPhuThuoc.rectangle.attr('height')) / 2)      // y position of the first end of the line
                .attr("x2", parseInt(nGayPhuThuoc.rectangle.attr('x')) + parseInt(nGayPhuThuoc.rectangle.attr('width')) / 2)     // x position of the second end of the line
                .attr("y2", parseInt(nGayPhuThuoc.rectangle.attr('y')) + parseInt(nGayPhuThuoc.rectangle.attr('height')) / 2);
    }
}
//----------------------------------------------------------------------