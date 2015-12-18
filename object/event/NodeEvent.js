/**
 * Tạo hành vi di chuyển cho một Node
 * @param {type} myNode
 * @returns {undefined}
 */
function drag(myNode) {
    var dragEvent =
            d3.behavior.drag()
            .on('dragstart', function () {
                removeSubMenu();
                /**
                 * Bat toa do click chuot
                 */
                myNode.xClick = parseFloat(d3.mouse(this)[0] + getX(myNode));
                myNode.yClick = parseFloat(d3.mouse(this)[1] + getY(myNode));
                /**
                 * Bat toa do doi tuong truoc khi di chuyen
                 */
                myNode.xCurrent = getX(myNode);
                myNode.yCurrent = getY(myNode);
            })
            .on('drag', function () {
                removeAllLines();
                var mouseXY = {
                    x: parseFloat(d3.mouse(this)[0] + getX(myNode)),
                    y: parseFloat(d3.mouse(this)[1] + getY(myNode))
                };
                deltaX = mouseXY.x - myNode.xClick;
                deltaY = mouseXY.y - myNode.yClick;

                moveNode(myNode, deltaX, deltaY);

                /**
                 * Cap nhat toa do moi
                 * @returns {undefined}
                 */
                myNode.xCurrent = getX(myNode);
                myNode.yCurrent = getY(myNode);
                myNode.xClick = mouseXY.x;
                myNode.yClick = mouseXY.y;

                pack(myNode.parent);
                
                createLine(dependencies);

                /**
                 * Xác định va chạm
                 */
                resetMoveState(getRoot(myNode));
                detectInnerCollision(myNode, deltaX, deltaY);
            })
            .on('dragend', function () {
            });
    getGroupElement(myNode).call(dragEvent);
}
function doubleClick(node) {
    if (node.children.length > 0)
        getGroupElement(node).on('dblclick', function () {
            /**
             * Node được click có hiển thị con hay không
             */
            var displayChildren = true;
            node.children.forEach(function (childNode) {
                if (!isAvailable(childNode))
                    displayChildren = false;
            });
            var oldNodeInfor = getNodeInfor(node);
            /**
             * Nếu Node được click chưa hiển thị con
             */
            if (!displayChildren) {
                /**
                 * Tính toán tọa độ các Node con trong Node được click
                 */
                calculateLocationOfChildren(node, CHILDREN_DISPLAY_STRATEGY.IN_ROWS);

                node.children.forEach(function (childNode) {
                    setVisible(childNode);
                });
                pack(node);

                expandAllNodes(node, oldNodeInfor);
                pack(node.parent);
            } else {
                /*
                 * Ẩn các node con
                 */
                var nodes = [];
                searchAllNodes(node, nodes);
                nodes.forEach(function (childNode) {
                    setInvisible(childNode);
                });
                pack(node);

                collapseAllNodes(node, oldNodeInfor);
                pack(node.parent);
            }

            /**
             * Cap nhat lai danh sach phu thuoc
             */
            dependencies.list = [];
            updateDependency(getRoot(node), dependencies);
            createLine(dependencies);
        });
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseCLick(node) {
    getGroupElement(node).on('click', function () {
//        removeSubMenu();
//        if (node.isChangeSet == false || node.isImpactSet == false)
//            d3.select(this)
//                    // add transition
//                    .transition()
//                    .duration(350)
//                    .style("fill", d3.rgb(53, 155, 251))
//                    .style('stroke-width', 2)
        var mouseXY = {
            x: parseFloat(d3.mouse(this)[0] + getX(node)),
            y: parseFloat(d3.mouse(this)[1] + getY(node))
        };
        console.log(mouseXY);
    });
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseEnter(node) {
    node.rectangle.on('mouseenter', function () {
//        d3.select(this)
//                .style("cursor", "pointer");
    });
}
/**
 * When mouse out a node
 * @param {type} node
 * @returns {undefined}
 */
function mouseOut(node) {
    node.rectangle.on('mouseout', function () {
//        d3.select(this)
//                .style("cursor", "pointer");
    });
}
/**
 * When mouse enter a node
 * @param {type} node
 * @returns {undefined}
 */
function rightMouseCLick(node) {
    getGroupElement(node).on('contextmenu', function (data, index) {
        d3.event.preventDefault();
        /**
         * Tạo menu
         */
        removeSubMenu();
        var option_group = d3.select('svg').append('g').attr('class', 'popup');

        var add_group = option_group.append('g');
        var addToChangeSet = add_group.append('rect')
                .attr('x', parseInt(d3.mouse(this)[0]) + getX(node))
                .attr('y', parseInt(d3.mouse(this)[1]) + getY(node))
                .attr('width', 100)
                .attr('height', 20)
                .style('fill', 'red');
        add_group.append('text')
                .attr('x', parseInt(addToChangeSet.attr('x')) + 5)
                .attr('y', parseInt(addToChangeSet.attr('y')) + 12)
                .style('font-size', 9)
                .style('fill', 'white')
                .text('Add to change set');

        var remove_group = option_group.append('g');
        var removeFromChangeSet = remove_group.append('rect')
                .attr('x', parseInt(d3.mouse(this)[0]) + getX(node))
                .attr('y', parseInt(d3.mouse(this)[1]) + getY(node) + 21)
                .attr('width', 100)
                .attr('height', 20)
                .style('fill', 'blue');
        remove_group.append('text')
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
    //console.log(changeSet);
}
function containID(arrayNode, id) {
    arrayNode.forEach(function (item) {
        if (item == id) {
            return true;
        }
    });
    return false;
}