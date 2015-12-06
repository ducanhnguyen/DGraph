/**
 * 
 * @param {type} parentNode
 * @param {type} strategy Chiến lược hiển thị các Node con
 * @returns {undefined}
 */function calculateLocationOfChildren(parentNode, strategy) {
    if (strategy == CHILDREN_DISPLAY_STRATEGY.IN_ROWS) {
        inRowStrategy(parentNode);
    } else if (strategy == CHILDREN_DISPLAY_STRATEGY.RANDOM) {
        randomStrategy(parentNode);
    }
    else {
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
            currentNode.rectangle.attr('x', getX(preNode) + getWidth(preNode) + 20)
                    .attr('y', getY(parentNode) + b * 40)
                    .attr('width', DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN)
                    .attr('height', DISPLAY_CHILDREN_STRATEGY.DEFAULT_HEIGHT_CHILDREN);
        }
        else {
            currentNode.rectangle.attr('x', getX(parentNode))
                    .attr('y', getY(parentNode) + b * 40)
                    .attr('width', DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN)
                    .attr('height', DISPLAY_CHILDREN_STRATEGY.DEFAULT_HEIGHT_CHILDREN);
        }
        setTextLocationForNode(parentNode.children[i]);
    }
}
/**
 * Các Node con hiển thị với vị trí ngẫu nhiên
 * @param {type} parentNode
 * @returns {undefined}
 */
function randomStrategy(parentNode) {
    var nChildren = parentNode.children.length;
    for (i = 0; i < nChildren; i++) {
        parentNode.children[i].rectangle.attr('x', getX(parentNode) +
                DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN * i + randomInt(10))
                .attr('y', getY(parentNode) + randomInt(70))
                .attr('width', DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN)
                .attr('height', DISPLAY_CHILDREN_STRATEGY.DEFAULT_HEIGHT_CHILDREN);
        setTextLocationForNode(parentNode.children[i]);
    }
}