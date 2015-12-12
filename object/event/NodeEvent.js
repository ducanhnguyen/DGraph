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
                removeSubMenu();

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
/**
 * 
 * @param {type} node Node cha
 * @param {type} oldNode Trang thai Node chua mo rong
 * @param {type} newNode Trang thai Node da mo rong
 * @param {type} expandArea vung mo rong
 * @returns {undefined}
 */
function expandAllNodes(node, oldNode, newNode) {
    if (node != null) {
        // add here
        var oldLocationParent = {
            x: getX(oldNode),
            y: getY(oldNode),
            width: getWidth(oldNode),
            height: getHeight(oldNode)
        };
        // add here
        var newLocationParent = {
            x: getX(newNode),
            y: getY(newNode),
            width: getWidth(newNode),
            height: getHeight(newNode)
        };

        var expandArea = {
            left: oldLocationParent.x - newLocationParent.x,
            right: (newLocationParent.x + newLocationParent.width) - (oldLocationParent.x + oldLocationParent.width),
            top: oldLocationParent.y - newLocationParent.y,
            bottom: (newLocationParent.y + newLocationParent.height) - (oldLocationParent.y + oldLocationParent.height)
        }
        console.log(expandArea);
        var oldParentNode = new Node();
        oldParentNode.rectangle = d3.select('body').select('svg').append("rect")
                .attr('x', getX(node))
                .attr('y', getY(node))
                .attr('width', getWidth(node))
                .attr('height', getHeight(node))
                .style('visibility', "hidden");

        node.children.forEach(function (child) {
            if (child != newNode) {
                var relativeLocation = getRelativeLocation(child, oldNode);
                switch (relativeLocation) {
                    case LEFT_ONLY:
                        setX(child, getX(child) - expandArea.left);
                        moveLeft(child, expandArea.left);
                        console.log(getName(child.path) + " move left");
                        break;
                    case LEFT_BOTTOM:
                        setX(child, getX(child) - expandArea.left);
                        moveLeft(child, expandArea.left);

                        setY(child, getY(child) + expandArea.bottom);
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move left bottom");
                        break;
                    case LEFT_TOP:
                        setX(child, getX(child) - expandArea.left);
                        moveLeft(child, expandArea.left);

                        setY(child, getY(child) - expandArea.top);
                        moveTop(child, expandArea.top);
                        console.log(getName(child.path) + " move left top");
                        break;
                    case RIGHT_ONLY:
                        setX(child, getX(child) + expandArea.right);
                        moveRight(child, expandArea.right);

                        console.log(getName(child.path) + " move right");
                        break;
                    case RIGHT_BOTTOM:
                        setX(child, getX(child) + expandArea.right);
                        moveRight(child, expandArea.right);

                        setY(child, getY(child) + expandArea.bottom);
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move right bottom");
                        break;
                    case RIGHT_TOP:
                        moveRight(child, expandArea.right);
                        setY(child, getY(child) + expandArea.right);

                        setY(child, getY(child) - expandArea.top);
                        moveTop(child, expandArea.top);
                        console.log(getName(child.path) + " move right top");
                        break;
                    case TOP_ONLY:
                        setY(child, getY(child) - expandArea.top);
                        moveTop(child, expandArea.top);

                        console.log(getName(child.path) + " move top");
                        break;
                    case BOTTOM_ONLY:
                        setY(child, getY(child) + expandArea.bottom);
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move bottom");
                        break;
                }
            }
        });
//        expandAllNodes(node.parent, oldParentNode, node);
    }
}
function doubleClick(node) {
    node.rectangle.on('dblclick', function () {
        resetAttributesOfAllNodes(getRoot(node));
        hightLightNode(node);

        /**
         * Node được click có hiển thị con hay không
         */
        var displayChildren = true;
        node.children.forEach(function (childNode) {
            if (!isAvailable(childNode))
                displayChildren = false;
        });
        /**
         * Nếu Node được click chưa hiển thị con
         */
        if (!displayChildren) {
            /**
             * Tạo bản sao Node được click
             */
            var oldNode = new Node();
            oldNode.rectangle = d3.select('body').select('svg').append("rect")
                    .attr('x', getX(node))
                    .attr('y', getY(node))
                    .attr('width', getWidth(node))
                    .attr('height', getHeight(node))
                    .style('visibility', "hidden");
            /**
             * Tính toán tọa độ các Node con trong Node được click
             */
            calculateLocationOfChildren(node, CHILDREN_DISPLAY_STRATEGY.IN_ROWS);

            node.children.forEach(function (childNode) {
                setVisible(childNode);
            });
            pack(node);
            //
            expandAllNodes(node.parent, oldNode, node);
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
        removeSubMenu();
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
        // select element in current context 
        d3.select(this)
                .style("cursor", "pointer");
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
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function rightMouseCLick(node) {
    node.rectangle.on('contextmenu', function (data, index) {
        d3.event.preventDefault();
        /**
         * Tạo menu
         */
        removeSubMenu();
        var option_group = d3.select('svg').append('g').attr('class', 'popup');

        var add_group = option_group.append('g');
        var addToChangeSet = add_group.append('rect')
                .attr('x', parseInt(d3.mouse(this)[0]))
                .attr('y', parseInt(d3.mouse(this)[1]))
                .attr('width', 100)
                .attr('height', 20)
                .style('fill', 'red');
        var txtAddToChangeSet = add_group.append('text')
                .attr('x', parseInt(addToChangeSet.attr('x')) + 5)
                .attr('y', parseInt(addToChangeSet.attr('y')) + 12)
                .style('font-size', 9)
                .style('fill', 'white')
                .text('Add to change set');

        var remove_group = option_group.append('g');
        var removeFromChangeSet = remove_group.append('rect')
                .attr('x', parseInt(d3.mouse(this)[0]))
                .attr('y', parseInt(addToChangeSet.attr('y')) + parseInt(addToChangeSet.attr('height')))
                .attr('width', 100)
                .attr('height', 20)
                .style('fill', 'blue');
        var txtRemoveFromChangeSet = remove_group.append('text')
                .attr('x', parseInt(removeFromChangeSet.attr('x')) + 5)
                .attr('y', parseInt(removeFromChangeSet.attr('y')) + 12)
                .style('font-size', 9)
                .style('fill', 'white')
                .text('Remove from change set');
        /**
         * Thêm một phần tử vào changeSet
         */
        add_group.on('click', function () {
            // Thêm tất cả node lá vào change set
            var leafs = [];
            if (isLeaf(node))
                leafs.push(node);
            else
                searchLeaf(node, leafs);

            leafs.forEach(function (leaf) {
                if (!containID(changeSet, leaf.id))
                    changeSet.push(leaf.id);
            });

            // xóa menu hiện tại
            removeSubMenu();
        });
        /**
         * Xóa một phần tử khỏi changeSet
         */
        remove_group.on('click', function () {
            // Thêm tất cả node lá vào change set
            var deletedLeafs = [];
            if (isLeaf(node))
                deletedLeafs.push(node);
            else
                searchLeaf(node, deletedLeafs);
            deletedLeafs.forEach(function (deletedLeaf) {
                changeSet = removeFromArray(changeSet, deletedLeaf.id);
            });

            // xóa menu hiện tại
            removeSubMenu();
        });
    });
}
/**
 * 
 * @param {type} arrayNode danh sách id Node trong tập change set
 * @param {type} IddeletedNode Id Node cần xóa
 * @returns {undefined}
 */
function removeFromArray(arrayNode, IddeletedNode) {
    var arrayNodeTmp = [];
    arrayNode.forEach(function (node) {
        if (node != IddeletedNode) {
            arrayNodeTmp.push(node);
        }
    });
    return arrayNodeTmp;
}
function removeSubMenu() {
    d3.selectAll("g.popup").remove();
    displayChangeSet();
}
function displayChangeSet() {
    console.log(changeSet);
}
function containID(arrayNode, id) {
    arrayNode.forEach(function (item) {
        if (item == id) {
            return true;
        }
    });
    return false;
}