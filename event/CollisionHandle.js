/**
 * Xác định va chạm đồng mức
 * @param {type} node
 * @param {type} factor
 * @returns {undefined}
 */
function findCollision(node, factor) {
    var collisions = [];
    node.children.forEach(function (child) {
//console.log(child);
        if (child != factor) {
            // factor nam duoi
            if (getY(factor) <= getY(child) + getHeight(child))
                collisions.push(child);
            // factor nam ben trai
            else if (getX(factor) + getWidth(factor) >= getX(child))
                collisions.push(child);
            // factor nam ben phai
            else if (getX(factor) <= getX(child) + getWidth(child))
                collisions.push(child);
            // factor nam ben tren
            else if (getY(factor) + getHeight(factor) >= getY(child))
                collisions.push(child);
        }
    });
    return collisions;
}