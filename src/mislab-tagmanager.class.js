function MislabTagManager() {
    this.input = null;
    this.tags = [];
    this.domHandler = null;
    this.eventHandler = null;
    this.options = {
        "ajax_autocomplete": false,
    };
};

MislabTagManager.prototype.init = function(input) {

    console.log("************TagManager : INIT***********");
    console.log("input"); console.log(input);

    this.domHandler = new MislabTagDOMHandler(input);
    this.eventHandler = new MislabTagEventHandler(this, this.options);
    this.tags = this.domHandler.getTagsFromInput();
    this.domHandler.initDom(this.tags);
    this.eventHandler.registerEvents(this.domHandler.inputId);
}

MislabTagManager.prototype.displayTagList = function(tagsActive) {
    this.domHandler.displayTagList(tagsActive);
}