/**
 * Xác định va chạm đồng mức
 * @param {type} movedNode
 * @param {type} deltaX
 * @param {type} deltaY
 * @returns {undefined}
 */
function detectInnerCollision(movedNode, deltaX, deltaY) {
    if (movedNode != null && movedNode.parent != null) {
        var parent = movedNode.parent;
        var movedNodePoint = getPoints(movedNode);
        movedNode.isMoved = true;

        parent.children.forEach(function (child) {
            if (child != movedNode && isAvailable(child) && child.isMoved == false) {
                var childPoint = getPoints(child);
                // va chạm loại I
                if (isInRectangle(movedNodePoint.A, childPoint)
                        || isInRectangle(movedNodePoint.B, childPoint)
                        || isInRectangle(movedNodePoint.C, childPoint)
                        || isInRectangle(movedNodePoint.D, childPoint)
                        || isInRectangle(childPoint.A, movedNodePoint)
                        || isInRectangle(childPoint.B, movedNodePoint)
                        || isInRectangle(childPoint.C, movedNodePoint)
                        || isInRectangle(childPoint.D, movedNodePoint)) {
                    child.isMoved = true;
                    moveNode(child, deltaX, deltaY);
                    detectInnerCollision(child, deltaX, deltaY);
                }
            }
        });
    }
}
/**
 * Lấy danh sách các điểm tạo nên Node
 * @param {type} movedNode
 * @returns {undefined}
 */
function getPoints(movedNode) {
    var points = {
        A: {
            x: getX(movedNode),
            y: getY(movedNode)
        },
        B: {
            x: getX(movedNode) + getWidth(movedNode),
            y: getY(movedNode)
        },
        C: {
            x: getX(movedNode) + getWidth(movedNode),
            y: getY(movedNode) + getHeight(movedNode)
        },
        D: {
            x: getX(movedNode),
            y: getY(movedNode) + getHeight(movedNode)
        }
    }
    return points;
}
/**
 * Kiểm tra một điểm có nằm trong một hình chữ nhật không
 * @param {type} point
 * @param {type} rect
 * @returns {Boolean}
 */
function isInRectangle(point, rect) {
    if (point.x >= rect.A.x && point.x <= rect.B.x
            && point.y >= rect.A.y && point.y <= rect.D.y)
        return true;
    return false;
}
function resetMoveState(node) {
    node.isMoved = false;
    node.children.forEach(function (child) {
        resetMoveState(child);
    });
}