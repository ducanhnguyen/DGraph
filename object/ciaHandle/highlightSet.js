var HIGHTLIGHT_CHANGESET = 0;
var HIGHTLIGHT_IMPACTSET = 1;
/**
 * 
 * @param {type} impactSet Ex: [1,2,34]
 * @param {type} root Root của cây
 * @returns {undefined}
 */
function hightLightSet(set, typeHighLight, root) {
    var setItems = set.replace('[', '')
            .replace(']', '')
            .replace(' ', '')
            .split(',');

    setItems.forEach(function (setItem) {
        var nodes = [];
        search(root, parseInt(setItem), nodes);

        if (nodes.length > 0) {
            if (typeHighLight == HIGHTLIGHT_CHANGESET)
                hightlightChangeNode(nodes[0]);
            else
            if (typeHighLight == HIGHTLIGHT_IMPACTSET)
                hightlightImpactNode(nodes[0]);
        }
    });
}
function hightlightImpactNode(node) {
    node.isImpactSet = true;
    console.log(node);
    node.rectangle.style('fill', 'red');
}
function hightlightChangeNode(node) {
    node.isImpactSet = false;
    node.rectangle.style('fill', 'green');
}