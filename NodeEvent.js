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
                
                createLine(getRoot(myNode));
                /**
                 * Move text
                 * @returns {undefined}
                 */
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
             * Clone node
             * @param {type} currentNode
             * @returns {type}
             */
            var oldNode = new Node();
            oldNode.rectangle = d3.select('body').select('svg').append("rect")
                    .attr('x', getX(node))
                    .attr('y', getY(node))
                    .attr('width', getWidth(node))
                    .attr('height', getHeight(node))
                    .style('visibility', "hidden");
            /**
             * Display children
             * @type Number
             */
            for (i = 0; i < nChildren; i++) {
                node.children[i].rectangle.attr('x', getX(node) +
                        DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN * i + randomInt(10))
                        .attr('y', getY(node) + randomInt(70))
                        .attr('width', DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN)
                        .attr('height', DISPLAY_CHILDREN_STRATEGY.DEFAULT_HEIGHT_CHILDREN);
                setTextLocationForNode(node.children[i]);
            }
            /**
             * pack parent to minimum size
             */
            packParent(node.children[0]);
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
             * (fix later)
             * update location of others
             * @param {type} node
             * @returns {undefined}
             */
            function expandAllNodes(root, oldNode, newNode) {
                if (root != newNode)
                    for (var i = 0; i < root.children.length; i++) {
                        var child = root.children[i];
                        var relativeLocation = getRelativeLocation(child, oldNode);
                        switch (relativeLocation) {
                            case LEFT_ONLY:
                                moveLeft(child, expandArea.left);
                                break;
                            case LEFT_BOTTOM:
                                moveLeft(child, expandArea.left);
                                moveBottom(child, expandArea.bottom);
                                break;
                            case LEFT_TOP:
                                moveLeft(child, expandArea.left);
                                moveTop(child, expandArea.top);
                                break;
                            case RIGHT_ONLY:
                                moveRight(child, expandArea.right);
                                break;
                            case RIGHT_BOTTOM:
                                moveRight(child, expandArea.right);
                                moveBottom(child, expandArea.bottom);
                                break;
                            case RIGHT_TOP:
                                moveRight(child, expandArea.right);
                                moveTop(child, expandArea.top);
                                break;
                            case TOP_ONLY:
                                moveTop(child, expandArea.top);
                                break;
                            case BOTTOM_ONLY:
                                moveBottom(child, expandArea.bottom);
                                break;
                        }
                        expandAllNodes(child, oldNode, newNode);
                    }
            }
            /**
             * pack parent of this node to minimum size
             */
            if (node.parent != null) {
                for (i = 0; i < node.parent.children.length; i++) {
                    packParent(node.parent.children[i]);
                }
            }
            
            createLine(getRoot(node));
//            var root = getRoot(node);
//            expandAllNodes(root, oldNode, node);
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
            .style("fill", d3.rgb(250, 248, 245))
            .style('stroke', 'red')
            .style('stroke-width', 5)
            .style('stroke-width', 3);
    for (i = 0; i < node.children.length; i++)
        node.children[i].rectangle.transition()
                .duration(750)
                .style('stroke', 'blue')
                .style('stroke-width', 2);
}