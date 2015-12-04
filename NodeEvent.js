/**
 * Tạo hành vi di chuyển cho một Node
 * @param {type} myNode
 * @returns {undefined}
 */
function drag(myNode, lines) {
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
                packParent(myNode);
                addBorderForNode(myNode.parent);
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
function doubleClick(node) {
    node.rectangle.on('dblclick', function () {
        /**
         * Check the status of node
         */
        var displayChildren = true;
        var nChildren = node.children.length;
        for (i = 0; i < nChildren; i++)
            if (node.children[i].rectangle.attr('x') < 0)
                displayChildren = false;

        if (!displayChildren) {
            var xParent = parseInt(node.rectangle.attr('x'));
            var yParent = parseInt(node.rectangle.attr('y'));

            var DEFAULT_WIDTH_CHILDREN = 40;
            var DEFAULT_HEIGHT_CHILDREN = 40;

            node.rectangle.style('stroke', 'blue');
            for (i = 0; i < nChildren; i++) {
                node.children[i].rectangle.attr('x', xParent + DEFAULT_WIDTH_CHILDREN * (i + 0.5))
                        .attr('y', yParent + 20)
                        .attr('width', DEFAULT_WIDTH_CHILDREN)
                        .attr('height', DEFAULT_HEIGHT_CHILDREN)
                        .style('stroke', 'red');
            } 
           
            for (i = 0; i < nChildren; i++){
                packParent(node.children[i]);
            }
             addBorderForNode(node);
             packParent(node);
              addBorderForNode(node.parent);
            /*
             * Expand node to see children if children are hidden
             */
        } else {
            /*
             * Collapse node to see children if children are shown
             */
        }
    });
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseEnter(node) {
    node.rectangle.on('mouseenter', function () {
        // select element in current context
        d3.select(this)
                // add transition
                .transition()
                // change attribute
                .style('stroke', 'red');
    });
//    for (var i = 0; i < node.children.length; i++) {
//        var rect = node.children[i].rectangle;
//        rect.on('mouseenter', function () {
//            // select element in current context
//            d3.select(this)
//                    // add transition
//                    .transition()
//                    // change attribute
//                    .style('fill', 'blue');
//        });
//    }
}
/**
 * When mouse out a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseOut(node) {
    node.rectangle.on('mouseout', function () {
        // select element in current context
        d3.select(this)
                // add transition
                .transition()
                // change attribute
                .style('stroke', 'black');
    });
//    for (i = 0; i < node.children.length; i++)
//        node.children[i].rectangle.on('mouseout', function () {
//            // select element in current context
//            d3.select(this)
//                    // add transition
//                    .transition()
//                    // change attribute
//                    .style('stroke', 'black');
//        });
}
