function removeAllLines() {
    d3.select('body').select('svg').selectAll("line").remove();
}
/**
 * NodeA co gay phu thuoc len NodeB khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isDependencyRelation(nodeA, nodeB) {
//    console.log("Pair----------------------");
    var leafNodeA = [];
    searchLeaf(nodeA, leafNodeA);
    leafNodeA.push(nodeA);
//    console.log(leafNodeA);

    var leafNodeB = [];
    searchLeaf(nodeB, leafNodeB);
    leafNodeB.push(nodeB);
//    console.log(leafNodeB);

    for (var i = 0; i < leafNodeA.length; i++)
        for (var j = 0; j < leafNodeB.length; j++) {
            for (var k = 0; k < leafNodeA[i].callee.length; k++)
                if (leafNodeA[i].callee[k] == leafNodeB[j]) {
//                    console.log('found dependency');
                    return true;
                }

        }
//    console.log('not found dependency');
    return false;
}
function drawLine(nGayPhuThuoc, nBiPhuThuoc) {
    var startPoint = {
        x: 0,
        y: 0
    };
    var endPoint = {
        x: 0,
        y: 0
    };
    if (isTop(nGayPhuThuoc, nBiPhuThuoc)) {
        startPoint.x = getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2;
        startPoint.y = getY(nGayPhuThuoc) + getHeight(nGayPhuThuoc);

        endPoint.x = getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2;
        endPoint.y = getY(nBiPhuThuoc);
    } else if (isBottom(nGayPhuThuoc, nBiPhuThuoc)) {
        startPoint.x = getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2;
        startPoint.y = getY(nGayPhuThuoc);

        endPoint.x = getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2;
        endPoint.y = getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc);
    } else if (isLeft(nGayPhuThuoc, nBiPhuThuoc)) {
        startPoint.x = getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc);
        startPoint.y = getY(nGayPhuThuoc) + getHeight(nGayPhuThuoc) / 2;

        endPoint.x = getX(nBiPhuThuoc);
        endPoint.y = getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2;
    } else if (isRight(nGayPhuThuoc, nBiPhuThuoc)) {
        startPoint.x = getX(nGayPhuThuoc);
        startPoint.y = getY(nGayPhuThuoc) + getHeight(nGayPhuThuoc) / 2;

        endPoint.x = getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc);
        endPoint.y = getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2;
    }

    d3.select('body').select('svg').append("line")
            .style("stroke", "black")
            .attr("x1", startPoint.x)
            .attr("y1", startPoint.y)
            .attr("x2", endPoint.x)
            .attr("y2", endPoint.y);
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
    if (visibleLeafNodes.length >= 2)
        for (var i = 0; i < visibleLeafNodes.length - 1; i++) {
            for (var j = i + 1; j < visibleLeafNodes.length; j++) {
                /**NodeA co gay phu thuoc len NodeB khong*/
                if (isDependencyRelation(visibleLeafNodes[i], visibleLeafNodes[j]) == true) {
                    var dependency = {
                        gayPhuPhuoc: visibleLeafNodes[i],
                        biPhuThuoc: visibleLeafNodes[j]
                    };
                    dependencies.list.push(dependency);
                }
                else
                /**NodeB co gay phu thuoc len NodeA khong*/
                if (isDependencyRelation(visibleLeafNodes[j], visibleLeafNodes[i]) == true) {
                    var dependency = {
                        gayPhuPhuoc: visibleLeafNodes[j],
                        biPhuThuoc: visibleLeafNodes[i]
                    };
                    dependencies.list.push(dependency);
                }
            }
        }
}