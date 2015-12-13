/**
 * Xác định va chạm đồng mức
 * @param {type} node
 * @param {type} movedNode
 * @returns {undefined}
 */
function detectCollision(movedNode, deltaX, deltaY) {
    var parent = movedNode.parent;
    var collisions = [];

    var movedNodePoint = getPoints(movedNode);

    if (parent != null) {
        parent.children.forEach(function (child) {
            if (child != movedNode && isAvailable(child)) {
                var childPoint = getPoints(child);
                // va chạm loại I
                if (isInRectangle(movedNodePoint.A, childPoint)
                        || isInRectangle(movedNodePoint.B, childPoint)
                        || isInRectangle(movedNodePoint.C, childPoint)
                        || isInRectangle(movedNodePoint.D, childPoint)) {
                    moveNode(child, deltaX, deltaY);
                    detectCollision(child, deltaX, deltaY);
                }
                else
                // va chạm loại II
                if (isInRectangle(childPoint.A, movedNodePoint)
                        || isInRectangle(childPoint.B, movedNodePoint)
                        || isInRectangle(childPoint.C, movedNodePoint)
                        || isInRectangle(childPoint.D, movedNodePoint)) {
                    moveNode(child, deltaX, deltaY);
                    detectCollision(child, deltaX, deltaY);
                }

            }
        });
    }
    return collisions;
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