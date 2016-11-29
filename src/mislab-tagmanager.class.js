function MislabTagManager() {
    this.input = null;
    this.tags = [];
    this.domHandler = null;
};

MislabTagManager.prototype.init = function(input) {

    console.log("************ TagManager : INIT***********");
    console.log("input: "); console.log(input);

    this.domHandler = new MislabTagDOMHandler(input);
    this.tags = this.domHandler.getTagsFromInput();
    this.domHandler.initDom(this.tags);
};

