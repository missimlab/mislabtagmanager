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
    this.domHandler = new MislabTagDOMHandler(input);
    this.eventHandler = new MislabTagEventHandler(this, this.options);
    this.tags = this.domHandler.getTagsFromInput();
    this.domHandler.initDom(this.tags);
    this.eventHandler.registerEvents(this.domHandler.inputId);
}

MislabTagManager.prototype.displayTagList = function(tagsActive) {
    this.domHandler.displayTagList(tagsActive);
}


MislabTagManager.prototype.highlightUp = function()
{
    this.domHandler.highlightUp();
}

MislabTagManager.prototype.highlightDown = function()
{
    this.domHandler.highlightDown();
}

