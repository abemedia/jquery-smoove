/*! jQuery Smoove v0.2.1 | (c) 2014 Adam Bouqdib | abemedia.co.uk/license */
(function ($, window){
    
    $.fn.smoove = function (options){
        var settings = $.extend({}, $.fn.smoove.defaults, options);
        $.fn.smoove.init(this, settings);
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
            $item.data('offsettop', $item.offset().top);
            
            $.fn.smoove.items.push($item);
        });
        
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
                    
                    if(oldWidth !== width) {
                        for(i in $.fn.smoove.items) {
                            $($.fn.smoove.items[i]).css({
                                WebkitTransform  : '',
                                MozTransform     : '',
                                MsTransform      : '',
                                OTransform       : '',
                                transform        : '',
                                WebkitTransition : '',
                                MozTransition    : '',
                                OTransition      : '',
                                transition       : ''
                            });
                        }
                        
                        var stillResizing = self.setInterval(function() {
                            var docHeight = $(document).height();
                            if(docHeight == oldDocHeight) {
                                window.clearInterval(stillResizing);
                                console.log('yes');
                                for(i in $.fn.smoove.items) {
                                    $item = $.fn.smoove.items[i];
                                    $item.data('offsettop', $item.offset().top);
                                    $item.css($item.params.transition);
                                }
                                $.fn.smoove.scroll(direction);
                            }
                            oldDocHeight = docHeight;
                        }, 500);
                    } 
                    else $.fn.smoove.scroll(direction);
                    oldWidth = width;
                }, 500);
            });
            
            $(window).scroll(function() {
                didScroll = true;
            })
            .on('load', function() {
                $.fn.smoove.scroll();
            });
            
            setInterval(function() {
                if ( didScroll ) {
                    didScroll = false;
                    var scrolltop = $(window).scrollTop(),
                    direction = (scrolltop < oldScroll) ? direction = 'up' : 'down';
                    oldScroll = scrolltop;
                    $.fn.smoove.scroll(direction);
                }
            }, 250);
        }
    };

    $.fn.smoove.scroll = function (direction) {
        for(i in $.fn.smoove.items) {
            var $item = $.fn.smoove.items[i],
                params = $item.params,
                // if direction isn't set, set offset to 0 to avoid hiding objects that already were in the view
                offset = (direction) ? params.offset : 0,
                itemtop = $(window).scrollTop() + $(window).height() - $item.data('offsettop');
            
            if(itemtop < offset) {
                if(params.opacity !== false) $item.css({opacity: params.opacity});
                var transforms = [];
                if(typeof params.move !== "undefined") transforms['translate'] = params.move;
                if(typeof params.moveX !== "undefined") transforms['translateX'] = params.moveX;
                if(typeof params.moveY !== "undefined") transforms['translateY'] = params.moveY;
                if(typeof params.moveZ !== "undefined") transforms['translateZ'] = params.moveZ;
                if(typeof params.rotate !== "undefined") transforms['rotate'] = params.rotate + 'deg';
                if(typeof params.rotateX !== "undefined") transforms['rotateX'] = params.rotateX + 'deg';
                if(typeof params.rotateY !== "undefined") transforms['rotateY'] = params.rotateY + 'deg';
                if(typeof params.scale !== "undefined") transforms['scale'] = params.scale;
                transform = '';
                for(i in transforms) {
                    transform += i + '(' + transforms[i] + ') ';
                }
                
                if(params.moveZ || params.rotateX || params.rotateY){
                    $item.parent().css({             
                        WebkitPerspective : params.perspective,
                        MozPerspective : params.perspective,
                        MsPerspective  : params.perspective,
                        OPerspective   : params.perspective,
                        perspective    : params.perspective
                        /*,
                        WebkitTransformStyle : params.transformstyle,
                        MozTransformStyle    : params.transformstyle,
                        MsTransformStyle     : params.transformstyle,
                        OTransformStyle      : params.transformstyle,
                        transformStyle       : params.transformstyle
                        */
                    });
                }
                if(transform) {
                    $item.css({
                        WebkitTransform : transform,
                        MozTransform    : transform,
                        MsTransform     : transform,
                        OTransform      : transform,
                        transform       : transform
                    });
                }
                if(params.transformOrigin) {
                    $item.css({
                        WebkitTransformOrigin : params.transformOrigin,
                        MozTransformOrigin    : params.transformOrigin,
                        MsTransformOrigin     : params.transformOrigin,
                        OTransformOrigin      : params.transformOrigin,
                        transformOrigin       : params.transformOrigin
                    });
                }
            }
            else {
                $item.css({
                    opacity         : 1,
                    WebkitTransform : '',
                    MozTransform    : '',
                    MsTransform     : '',
                    OTransform      : '',
                    transform       : '',  
                });
            }
        }
        
    };

}( jQuery, window ));
