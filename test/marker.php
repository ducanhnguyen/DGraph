<!DOCTYPE html>
<meta charset="utf-8">
<title>SVG Swarm</title>
<style>
    svg {
        position: absolute;
        top: 0;
    }
    path {
        stroke:#000;
        stroke-width:2;
    }
</style>
<div id="fps">FPS: <span>?</span></div>
<script src="http://d3js.org/d3.v2.min.js?2.9.1"></script>
<script>
    var data = [[0.5, 0.2], [0.6, 0.8]];
    var width = 960,
            height = 500;
    var x = d3.scale.linear()
            .domain([0, 1])
            .range([0, width]);
    var y = d3.scale.linear()
            .domain([0, 1])
            .range([0, height]);
    var time0 = Date.now(),
            time1;
    var fps = d3.select("#fps span");
    var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
    var marker = svg.append('defs')
            .append('marker').attr('id', 'arrow')
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 1)
            .attr('refY', 5)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto');
    marker.append('path')
            .attr("d", 'M 0 0 L 10 5 L 0 10 z');
    var p = svg.selectAll('path.x')
            .data([data])
            .enter()
            .append("path").attr('class', 'x')
            .attr('marker-start', 'url(#arrow)')
            .attr('marker-mid', 'url(#arrow)')
            .attr('marker-end', 'url(#arrow)')
            .attr("d", function (d) {
                return 'M' + d.map(function (a) {
                    return [x(a[0]), y(a[1])];
                }).join('L');
            });
    var fpsqueue = [];
    var forward = true;
</script>