var BORDER_OF_NODE = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
}
var DISPLAY_CHILDREN_STRATEGY = {
    NUMBER_CHILDREN_IN_ROW: 3,
    DISTANCE_BETWEEN_CHILDREN: {
        VERTICAL: 20,
        HORIZONTAL: 20
    },
    DEFAULT_WIDTH_CHILDREN: 60,
    DEFAULT_HEIGHT_CHILDREN: 20
};
var DEFAULT_WIDTH_NODE = 60;
var DEFAULT_HEIGHT_NODE = 20;

var TEXT = {
    SIZE_TEXT: 8,
    MARGIN_TOP: 9,
    MARGIN_LEFT: 5,
    DISPLAY_RANGE: DISPLAY_CHILDREN_STRATEGY.DEFAULT_WIDTH_CHILDREN // Neu lon hon thi hien thi full text
}
var DELIMITER_BETWEEN_COMPONENT_IN_PATH = "\\";
var CHILDREN_DISPLAY_STRATEGY = {
    IN_ROWS: 0,
    RANDOM: 1
}