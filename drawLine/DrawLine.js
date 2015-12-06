/**
 * Ve cac duong phu thuoc giua cac Node
 * @param {type} node
 * @returns {undefined}
 */
function createLine(node) {
//    removeAllLines();
//    var visibleLeafNodes = [];
//    searchVisibleLeaf(node, visibleLeafNodes);
//    console.log('begin create lines');
//    if (visibleLeafNodes.length >= 2)
//        for (i = 0; i < visibleLeafNodes.length - 1; i++)
//            for (j = i + 1; j < visibleLeafNodes.length; j++) {
//                console.log('pair:');
//                console.log(visibleLeafNodes[i]);
//                console.log(visibleLeafNodes[j]);
//                if (isDependencyRelation(visibleLeafNodes[i], visibleLeafNodes[j])) {
//                    console.log('new line');
//                    drawLine(visibleLeafNodes[i], visibleLeafNodes[j]);
//                }
//            }
}
function removeAllLines() {
    d3.select('body').select('svg').selectAll("line").remove();
}
function drawLine(nGayPhuThuoc, nBiPhuThuoc) {
    d3.select('body').select('svg').append("line")
            .style("stroke", "black")
            .attr("x1", getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2)
            .attr("y1", getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2)
            .attr("x2", getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2)
            .attr("y2", getY(nGayPhuThuoc) + getHeight(nBiPhuThuoc) / 2);
}

/**
 * NodeA va NodeB co ton tai quan he phu thuoc hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isDependencyRelation(nodeA, nodeB) {
    var leafNodeA = [];
    getLeafs(nodeA, leafNodeA);
    console.log(leafNodeA);

    var leafNodeB = [];
    getLeafs(nodeB, leafNodeB);
    console.log(leafNodeB);

//   drawLine(nodeA, nodeB);
    for (i = 0; i < leafNodeA.length; i++)
        for (j = 0; j < leafNodeB.length; j++) {
            for (k = 0; k < leafNodeA[i].callee.length; k++)
                if (leafNodeA[i].callee[k] == leafNodeB[j]) {
                    console.log('ok');
                    return true;
                }

        }
    return false;
}