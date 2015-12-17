/**
 * Khởi tạo web page
 * @returns {undefined}
 */
function iniWebPage() {
    d3.select('body').append('svg')
            .attr("width", 3000)
            .attr("height", 3000);

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
        nChild.rectangle
                .attr('x', getX(nChild) + deltaX)
                .attr('y', getY(nChild) + deltaY);
        updateLocationOfChildren(nChild, deltaX, deltaY);
        setTextLocationForNode(nChild);
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

            node.rectangle
                    .attr('x', xMinLeft)
                    .attr('y', yMinTop)
                    .attr('width', widthNode + (xOldNode - xMinLeft) + (xMaxRight - xOldNode - widthNode))
                    .attr('height', heightNode + (yOldNode - yMinTop) + (yMaxBottom - yOldNode - heightNode));
            addBorderForNode(node);
            setTextLocationForNode(node);
            pack(node.parent);

            // di chuyển những Node bị đè

        } else {
            node.rectangle
                    .attr('width', DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN)
                    .attr('height', DISPLAY_CHILDREN_STRATEGY.DEFAULT_HEIGHT_CHILDREN);
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
        node.rectangle
                .attr('x', getX(node) - BORDER_OF_NODE.left)
                .attr('y', getY(node) - BORDER_OF_NODE.top)
                .attr('width', getWidth(node) + BORDER_OF_NODE.left + BORDER_OF_NODE.right)
                .attr('height', getHeight(node) + BORDER_OF_NODE.top + BORDER_OF_NODE.bottom);
    }
}
/**
 * Thêm Hình Chữ Nhật vào một Node
 * @param {type} node Node cần thêm Hình Chữ Nhật
 * @param {type} x Tọa độ x hình chữ nhật
 * @param {type} y Tọa độ y hình chữ nhật
 * @returns {undefined}
 */
function iniNode(node) {
    var X = 100;
    var Y = 100;

    node.g = d3.select('body').select('svg').append("g").attr("class", "node");

    node.g.append("rect").attr('class', 'container')
            .attr("x", X)
            .attr("y", Y)
            .attr("width", DEFAULT_WIDTH_NODE)
            .attr("height", DEFAULT_HEIGHT_NODE);
    
    node.g.append("text").attr('class', 'name')
            .attr("x", getX(node) + TEXT.MARGIN_LEFT)
            .attr("y", getY(node) + TEXT.MARGIN_TOP)
            .text(getNameFromPath(node.path))
            .style('fill', 'black')
            .style('font-size', TEXT.SIZE_TEXT)
            .style('font-weight', 'bold')
            .style('font-family', 'Arial');
    
    setVisible(node);
}
