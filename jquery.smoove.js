(function($) {
	$.fn.smoove = function(options) {
		options = $.extend({
			offset: 50,
			left: false,
			right: false,
			top: false,
			bottom: false,
			opacity: 0,
			transition: "margin 0.3s ease-in, opacity 0.7s ease-in"
		}, options);
        
        if($('body').width() == $(window).width()) $('body').css('overflow-x','hidden');
        
        var $items = $(this);
        function smooveIt() { 
            $items.each(function() {
                params = $.extend(options, $(this).data());
                $(this).css({
                    WebkitTransition : params.transition,
                    MozTransition    : params.transition,
                    MsTransition     : params.transition,
                    OTransition      : params.transition,
                    transition       : params.transition
                });
                itemtop = $(window).scrollTop() + $(window).height() - $(this).offset().top;
                    
                if(itemtop < params.offset - params.top) {
                    $(this).css({
                        opacity: params.opacity,
                        position: 'relative'
                    });
                    if(params.top) {
                        $(this).css('margin-top', params.top);
                        $(this).css('margin-bottom', -params.top);
                    }
                    else if(params.bottom) {
                        $(this).css('margin-bottom', params.bottom);
                        $(this).css('margin-top', -params.bottom);
                    }
                    if(params.left) {
                        $(this).css('margin-left', params.left);
                        $(this).css('margin-right', -params.left);
                    }
                    else if(params.right) {
                        $(this).css('margin-right', params.right);
                        $(this).css('margin-left', -params.right);
                    }
                }
                else {
                    $(this).css({
                        opacity : 1,
                        margin: '',
                        position: ''
                    });
                }
            });
        }
        $(window).scroll(function() { smooveIt(); });
        $(window).resize(function() { smooveIt(); });
        smooveIt();
    }
})(jQuery);
