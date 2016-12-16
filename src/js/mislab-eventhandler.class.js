MislabTagEventHandler = function(tagManager,options) {
    this.options = {
        "ajax_automplete" : false
    };
    this.tagManager = tagManager;
}

MislabTagEventHandler.prototype.registerEvents = function(inputId) {
    var self = this;
    
    $("*").on("submit", function(event) {
        if($(this).find(".mislab-tag-container[data-mislab-id="+inputId+"] ").length != 0 && $(this).find(".mislab-tag-container[data-mislab-id="+inputId+"] .enter-tag").is(':focus')) {
            event.preventDefault();
        }
    });

    $(".mislab-tag-container[data-mislab-id="+inputId+"] .enter-tag")
        .on(
            "keyup",
            null,
            {tags: this.tagManager.tags, eventHandler: this}, 
            this.autocompleteTag
        );

    $(".mislab-tag-container[data-mislab-id="+inputId+"] .mislab-existing-tags ").on('mouseenter',"li", 
            {tags: this.tagManager.tags, eventHandler: this}, 
            this.highlightTag);

    $(".mislab-tag-container[data-mislab-id="+inputId+"] .mislab-existing-tags").on('mouseout',"li", 
            {tags: this.tagManager.tags, eventHandler: this}, 
            this.unhighlightTag);

     $("*").on('click', null, {tags: this.tagManager.tags, eventHandler: this}, this.hideList);

    $(".mislab-tag-container[data-mislab-id="+inputId+"] .mislab-existing-tags").on("click", "li", {tags: this.tagManager.tags, eventHandler: this}, 
            this.selectTag  
    );

    $(".mislab-tag-container[data-mislab-id="+inputId+"] .list").on("click",".remove-tag", { tags: this.tagManager.tags, eventHandler: this }, 
            this.removeTag
    );

    $(".mislab-tag-container[data-mislab-id="+inputId+"] .list .remove-tag").on("click", { tags: this.tagManager.tags, eventHandler: this }, 
            this.removeTag
    );
            
}

MislabTagEventHandler.prototype.autocompleteTag = function(event) {
    var eventHandler = event.data.eventHandler;
    event.preventDefault();
    event.stopPropagation();
    switch(event.keyCode) {
        case 38:
            event.preventDefault();
            eventHandler.tagManager.highlightUp();
            break;
        case 40:
            event.preventDefault();
            eventHandler.tagManager.highlightDown();
            break;
       case 13:
            if($(this).closest('.mislab-tag-container[data-mislab-id='+eventHandler.tagManager.inputId+']').find(".highlighted").length == 0)
            {
                eventHandler.tagManager.enterTag($(this).val());
            } else {
                eventHandler.tagManager.selectTag($(this).closest('.mislab-tag-container[data-mislab-id='+eventHandler.tagManager.inputId+']').find(".highlighted").text());
            }
            break;
       default:
            var tags = event.data.tags;
            var str = $(this).val();
            var tagsActive = []
            if(str.length != 0) {
                for(index in tags) {
                    if(tags[index].label.search(str) != -1) {
                        tagsActive.push(tags[index]);
                    }
                }
            }
            eventHandler.tagManager.displayTagList(tagsActive);
    }   
}

MislabTagEventHandler.prototype.highlightTag = function(event) {
    var eventHandler = event.data.eventHandler;
    eventHandler.tagManager.highlightTag($(this));
}

MislabTagEventHandler.prototype.unhighlightTag = function(event) {
    var eventHandler = event.data.eventHandler;
    eventHandler.tagManager.unhighlightTag($(this));
}

MislabTagEventHandler.prototype.hideList = function(event)
{
        var eventHandler = event.data.eventHandler;
        if($(this).closest('.mislab-tag-container[data-mislab-id='+eventHandler.tagManager.inputId+']').length == 0) {
            eventHandler.tagManager.hideList();
        } else if($(this).closest('.mislab-existing-tags').length == 0) {
            event.stopPropagation();
        }
    
}

MislabTagEventHandler.prototype.selectTag = function(event)
{
    var eventHandler = event.data.eventHandler;
    eventHandler.tagManager.selectTag($(this).text());
}

MislabTagEventHandler.prototype.removeTag = function(event)
{
    var eventHandler = event.data.eventHandler;
    eventHandler.tagManager.removeTag($(this).closest(".selected-tag").attr('data-label'));
}