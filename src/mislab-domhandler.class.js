/**
 * DOMHandler manages all DOM operations, ie : 
 *     - Init DOM parsing input in parameter (return an array of tags)
 *     
 */
MislabTagDOMHandler = function(input) {
    this.input = input;
    this.inputId = this.generateInputId();
    this.listselector = ".mislab-list-selected";
}

MislabTagDOMHandler.prototype.getTagsFromInput = function()
{
    
    var options = this.input.find('option');
    var tags = [];
    $.each(options, function(){
        tags.push(
            new MislabTagObject($(this).text(), $(this).attr("selected") != undefined, this.inputId)
        );
    });
    return tags;
}

MislabTagDOMHandler.prototype.hideInput = function()
{
    this.input.hide();
}

MislabTagDOMHandler.prototype.initDom = function(tags)
{
    var self = this;
    var list = '<div class="'+this.listselector+'" data-mislab-id="'+this.inputId+'"></div>';
    $(list).insertBefore(this.input);
    this.input.attr("data-mislab-input-id", this.inputId);
    $.each(tags, function(){
        if(this.selected) {
            self.createTag(this);
        }
    });
    $("*[data-mislab-id="+this.inputId+"]").append('<input type="text" class="enter-tag" />');
    this.hideInput();
}

MislabTagDOMHandler.prototype.createTag = function(tag) {
    $("*[data-mislab-id="+this.inputId+"]").append('<div class="selected-tag" data-label="'+tag.label+'">'+tag.label+'<div class="remove-tag"></div></div>');
}

MislabTagDOMHandler.prototype.generateInputId = function() {
    return Math.random().toString(36).substr(2, 9);
}


