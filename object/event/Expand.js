/**
 * Mở rộng một Node
 * @param {type} newNode Trang thai Node chua mo rong
 * @param {type} oldNodeInfor Trang thai Node da mo rong
 * @returns {undefined}
 */
function expandAllNodes(newNode, oldNodeInfor) {
    if (newNode.parent != null) {
        var parentNode = newNode.parent;
        var expandArea = {
            left: -getX(newNode) + oldNodeInfor.x,
            right: (getX(newNode) + getWidth(newNode)) - (oldNodeInfor.x + oldNodeInfor.width),
            top: oldNodeInfor.y - getY(newNode),
            bottom: (getY(newNode) + getHeight(newNode)) - (oldNodeInfor.y + oldNodeInfor.height)
        }

        var oldParentInfor = {
            x: getX(parentNode),
            y: getY(parentNode),
            width: getWidth(parentNode),
            height: getHeight(parentNode)
        }
        parentNode.children.forEach(function (child) {
            if (child != newNode) {
                var oldChildNodeInfor = {
                    x: getX(child),
                    y: getY(child),
                    width: getWidth(child),
                    height: getHeight(child)
                }
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


        expandAllNodes(parentNode, oldParentInfor);
    }
}