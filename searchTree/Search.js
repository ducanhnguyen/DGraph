/**
 * Tim kiem Node co id xac dinh
 */
function search(node, id, refNode) {
    if (node != null && node.id == id)
        refNode.push(node);
    else {
        for (var k = 0; k < node.children.length; k++) {
            search(node.children[k], id, refNode);
        }
    }
}
/**
 * Tim kiem Node lá đang hiển thị
 */
function searchVisibleLeaf(node, refNode) {
    var isDisplayChildren = false;
    for (i = 0; i < node.children.length; i++)
        if (getX(node.children[i]) >= 0) {
            isDisplayChildren = true;
            break;
        }
    if (isDisplayChildren == false)
        refNode.push(node);
    else
        for (var k = 0; k < node.children.length; k++) {
            searchVisibleLeaf(node.children[k], refNode);
        }
}
/**
 * Lay danh sach nodes trong sub-tree xac dinh
 * @param {type} node
 * @returns {undefined}
 */
function searchAllNodes(node, nodes) {
    for (var k = 0; k < node.children.length; k++) {
        nodes.push(node.children[k]);
        searchAllNodes(node.children[k], nodes);
    }
}