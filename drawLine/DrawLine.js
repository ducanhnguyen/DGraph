function removeAllLines() {
    d3.select('body').select('svg').selectAll("line").remove();
}
/**
 * NodeA va NodeB co ton tai quan he phu thuoc hay khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isDependencyRelation(nodeA, nodeB) {
    var leafNodeA = [];
    searchLeaf(nodeA, leafNodeA);
    leafNodeA.push(nodeA);
//    console.log(leafNodeA);

    var leafNodeB = [];
    searchLeaf(nodeB, leafNodeB);
    leafNodeB.push(nodeB);
//    console.log(leafNodeB);

    for (i = 0; i < leafNodeA.length; i++)
        for (j = 0; j < leafNodeB.length; j++) {
            for (k = 0; k < leafNodeA[i].callee.length; k++)
                if (leafNodeA[i].callee[k] == leafNodeB[j]) {
//                    console.log('found dependency');
                    return true;
                }

        }
//    console.log('not found dependency');
    return false;
}
function drawLine(nGayPhuThuoc, nBiPhuThuoc) {
    d3.select('body').select('svg').append("line")
            .style("stroke", "black")
            .attr("x1", getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2)
            .attr("y1", getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2)
            .attr("x2", getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2)
            .attr("y2", getY(nGayPhuThuoc) + getHeight(nBiPhuThuoc) / 2);
    var p1 = {
        x: getX(nBiPhuThuoc),
        y: getY(nBiPhuThuoc)
    };
    var p2 = {
        x: getX(nGayPhuThuoc),
        y: getY(nGayPhuThuoc)
    };
}
/**
 * 
 * @param {type} dependencies Danh sach phu thuoc hien tai
 * @returns {undefined}
 */
function createLine(dependencies) {
    removeAllLines();
    console.log(dependencies);
    dependencies.list.forEach(function (dependency) {
        drawLine(dependency.gayPhuPhuoc, dependency.biPhuThuoc)
    });
}
/**
 * 
 * @param {type} node
 * @param {type} dependenciesList
 * @returns {undefined}
 */
function updateDependency(node, dependencies) {
    var visibleLeafNodes = [];
    searchVisibleLeaf(node, visibleLeafNodes);
    console.log('begin create lines');
    console.log(visibleLeafNodes);
    if (visibleLeafNodes.length >= 2)
        for (var i = 0; i < visibleLeafNodes.length - 1; i++) {
            for (var j = i + 1; j < visibleLeafNodes.length; j++) {

                if (isDependencyRelation(visibleLeafNodes[i], visibleLeafNodes[j]) == true) {
                    console.log("add new dependency");
                    var dependency = {
                        gayPhuPhuoc: visibleLeafNodes[i],
                        biPhuThuoc: visibleLeafNodes[j]
                    };
                    dependencies.list.push(dependency);
                }
            }
        }
}