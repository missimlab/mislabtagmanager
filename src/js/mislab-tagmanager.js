(function($) {  
  var MislabNamespace = MislabNamespace || {};  

    $.fn.mislabtag = function(action, options) {
        var mislabtagSettings = $.extend({}, options);

        manager = new MislabTagManager();
        manager.init(this, mislabtagSettings);
        return this;
    };

    $.fn.mislabtagDefaults = {
            ajax_enabled: false,
            create: true,
            multiple: true,
            placeholder: "Enter tag here...",
            limit: 10,
            limit_pagination: 5,
            autocomplete_url: false
    }
}(jQuery));