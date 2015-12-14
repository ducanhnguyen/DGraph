/**
 * Mở rộng một Node
 * @param {type} oldNode Trang thai Node chua mo rong
 * @param {type} newNode Trang thai Node da mo rong
 * @returns {undefined}
 */
function expandAllNodes(oldNode, newNode) {
    if (newNode.parent != null) {
        var parentNode = newNode.parent;
        var expandArea = {
            left: getX(oldNode) - getX(newNode),
            right: (getX(newNode) + getWidth(newNode)) - (getX(oldNode) + getWidth(oldNode)),
            top: getY(oldNode) - getY(newNode),
            bottom: (getY(newNode) + getHeight(newNode)) - (getY(oldNode) + getHeight(oldNode))
        }
        var oldParentNode = new Node();
        oldParentNode.rectangle = d3.select('body').select('svg').append("rect")
                .attr('x', getX(parentNode))
                .attr('y', getY(parentNode))
                .attr('width', getWidth(parentNode))
                .attr('height', getHeight(parentNode))
                .style('visibility', "hidden");
        
        parentNode.children.forEach(function (child) {
            if (child != newNode) {
                var relativeLocation = getRelativeLocation(child, oldNode);
                switch (relativeLocation) {
                    case LEFT_ONLY:
                        setX(child, getX(child) - expandArea.left);
                        moveLeft(child, expandArea.left);
                        console.log(getName(child.path) + " move left");
                        break;
                    case RIGHT_ONLY:
                        setX(child, getX(child) + expandArea.right);
                        moveRight(child, expandArea.right);
                        console.log(getName(child.path) + " move right");
                        break;
                    case TOP_ONLY:
                        setY(child, getY(child) - expandArea.top);
                        moveTop(child, expandArea.top);
                        console.log(getName(child.path) + " move top");
                        break;
                    case BOTTOM_ONLY:
                        setY(child, getY(child) + expandArea.bottom);
                        moveBottom(child, expandArea.bottom);
                        console.log(getName(child.path) + " move bottom");
                        break;
                }
            }
        });
        expandAllNodes(oldParentNode, parentNode);
    }
}