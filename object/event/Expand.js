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
                var relativeLocations = getRelativeLocation(oldChildNodeInfor, oldNodeInfor);
                relativeLocations.forEach(function (relativeLocation) {
                    switch (relativeLocation) {
                        case LEFT_ONLY:
                            moveNode(child, -1 * expandArea.left, 0);
                            console.log(getNameFromPath(child.path) + " move left");
                            break;
                        case RIGHT_ONLY:
                            moveNode(child, expandArea.right, 0);
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
                });
            }
        });
    }
}