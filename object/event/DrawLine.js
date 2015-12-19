function removeAllLines() {
    d3.selectAll(".path").remove();
}
/**
 * NodeA co gay phu thuoc len NodeB khong
 * @param {type} nodeA
 * @param {type} nodeB
 * @returns {undefined}
 */
function isDependencyRelation(nodeA, nodeB) {
    var leafNodeA = [];
    searchLeaf(nodeA, leafNodeA);
    leafNodeA.push(nodeA);

    var leafNodeB = [];
    searchLeaf(nodeB, leafNodeB);
    leafNodeB.push(nodeB);

    for (var i = 0; i < leafNodeA.length; i++)
        for (var j = 0; j < leafNodeB.length; j++) {
            for (var k = 0; k < leafNodeA[i].callee.length; k++)
                if (leafNodeA[i].callee[k] == leafNodeB[j]) {
                    return true;
                }

        }
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
    if (isTop(getNodeInfor(nGayPhuThuoc), getNodeInfor(nBiPhuThuoc))) {
        startPoint.x = getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2;
        startPoint.y = getY(nGayPhuThuoc) + getHeight(nGayPhuThuoc);

        endPoint.x = getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2;
        endPoint.y = getY(nBiPhuThuoc);
    } else
    if (isBottom(getNodeInfor(nGayPhuThuoc), getNodeInfor(nBiPhuThuoc))) {
        startPoint.x = getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc) / 2;
        startPoint.y = getY(nGayPhuThuoc);

        endPoint.x = getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc) / 2;
        endPoint.y = getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc);
    }
    else
    if (isLeft(getNodeInfor(nGayPhuThuoc), getNodeInfor(nBiPhuThuoc))) {
        startPoint.x = getX(nGayPhuThuoc) + getWidth(nGayPhuThuoc);
        startPoint.y = getY(nGayPhuThuoc) + getHeight(nGayPhuThuoc) / 2;

        endPoint.x = getX(nBiPhuThuoc);
        endPoint.y = getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2;
    } else
    if (isRight(getNodeInfor(nGayPhuThuoc), getNodeInfor(nBiPhuThuoc))) {
        startPoint.x = getX(nGayPhuThuoc);
        startPoint.y = getY(nGayPhuThuoc) + getHeight(nGayPhuThuoc) / 2;

        endPoint.x = getX(nBiPhuThuoc) + getWidth(nBiPhuThuoc);
        endPoint.y = getY(nBiPhuThuoc) + getHeight(nBiPhuThuoc) / 2;
    }
//    var deltaX = Math.abs(startPoint.x - endPoint.x);
//    var deltaY = Math.abs(startPoint.y - endPoint.y);
    var gocCong = "";
//    var gocCong = 'C ' + (startPoint.x + deltaX / 3) + "," + (endPoint.y - deltaY / 3) + "," + (startPoint.x + deltaX / 3 * 2) + "," + (endPoint.y - deltaY / 3 * 2);
    var dAttribute = 'M' + startPoint.x + "," + startPoint.y + " " + gocCong + " " + endPoint.x + "," + endPoint.y;

    d3.select('svg').append('path')
            .attr('class', 'path')
            .attr('d', dAttribute)
            .style('stroke', '#a77a22')
            .style('stroke-width', '1')
            .style('marker-end', 'url(#markerArrow)');
}
/**
 * 
 * @param {type} dependencies Danh sach phu thuoc hien tai
 * @returns {undefined}
 */
function createLine(dependencies) {
    removeAllLines();
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