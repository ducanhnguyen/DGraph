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
                myNode.xClick = parseInt(d3.mouse(this)[0]);
                myNode.yClick = parseInt(d3.mouse(this)[1]);
                /**
                 * Bat toa do doi tuong truoc khi di chuyen
                 */
                myNode.xCurrent = getX(myNode);
                myNode.yCurrent = getY(myNode);
            })
            .on('drag', function () {
                var mouseXY = {
                    x: parseInt(d3.mouse(this)[0]),
                    y: parseInt(d3.mouse(this)[1])
                };
                /**
                 * Tinh toan delta can phai di chuyen doi tuong tu vi tri click den vi tri moi
                 */
                deltaX = mouseXY.x - myNode.xClick;
                deltaY = mouseXY.y - myNode.yClick;
                /**
                 * Cap nhat toa do moi cua doi tuong
                 */
                myNode.rectangle.attr('x', myNode.xCurrent + deltaX)
                        .attr('y', myNode.yCurrent + deltaY);
                /**
                 * Cap nhat toa do moi
                 * @returns {undefined}
                 */
                myNode.xCurrent = getX(myNode);
                myNode.yCurrent = getY(myNode);
                myNode.xClick = mouseXY.x;
                myNode.yClick = mouseXY.y;
                /**
                 * Xác định va chạm
                 */
//                var collisions = [];
//                if (myNode.parent != null)
//                    collisions = findCollision(myNode.parent, myNode);
//                console.log(collisions);
                // di chuyển children trong node đó
                updateLocationOfChildren(myNode, deltaX, deltaY);
                pack(myNode.parent);
                createLine(dependencies);
                setTextLocationForNode(myNode);
            })
            .on('dragend', function () {
            });
    myNode.rectangle.call(dragEvent);
}
function expandAllNodes(node, oldNode, newNode, expandArea) {
    if (node != null)
        node.children.forEach(function (child) {
            if (child != newNode) {
                var relativeLocation = getRelativeLocation(child, oldNode);
                switch (relativeLocation) {
                    case LEFT_ONLY:
                        moveLeft(child, expandArea.left);
                        console.log(getName(child.path) + " move left");
                        break;
                    case LEFT_BOTTOM:
                        moveLeft(child, expandArea.left);
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move left bottom");
                        break;
                    case LEFT_TOP:
                        moveLeft(child, expandArea.left);
                        moveTop(child, expandArea.top);
                        console.log(getName(child.path) + " move left top");
                        break;
                    case RIGHT_ONLY:
                        moveRight(child, expandArea.right);
                        console.log(getName(child.path) + " move right");
                        break;
                    case RIGHT_BOTTOM:
                        moveRight(child, expandArea.right);
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move right bottom");
                        break;
                    case RIGHT_TOP:
                        moveRight(child, expandArea.right);
                        moveTop(child, expandArea.top);
                        console.log(getName(child.path) + " move right top");
                        break;
                    case TOP_ONLY:
                        moveTop(child, expandArea.top);
                        console.log(getName(child.path) + " move top");
                        break;
                    case BOTTOM_ONLY:
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move bottom");
                        break;
                }
            }
            //                        expandAllNodes(child, oldNode, newNode);
        });
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
            // add here
            var oldLocationParent = {
                x: getX(node),
                y: getY(node),
                width: getWidth(node),
                height: getHeight(node)
            };
            var oldNode = new Node();
            oldNode.rectangle = d3.select('body').select('svg').append("rect")
                    .attr('x', getX(node))
                    .attr('y', getY(node))
                    .attr('width', getWidth(node))
                    .attr('height', getHeight(node))
                    .style('visibility', "hidden");
            //end
            calculateLocationOfChildren(node, CHILDREN_DISPLAY_STRATEGY.IN_ROWS);
            node.children.forEach(function (childNode) {
                setVisible(childNode);
            });
            pack(node);

            // add here
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
            
            console.log(expandArea);
            expandAllNodes(node.parent, oldNode, node, expandArea);
            pack(node.parent);
            // end
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
        dependencies.list = [];
        updateDependency(getRoot(node), dependencies);
        createLine(dependencies);
    }
    );
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseCLick(node) {
    node.rectangle.on('click', function () {
        d3.select(this)
                // add transition
                .transition()
                .duration(350)
                .style("fill", d3.rgb(53, 155, 251))
                .style('stroke-width', 2)
    });
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseEnter(node) {
    node.rectangle.on('mouseenter', function () {
        // select element in current context //        d3.select(this)
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
    node.rectangle.on('mouseout', function () {         // select element in current context //        d3.select(this)
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
            .style('stroke', d3.rgb(30, 144, 255))
            .style('stroke-width', 2);
    for (i = 0; i < node.children.length; i++)
        node.children[i].rectangle.transition()
                .duration(350)
                .style('stroke', d3.rgb(95, 140, 0))
                .style('fill', d3.rgb(172, 230, 0));
}
