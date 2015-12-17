/**
 * Khởi tạo web page
 * @returns {undefined}
 */
function iniWebPage() {
    d3.select('body').append('svg')
            .attr('width', 3000)
            .attr('height', 3000);

    d3.select('svg').append('rect').attr('class', 'add-option');
    d3.select('svg').append('rect').attr('class', 'remove-option');
}
/**
 * Di chuyển tất cả các Node con trong một node cha một khoảng cách nào đó
 * @param {type} node Node cha được di chuyển
 * @param {type} deltaX khoảng cách cần di chuyển theo trục x
 * @param {type} deltaY khoảng cách cần di chuyển theo trục y
 * @returns {undefined}
 */
function updateLocationOfChildren(node, deltaX, deltaY) {
    for (var i = 0; i < node.children.length; i++) {
        var nChild = node.children[i];
        setNodeLocation(nChild, getX(nChild) + deltaX, getY(nChild) + deltaY);
        updateLocationOfChildren(nChild, deltaX, deltaY);
    }
}
/**
 * Thay đổi kích thước node để chứa vừa đủ các Node con. 
 * @param {type} node Node cần thay đổi kích thước
 * @returns {undefined}
 */
function pack(node) {
    if (node != null) {
        var xMinLeft = 100000, xMaxRight = 0, yMinTop = 100000, yMaxBottom = 0;
        var isPackedByChildren = false;
        node.children.forEach(function (childNode) {
            if (isAvailable(childNode)) {
                isPackedByChildren = true;

                var xChild = getX(childNode)
                var yChild = getY(childNode);
                var widthChild = getWidth(childNode);
                var heightChild = getHeight(childNode);

                if (xMinLeft > xChild)
                    xMinLeft = xChild;
                if (xMaxRight < xChild + widthChild)
                    xMaxRight = xChild + widthChild;
                if (yMinTop > yChild)
                    yMinTop = yChild;
                if (yMaxBottom < yChild + heightChild)
                    yMaxBottom = yChild + heightChild;
            }
        });
        if (isPackedByChildren) {
            var heightNode = getHeight(node);
            var widthNode = getWidth(node);
            var xOldNode = getX(node) + widthNode;
            var yOldNode = getY(node) + heightNode;

            setWidth(node, widthNode + (xOldNode - xMinLeft) + (xMaxRight - xOldNode - widthNode));
            setHeight(node, heightNode + (yOldNode - yMinTop) + (yMaxBottom - yOldNode - heightNode));
            addBorderForNode(node);
            pack(node.parent);
            // di chuyển những Node bị đè
        } else {
            setWidth(node, DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN);
            setHeight(node, DISPLAY_CHILDREN_STRATEGY.DEFAULT_HEIGHT_CHILDREN);
            addBorderForNode(node);
            pack(node.parent);
        }
    }
}
/**
 * Thêm border cho một Node
 * @param {type} node
 * @returns {undefined}
 */
function addBorderForNode(node) {
    if (getX(node) > 0) {
        setNodeLocation(node, getX(node) - BORDER_OF_NODE.left, getY(node) - BORDER_OF_NODE.top);
        setWidth(node, getWidth(node) + BORDER_OF_NODE.left + BORDER_OF_NODE.right);
        setHeight(node, getHeight(node) + BORDER_OF_NODE.top + BORDER_OF_NODE.bottom);
    }
}
/**
 * Thêm Hình Chữ Nhật vào một Node
 * @param {type} node Node cần thêm Hình Chữ Nhật
 * @param {type} x Tọa độ x hình chữ nhật
 * @param {type} y Tọa độ y hình chữ nhật
 * @returns {undefined}
 */
function iniNodeElement(node) {
    node.g = d3.select('body').select('svg').append('g').attr('class', 'node');
    node.g.childContainer = node.g.append('rect').attr('class', 'child-container')
            .attr('width', 100).attr('height', 100);
    node.g.textContainer = node.g.append('rect').attr('class', 'text-container')
            .attr('width', 100).attr('height', 20);
    node.g.name = node.g.append('text').attr('class', 'name')
            .text(getNameFromPath(node.path))
            .attr('x', 20)
            .attr('y', 15);
    node.g.state = node.g.append('image').attr('class', 'state')
            .attr("xlink:href", "images/expand.png");
}
