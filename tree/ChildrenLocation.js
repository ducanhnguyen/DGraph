/**
 * 
 * @param {type} parentNode
 * @param {type} strategy Chiến lược hiển thị các Node con
 * @returns {undefined}
 */function calculateLocationOfChildren(parentNode, strategy) {
    if (strategy == CHILDREN_DISPLAY_STRATEGY.IN_ROWS) {
        inRowStrategy(parentNode);
    } else {
        // no thing to here
    }
}
/**
 * Các Node con hiển thị theo các hàng
 * @param {type} parentNode
 * @returns {undefined}
 */
function inRowStrategy(parentNode) {
    var nChildren = parentNode.children.length;
    for (i = 0; i < nChildren; i++) {
        var a = i % DISPLAY_CHILDREN_STRATEGY.NUMBER_CHILDREN_IN_ROW;
        var b = parseInt(i / DISPLAY_CHILDREN_STRATEGY.NUMBER_CHILDREN_IN_ROW);

        var currentNode = parentNode.children[i];
        if (a > 0) {
            var preNode = parentNode.children[i - 1];
            setNodeLocation(currentNode, getX(preNode) + getWidth(preNode)+ 30, getY(parentNode) + b * 60 + 15);
        }
        else {
            setNodeLocation(currentNode, getX(parentNode), getY(parentNode) + b * 60 + 15);
        }
        if (currentNode.children.length > 0) {
            currentNode.g.childContainer.attr('width', 100).attr('height', 15);
            currentNode.g.textContainer.attr('width', 100).attr('height', 15);
        } else {
            currentNode.g.childContainer.attr('width', 100).attr('height', 0);
            currentNode.g.textContainer.attr('width', 100).attr('height', 15);
        }
    }
}