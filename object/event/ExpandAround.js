/**
 * Save the current state of parent before changing attributes
 * @type type
 */
var oldLocationParent = {
    x: getX(node),
    y: getY(node),
    width: getWidth(node),
    height: getHeight(node)
};
/**
 * Clone node
 * @param {type} currentNode
 * @returns {type}
 */
var oldNode = new Node();
oldNode.rectangle = d3.select('body').select('svg').append("rect")
        .attr('x', getX(node))
        .attr('y', getY(node))
        .attr('width', getWidth(node))
        .attr('height', getHeight(node))
        .style('visibility', "hidden");
/*
 * Expand node to see children if children are hidden
 */
var newLocationParent = {
    x: getX(node),
    y: getY(node),
    width: getWidth(node),
    height: getHeight(node)
};
var expandArea = {
    left: oldLocationParent.x - newLocationParent.x,
    right: (newLocationParent.x + newLocationParent.width) - (oldLocationParent.x + oldLocationParent.width),
    top: oldLocationParent.y - newLocationParent.y,
    bottom: (newLocationParent.y + newLocationParent.height) - (oldLocationParent.y + oldLocationParent.height)
}
/**
 * (fix later)
 * update location of others
 * @param {type} node
 * @returns {undefined}
 */
function expandAllNodes(root, oldNode, newNode) {
    if (root != newNode)
        for (var i = 0; i < root.children.length; i++) {
            var child = root.children[i];
            var relativeLocation = getRelativeLocation(child, oldNode);
            switch (relativeLocation) {
                case LEFT_ONLY:
                    moveLeft(child, expandArea.left);
                    break;
                case LEFT_BOTTOM:
                    moveLeft(child, expandArea.left);
                    moveBottom(child, expandArea.bottom);
                    break;
                case LEFT_TOP:
                    moveLeft(child, expandArea.left);
                    moveTop(child, expandArea.top);
                    break;
                case RIGHT_ONLY:
                    moveRight(child, expandArea.right);
                    break;
                case RIGHT_BOTTOM:
                    moveRight(child, expandArea.right);
                    moveBottom(child, expandArea.bottom);
                    break;
                case RIGHT_TOP:
                    moveRight(child, expandArea.right);
                    moveTop(child, expandArea.top);
                    break;
                case TOP_ONLY:
                    moveTop(child, expandArea.top);
                    break;
                case BOTTOM_ONLY:
                    moveBottom(child, expandArea.bottom);
                    break;
            }
            expandAllNodes(child, oldNode, newNode);
        }
}