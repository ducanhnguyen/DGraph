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
            if (getX(node.children[i]) < 0)
                displayChildren = false;

        if (!displayChildren) {
            /**
             * Save the current state of parent before changing attributes
             * @type type
             */
            var oldLocationParent = {
                x: getX(node),
                y: getY(node),
                width: getWidth(node),
                height: getHeight(node)
            };
            /**
             * Vi tri các node cùng một cha so với node hiện tại
             * @type Number|Number
             */
            var relativeItem = function (key, relativeLocation) {
                this.key = key;
                this.relativeLocation = relativeLocation;
            }
            var relativeLocationWithNodes = [];
            if (node.parent != null)
                for (var i = 0; i < node.parent.children.length; i++) {
                    var child = node.parent.children[i];
                    if (child != node) {
                        var relativeLocation = getRelativeLocation(child, node);
                        var myRelativeItem = new relativeItem(i, relativeLocation);
                        relativeLocationWithNodes.push(myRelativeItem);
                    }
                }
            console.log(relativeLocationWithNodes);
            /**
             * Display children
             * @type Number
             */
            var DEFAULT_WIDTH_CHILDREN = 40;
            var DEFAULT_HEIGHT_CHILDREN = 40;
            for (i = 0; i < nChildren; i++) {
                node.children[i].rectangle.attr('x', getX(node) + DEFAULT_WIDTH_CHILDREN * (i + 0.5))
                        .attr('y', getY(node) + 20)
                        .attr('width', DEFAULT_WIDTH_CHILDREN)
                        .attr('height', DEFAULT_HEIGHT_CHILDREN)
                        .style('stroke', 'red');
            }
            /**
             * pack parent to minimum size
             */
            for (i = 0; i < nChildren; i++) {
                packParent(node.children[i]);
            }
            /*
             * Expand node to see children if children are hidden
             */
            var newLocationParent = {
                x: getX(node),
                y: getY(node),
                width: getWidth(node),
                height: getHeight(node)
            };
            var expandArea = {
                left: oldLocationParent.x - newLocationParent.x,
                right: (newLocationParent.x + newLocationParent.width) - (oldLocationParent.x + oldLocationParent.width),
                top: oldLocationParent.y - newLocationParent.y,
                bottom: (newLocationParent.y + newLocationParent.height) - (oldLocationParent.y + oldLocationParent.height)
            }
            /**
             * NodeA nam vi tri nhu the nao so voi nodeB
             * @param {type} nodeB
             * @param {type} nodeA
             * @returns {undefined}
             */
            for (var i = 0; i < relativeLocationWithNodes.length; i++) {
                var key = relativeLocationWithNodes[i].key;
                var child = node.parent.children[key];
                var relativeLocation = relativeLocationWithNodes[i].relativeLocation;

                switch (relativeLocation) {
                    case LEFT_ONLY:
                        moveLeft(child, expandArea.left);
                        console.log('left-only');
                        break;
                    case LEFT_BOTTOM:
                        moveLeft(child, expandArea.left);
                        moveBottom(child, expandArea.bottom);
                        console.log('left-bottom');
                        break;
                    case LEFT_TOP:
                        moveLeft(child, expandArea.left);
                        moveTop(child, expandArea.top);
                        console.log('left-top');
                        break;
                    case RIGHT_ONLY:
                        moveRight(child, expandArea.right);
                        console.log('right-only');
                        break;
                    case RIGHT_BOTTOM:
                        moveRight(child, expandArea.right);
                        moveBottom(child, expandArea.bottom);
                        console.log('right-bottom');
                        break;
                    case RIGHT_TOP:
                        moveRight(child, expandArea.right);
                        moveTop(child, expandArea.top);
                        console.log('right-top');
                        break;
                    case TOP_ONLY:
                        moveTop(child, expandArea.top);
                        console.log('top-only');
                        break;
                    case BOTTOM_ONLY:
                        moveBottom(child, expandArea.bottom);
                        console.log('bottom-only');
                        break;
                }
            }
            /**
             * pack parent of this node to minimum size
             */
            for (i = 0; i < node.parent.children.length; i++) {
                packParent(node.parent.children[i]);
            }
        } else {
            /*
             * Collapse node to see children if children are shown
             */
        }
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
