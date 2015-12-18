/**
 * Di chuyển các Node đồng mức
 * @param {type} newNode Node da bi thay doi trang thai
 * @param {type} oldNodeInfor Trang thai Node chua mo rong
 * @returns {undefined}
 */
function expandAllNodes(newNode, oldNodeInfor) {
    if (newNode.parent != null) {
        var parentNode = newNode.parent;
        var expandArea = {
            left: oldNodeInfor.x - getX(newNode),
            right: (getX(newNode) + getWidth(newNode)) - (oldNodeInfor.x + oldNodeInfor.width),
            top: oldNodeInfor.y - getY(newNode),
            bottom: (getY(newNode) + getHeight(newNode)) - (oldNodeInfor.y + oldNodeInfor.height)
        }
        console.log(expandArea);

        parentNode.children.forEach(function (child) {
            if (child != newNode) {
                var oldChildNodeInfor = getNodeInfor(child);
                var relativeLocation = getRelativeLocation(oldChildNodeInfor, oldNodeInfor);
                switch (relativeLocation) {
                    case LEFT_ONLY:
                        moveNode(child, -1 * expandArea.left, 0)
                        console.log(getNameFromPath(child.path) + " move left");
                        break;
                    case RIGHT_ONLY:
                        moveNode(child, expandArea.right, 0)
                        console.log(getNameFromPath(child.path) + " move right");
                        break;
                    case TOP_ONLY:
                        moveNode(child, 0, -1 * expandArea.top);
                        console.log(getNameFromPath(child.path) + " move top");
                        break;
                    case BOTTOM_ONLY:
                        moveNode(child, 0, expandArea.bottom);
                        console.log(getNameFromPath(child.path) + " move bottom");
                        break;
                }
            }
        });
    }
}

/**
 * Mở rộng một Node
 * @param {type} newNode Trang thai Node chua mo rong
 * @param {type} oldNodeInfor Trang thai Node da mo rong
 * @returns {undefined}
 */
function collapseAllNodes(newNode, oldNodeInfor) {
    if (newNode.parent != null) {
        var parentNode = newNode.parent;
        var expandArea = {
            left: -oldNodeInfor.x + getX(newNode),
            right: -(getX(newNode) + getWidth(newNode)) + (oldNodeInfor.x + oldNodeInfor.width),
            top: -oldNodeInfor.y + getY(newNode),
            bottom: -(getY(newNode) + getHeight(newNode)) + (oldNodeInfor.y + oldNodeInfor.height)
        }
        console.log(expandArea);
        parentNode.children.forEach(function (child) {
            if (child != newNode) {
                var oldChildNodeInfor = getNodeInfor(child);
                var relativeLocation = getRelativeLocation(oldChildNodeInfor, oldNodeInfor);
                switch (relativeLocation) {
                    case LEFT_ONLY:
                        setX(child, getX(child) - expandArea.left);
                        moveLeft(child, expandArea.left);
                        console.log(getNameFromPath(child.path) + " move left");
                        break;
                    case RIGHT_ONLY:
                        setX(child, getX(child) + expandArea.right);
                        moveRight(child, expandArea.right);
                        console.log(getNameFromPath(child.path) + " move right");
                        break;
                    case TOP_ONLY:
                        setY(child, getY(child) - expandArea.top);
                        moveTop(child, expandArea.top);
                        console.log(getNameFromPath(child.path) + " move top");
                        break;
                    case BOTTOM_ONLY:
                        setY(child, getY(child) + expandArea.bottom);
                        moveBottom(child, expandArea.bottom);
                        console.log(getNameFromPath(child.path) + " move bottom");
                        break;
                }
            }
        });
    }
}