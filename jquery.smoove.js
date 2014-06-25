/*! jQuery Smoove v0.2.4 | (c) 2014 Adam Bouqdib | abemedia.co.uk/license */
(function ($, window){
    
    $.fn.smoove = function (options){
        $.fn.smoove.init(this, $.extend({}, $.fn.smoove.defaults, options));
    };
    
    $.fn.smoove.items = [];
    $.fn.smoove.loaded = false;
    
    $.fn.smoove.defaults = {
        offset: 150,
        opacity: 0,
        transition: "all 1s ease, opacity 1.5s ease",
        transformStyle: 'preserve-3d',
        transformOrigin: false,
        perspective: 1000
    };

    $.fn.smoove.init = function (items, settings){
        
        // naughty way of avoiding vertical scrollbars when items slide in/out from the side
        if($('body').width() == $(window).width()) $('body').css('overflow-x','hidden');
        
        items.each(function() {
            $item = $(this);
            params = $item.params = $.extend({}, settings, $item.data());
            
            // css transition - if using transform add vendor prefixes
            params.transition = {
                WebkitTransition : params.transition.replace('transform','-webkit-transform'),
                MozTransition    : params.transition.replace('transform','-moz-transform'),
                OTransition      : params.transition.replace('transform','-o-transform'),
                transition       : params.transition
            }
            $item.css(params.transition);
            $item.data('top', $item.offset().top);
            
            $.fn.smoove.items.push($item);
        });
        
        // function for adding vendor prefixes
        function crossBrowser(property, value) {
            function ucase(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            properties = {}
            properties['Webkit' + ucase(property)] = value,
            properties['Moz' + ucase(property)] = value,
            properties['Ms' + ucase(property)] = value,
            properties['O' + ucase(property)] = value,
            properties[property] = value
            
            return properties;
        }
        
        // add event handlers
        if(!$.fn.smoove.loaded) {
            $.fn.smoove.loaded = true;
            
            var didScroll = false,
                didResize = false,
                oldScroll = 0,
                oldHeight = $(window).height(),
                oldWidth = $(window).width(),
                oldDocHeight = $(document).height(),
                direction,
                resizing;
                
            $(window).resize(function() {
                clearTimeout(resizing);
                resizing = setTimeout(function() {
                    var height = $(window).height(),
                        width = $(window).width(),
                        direction = (oldHeight > height) ? direction = 'up' : 'down',
                        oldHeight = height;
                    
                    // responsive support - reassign position values on resize
                    if(oldWidth !== width) {
                        for(i in $.fn.smoove.items) {
                            $.fn.smoove.items[i].css(crossBrowser('transform', '')).css(crossBrowser('transition', ''));
                        }
                        
                        // wait for responsive magic to finish
                        var stillResizing = self.setInterval(function() {
                            var docHeight = $(document).height();
                            if(docHeight == oldDocHeight) {
                                window.clearInterval(stillResizing);
                                for(i in $.fn.smoove.items) {
                                    $item = $.fn.smoove.items[i];
                                    $item.data('top', $item.offset().top);
                                    $item.css($item.params.transition);
                                }
                                smooveIt(direction);
                            }
                            oldDocHeight = docHeight;
                        }, 500);
                    } 
                    else smooveIt(direction);
                    oldWidth = width;
                }, 500);
            });
            
            $(window).on('load', function() {
                smooveIt();
            })
            
            // throttle scroll handler
            .scroll(function() {
                didScroll = true;
            });
            setInterval(function() {
                if ( didScroll ) {
                    didScroll = false;
                    var scrolltop = $(window).scrollTop(),
                    direction = (scrolltop < oldScroll) ? direction = 'up' : 'down';
                    oldScroll = scrolltop;
                    smooveIt(direction);
                }
            }, 250);
        }
        
        function smooveIt(direction) {
            for(i in $.fn.smoove.items) {
                var $item = $.fn.smoove.items[i],
                    params = $item.params,
                    // if direction isn't set, set offset to 0 to avoid hiding objects that are above the fold
                    offset = (direction) ? params.offset : 0,
                    itemtop = $(window).scrollTop() + $(window).height() - $item.data('top');
                
                if(itemtop < offset) {
                    if(params.opacity !== false) $item.css({opacity: params.opacity});
                    
                    var transforms = [],
                        properties = ['move','move3D','moveX','moveY','moveZ','rotate','rotate3d','rotateX','rotateY','rotateZ','scale','scale3d','scaleX','scaleY','skew','skewX','skewY'];
                        
                    for(i in properties) {
                        if(typeof params[properties[i]] !== "undefined") transforms[properties[i]] = params[properties[i]];
                    }
                    
                    transform = '';
                    for(i in transforms) {
                        transform += i.replace('move', 'translate') + '(' + transforms[i] + ') ';
                    }
                    console.log(crossBrowser('transform', transform));
                    if(transform) {
                        $item.css(crossBrowser('transform', transform));
                        $item.parent().css(crossBrowser('perspective', params.perspective));
                        //$item.parent().css(crossBrowser('transformStyle', params.transformstyle));
                    
                        if(params.transformOrigin) {
                            $item.css(crossBrowser('transformOrigin', params.transformOrigin));
                        }
                    }
                }
                else {
                    $item.css('opacity', 1).css(crossBrowser('transform', ''));
                }
            }
            
        }
    };

}( jQuery, window ));
