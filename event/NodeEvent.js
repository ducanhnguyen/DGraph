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
                resetAttributesOfAllNodes(getRoot(myNode));
                hightLightNode(myNode);
                /**
                 * Bat toa do click chuot
                 */
                myNode.clickInfor.xClick = parseInt(d3.mouse(this)[0]);
                myNode.clickInfor.yClick = parseInt(d3.mouse(this)[1]);
                /**
                 * Bat toa do doi tuong truoc khi di chuyen
                 */
                myNode.clickInfor.xCurrent = getX(myNode);
                myNode.clickInfor.yCurrent = getY(myNode);
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
                myNode.clickInfor.xCurrent = getX(myNode);
                myNode.clickInfor.yCurrent = getY(myNode);
                myNode.clickInfor.xClick = mouseXY.x;
                myNode.clickInfor.yClick = mouseXY.y;

                updateLocationOfChildren(myNode, deltaX, deltaY);
                pack(myNode.parent);
                createLine(dependencies);
                setTextLocationForNode(myNode);
            })
            .on('dragend', function () {
            });
    myNode.rectangle.call(dragEvent);
}
function doubleClick(node) {
    node.rectangle.on('dblclick', function () {
        resetAttributesOfAllNodes(getRoot(node));
        hightLightNode(node);
        /**
         * Check the status of node
         */
        var displayChildren = true;
        node.children.forEach(function (childNode) {
            if (!isAvailable(childNode))
                displayChildren = false;
        });
        if (!displayChildren) {
            calculateLocationOfChildren(node, CHILDREN_DISPLAY_STRATEGY.IN_ROWS);
            node.children.forEach(function (childNode) {
                setVisible(childNode);
            });
            pack(node);
        } else {
            /*
             * Collapse node to see children if children are shown
             */
            var nodes = [];
            searchAllNodes(node, nodes);
            nodes.forEach(function (childNode) {
                setInvisible(childNode);
            });
            pack(node);
        }
        /**
         * Cap nhat lai danh sach phu thuoc
         * @type Array
         */
        console.log("double click");
        console.log(dependencies);
        dependencies.list = [];
        updateDependency(getRoot(node), dependencies);
        console.log("DANH SACH PHU THUOC");
        console.log(dependencies);
        createLine(dependencies);
    }
    );
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseEnter(node) {
    node.rectangle.on('mouseenter', function () {
        // select element in current context
//        d3.select(this)
//                // add transition
//                .transition()
//                .duration(350)
//                .style("fill", d3.rgb(250, 248, 245))
//                .style('stroke', 'red')
//                .style('stroke-width', 5)
//                .style('stroke-width', 3);
    });
}
/**
 * When mouse out a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseOut(node) {
    node.rectangle.on('mouseout', function () {
        // select element in current context
//        d3.select(this)
//                // add transition
//                .transition()
//                // change attribute
//                .style('stroke', 'black')
//                .style('stroke-width', 1);
    });
}
function hightLightNode(node) {
    node.rectangle.transition()
            .duration(350)
            .style("fill", d3.rgb(80, 157, 43))
            .style('stroke', 'red')
            .style('stroke-width', 5)
            .style('stroke-width', 3);
    for (i = 0; i < node.children.length; i++)
        node.children[i].rectangle.transition()
                .duration(750)
                .style('stroke', 'blue')
                .style('stroke-width', 2);
}
