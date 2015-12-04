function Node() {
    this.id = null;
    this.path = null;
    this.clickInfor = {
        xClick: 10,
        yClick: 10,
        xCurrent: 10,
        yCurrent: 10
    };
    this.children = [];
    this.parent = null;
}