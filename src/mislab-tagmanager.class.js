function MislabTagManager() {
    this.input = null;
    this.tags = [];
    this.domHandler = null;
    this.eventHandler = null;
    this.options = {
        "ajax_autocomplete": false,
    };
    this.inputId = null;
};

MislabTagManager.prototype.init = function(input) {
    this.inputId = this.generateInputId();
    this.input = input;
    this.domHandler = new MislabTagDOMHandler(input, this.inputId);
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

MislabTagManager.prototype.highlightTag = function(tag)
{
    this.domHandler.highlightTag(tag);
}

MislabTagManager.prototype.unhighlightTag = function(tag)
{
    this.domHandler.unhighlightTag(tag);
}

MislabTagManager.prototype.hideList = function()
{
    this.domHandler.hideList();
}

MislabTagManager.prototype.generateInputId = function() {
    return Math.random().toString(36).substr(2, 9);
}

MislabTagManager.prototype.selectTag = function(tagLabel) {
    var tag = this.getTagObjectByLabel(tagLabel);
    this.domHandler.createTag(tag);
    tag.selected = false;
    this.domHandler.hideList();
}

MislabTagManager.prototype.getTagObjectByLabel = function(tagLabel) {
    for(key in this.tags) {
        if(this.tags[key].label == tagLabel) {
            return this.tags[key];
        }
    }
}

MislabTagManager.prototype.removeTag = function(tagLabel) {
    var tag = this.getTagObjectByLabel(tagLabel);
    this.domHandler.removeTag(tag);
    tag.selected = false;
}


MislabTagManager.prototype.enterTag = function(tagLabel) {
    var tag = new MislabTagObject(tagLabel, true, this.inputId);
    this.tags.push(tag);
    this.domHandler.createTag(tag);
}