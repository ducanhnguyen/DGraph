<!DOCTYPE html>
<html>
    <head>
        <title>Context Menu</title>
        <style>
            #main {
                display: inline-block;
                background-color: grey;
                position: relative;
            }
            .menu {
                border: 1px solid black;
                background-color: grey;
                display: none;
                position: relative;
            }
            .menu,
            .menu li {
                padding: 0px;
                margin: 0px;
            }
            .menu li {
                color: white;
            }
            .menu > li:hover {
                background-color: lightblue;
                color: black;
            }
            .menu li {
                display: none;
            }

            .menu.svg li.svg ,
            .menu.svg li.svg li,
            .menu.rect li.rect ,
            .menu.circle li.circle li,
            .menu.circle li.circle {
                display: block;
            }
            /* Support sub menu */
            .menu li ul {
                display:none;
            }
            .menu li:hover ul {
                display:inline-block;
                position: relative;
                top: 0;
            }

            li.color {
                width: 30px;
                height: 20px;
            }
            li.color-1 {
                background-color: red;
            }
            li.color:hover {
                opacity: 0.5;
            }
            li.color-2 {
                background-color: green;
            }
        </style>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script type="text/javascript">
            window.onload = function () {
                var context = null;
                var rects = [
                    {id: 1, x: 50, y: 150, w: 10, h: 60},
                    {id: 2, x: 200, y: 150, w: 30, h: 40}
                ];
                var svg = d3.select('#main')
                        .append('svg:svg')
                        .attr('width', 300)
                        .attr('height', 300)
                        .attr('fill', 'blue')
                        ;

                var contextMenu = function (that, newContext) {
                    if (context) {
                        if (context !== newContext) {
                            console.log('contextmenu: cannot execute for context: ' + newContext + ' while in current context: ' + context);
                            return;
                        }
                    }
                    context = newContext;
                    console.log('contextmenu:' + context);
                    d3.event.preventDefault();

                    var position = d3.mouse(that);
                    d3.select('#context-menu')
                            .style('position', 'absolute')
                            .style('left', position[0] + "px")
                            .style('top', position[1] + "px")
                            .style('display', 'inline-block')
                            .on('mouseleave', function () {
                                d3.select('#context-menu').style('display', 'none');
                                context = null;
                            });
                    d3.select('#context-menu').attr('class', 'menu ' + context);
                }

                svg.selectAll("rect")
                        .data(rects)
                        .enter()
                        .append("rect")
                        .attr('x', function (d) {
                            return d.x;
                        })
                        .attr('y', function (d) {
                            return d.y;
                        })
                        .attr('width', function (d) {
                            return d.w;
                        })
                        .attr('height', function (d) {
                            return d.h;
                        })
                        .on("contextmenu", function (data, index) {
                            contextMenu(this, 'rect', data);
                            d3.event.preventDefault();
                        });
            }
        </script>
    </head>
    <body>
        <div id="main"></div>
        <ul id="context-menu" class="menu">
            <li class="rect" id="action-rect-1">Rect item 1</li>
            <li class="rect" id="action-rect-2">Rect item 2</li>
        </ul>
    </body>
</html>