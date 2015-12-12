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
        if (node.children[i].visibility == true) {
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
 * @param {type} node Root của sub-trê
 * @param {type} nodes Danh sách lưu các node thỏa mãn trong sub-tree 
 * @returns {undefined}
 */
function searchAllNodes(node, nodes) {
    for (var k = 0; k < node.children.length; k++) {
        nodes.push(node.children[k]);
        searchAllNodes(node.children[k], nodes);
    }
}
/**
 * Lấy danh sách node lá trong sub-tree
 * @param {type} node Root của sub-tree
 * @param {type} leafs Danh sách lưu các node lá
 * @returns {undefined}
 */
function searchLeaf(node, leafs) {
    for (var i = 0; i < node.children.length; i++) {
        if (node.children[i].children.length == 0)
            leafs.push(node.children[i]);
        else
            searchLeaf(node.children[i], leafs);
    }
}
function isLeaf(node) {
    if (node.children.length == 0)
        return true;
    return false;
}