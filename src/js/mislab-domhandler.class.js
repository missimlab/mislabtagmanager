MislabTagDOMHandler = function(input, inputId) {
    this.input = input;
    this.inputId = inputId;
    this.listclass = "mislab-list-selected";
    this.eventHandler = new MislabTagEventHandler(this.inputId);
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

MislabTagDOMHandler.prototype.addOptionToInputFromTag = function(tag)
{
    this.input.append('<option selected=selected value='+tag.label+'></option>');
}

MislabTagDOMHandler.prototype.initDom = function(tags)
{
    var self = this;
    var list = '<div class="mislab-tag-container" data-mislab-id="'+this.inputId+'"><div class="'+this.listclass+'"><div class="list"></div></div>';
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
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"] ."+this.listclass+" .list").append('<div class="selected-tag" data-label="'+tag.label+'">'+tag.label+'<div class="remove-tag"></div></div>');
}


MislabTagDOMHandler.prototype.createList = function(tags) {
    var self = this;
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"]").append('<ul class="mislab-existing-tags"></ul>');
    
    $.each(tags, function(){
        var selected = (this.selected) ? ' class="selected-tag"' : "";
        $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags").append('<li'+selected+'>'+this.label+'</li>');
        $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags").hide();
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
            if(this.selected) {
                $(".mislab-tag-container[data-mislab-id="+self.inputId+"] .mislab-existing-tags li:contains('"+this.label+"')").addClass('selected-tag');
            }
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

MislabTagDOMHandler.prototype.hideList = function()
{
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .mislab-existing-tags").hide();
}

MislabTagDOMHandler.prototype.removeTag = function(tag)
{
    $(".mislab-tag-container[data-mislab-id='"+this.inputId+"'] .selected-tag[data-label='"+tag.label+"']").remove();
}

MislabTagDOMHandler.prototype.updateInput = function(tags)
{
    
    var self = this;
    this.input.find("option").removeAttr('selected');
    $.each(tags, function(){
        if(this.selected) {
            if(self.input.find('option[value="'+this.label+'"]').length == 0) {
                self.input.append('<option value="'+this.label+'">'+this.label+'</option>');
            }
            self.input.find('option[value="'+this.label+'"]').attr('selected', 'selected');
        }
    });
}

MislabTagDOMHandler.prototype.clearInput = function(tags)
{
     $(".mislab-tag-container[data-mislab-id="+this.inputId+"] .enter-tag").val('');
}