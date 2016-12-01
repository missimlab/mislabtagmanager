/**
 * DOMHandler manages all DOM operations, ie : 
 *     - Init DOM parsing input in parameter (return an array of tags)
 *     
 */
MislabTagDOMHandler = function(input) {
    this.input = input;
    this.inputId = this.generateInputId();
    this.listclass = "mislab-list-selected";
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

    var list = '<div class="mislab-tag-container" data-mislab-id="'+this.inputId+'"><div class="'+this.listclass+'"></div></div>';
    $(list).insertBefore(this.input);
    this.input.attr("data-mislab-input-id", this.inputId);
    $.each(tags, function(){
        if(this.selected) {
            self.createTag(this);
        }
    });
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"] ."+this.listclass).append('<input type="text" class="enter-tag" />');
    this.hideInput();
    this.createList(tags);

}

MislabTagDOMHandler.prototype.createTag = function(tag) {
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"] ."+this.listclass).append('<div class="selected-tag" data-label="'+tag.label+'">'+tag.label+'<div class="remove-tag"></div></div>');
}

MislabTagDOMHandler.prototype.generateInputId = function() {
    return Math.random().toString(36).substr(2, 9);
}

MislabTagDOMHandler.prototype.createList = function(tags) {
    var self = this;
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"]").append('<ul class="mislab-existing-tags"></ul>');
    
    $.each(tags, function(){
        if(this.selected == false) {
            $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags").append('<li>'+this.label+'</li>');
            $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags").hide();
        }
    });
}

MislabTagDOMHandler.prototype.displayTagList = function(tagsActive) {
    var self = this;
    $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags li").removeClass('active');
    $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags li").removeClass('highlighted');

    if(tagsActive.length == 0 ) {
        $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags").hide();
    } else {
        $.each(tagsActive, function(){
            $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags li:contains('"+this.label+"')").addClass('active');
        });
        $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags").show();

    }
}

MislabTagDOMHandler.prototype.highlightUp = function()
{
    var oldHighlighted = $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags li.highlighted");
    if(oldHighlighted.length == 0) {
        $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags li.active:last").addClass("highlighted");
    } else {
        var newHighlighted = oldHighlighted
                .removeClass('highlighted')
                .prev();
            newHighlighted.addClass('highlighted');

         if(!newHighlighted.hasClass('active')) {
             this.highlightUp();   
         }
    }  
}

MislabTagDOMHandler.prototype.highlightDown = function()
{
    var oldHighlighted = $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags li.highlighted");
    if(oldHighlighted.length == 0) {
        $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags li.active:first").addClass("highlighted");
    } else {
        var newHighlighted = oldHighlighted
                .removeClass('highlighted')
                .next();
            newHighlighted.addClass('highlighted');

         if(!newHighlighted.hasClass('active')) {
             this.highlightDown();   
         }
                
    }
}

MislabTagDOMHandler.prototype.highlightTag = function(tag)
{
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags li.highlighted").removeClass("highlighted");
    tag.addClass("highlighted");

}

MislabTagDOMHandler.prototype.unhighlightTag = function(tag)
{
    tag.removeClass("highlighted");
}
