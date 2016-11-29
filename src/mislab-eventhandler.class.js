MislabTagEventHandler = function(inputId) {
    this.inputId = inputId;
}

MislabTagEventHandler.prototype.registerEvents = function() {
    $(".mislab-tag-container[data-mislab-id="+this.inputId+"]").on("keyup", this.autocompleteTag);
}

MislabTagEventHandler.prototype.autocompleteTag = function() {
    console.log("Event fired");
}