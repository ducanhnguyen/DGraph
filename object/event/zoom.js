function setZoom(selection) {
    var zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", function () {
                console.log('zooming');
                selection.attr("transform", "scale(" + d3.event.scale + ")");
            });
    selection.call(zoom);
}