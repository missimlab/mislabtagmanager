MislabTagEventHandler = function(tagManager,options) {
    this.options = {
        "ajax_automplete" : false
    };
    this.tagManager = tagManager;
}

MislabTagEventHandler.prototype.registerEvents = function(inputId) {
    var self = this;
    $(".mislab-tag-container[data-mislab-id="+inputId+"] .enter-tag").on("keyup",  null, {tags: this.tagManager.tags, eventHandler: this}, this.autocompleteTag);
}

MislabTagEventHandler.prototype.autocompleteTag = function(event) {
    var eventHandler = event.data.eventHandler;
    switch(event.keyCode) {
        case 38:
            event.preventDefault();
            eventHandler.tagManager.highlightUp();
            break;
        case 40:
            event.preventDefault();
            eventHandler.tagManager.highlightDown();
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