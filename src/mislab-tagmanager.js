(function($) {
    $.fn.mislabtag = function(action, options) {
        var mislabtagSettings = $.extend({}, options);
        return this;
    };

    $.fn.mislabtagDefaults = {
            ajax_enabled: false,
            bootstrap_struct: false,
            create: true,
            multiple: true,
            placeholder: "Enter tag here...",
            bubblehelp: false,
            limit: 10,
            limit_pagination: 5,
            autocomplete_url: false
    }
}(jQuery));