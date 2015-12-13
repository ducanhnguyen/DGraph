/**
 * Xác định va chạm đồng mức
 * @param {type} node
 * @param {type} movedNode
 * @returns {undefined}
 */
function detectCollision(movedNode) {
    var parent = movedNode.parent;
    var collisions = [];

    var movedNodePoint = getPoints(movedNode);

    if (parent != null) {
        parent.children.forEach(function (child) {
            if (child != movedNode) {
                var childPoint = getPoints(child);
                if (isInRectangle(childPoint.A, movedNodePoint)
                        || isInRectangle(childPoint.B, movedNodePoint)
                        || isInRectangle(childPoint.C, movedNodePoint)
                        || isInRectangle(childPoint.D, movedNodePoint))
                    collisions.push(child);
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