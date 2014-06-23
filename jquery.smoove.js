/*! jQuery Smoove v0.2 | (c) 2014 Adam Bouqdib | abemedia.co.uk/license */
(function ($){

    $.fn.smoove = function (options){
        var settings = $.extend({}, $.fn.smoove.defaults, options);
        settings.items = $(this);
        if($('body').width() == $(window).width()) $('body').css('overflow-x','hidden');
        $(window).on('scroll resize', function() { $.fn.smoove.init(settings) });
        $.fn.smoove.init(settings);
    };

    $.fn.smoove.defaults = {
        offset: 50,
        move: false,
        moveX: false,
        moveY: false,
        moveZ: false,
        rotate: false,
        rotateX: false,
        rotateY: false,
        scale: false,
        opacity: 0,
        transition: "all 1s ease, opacity 1.5s ease",
        transformStyle: 'preserve-3d',
        transformOrigin: false,
        perspective: 1000
    };

    $.fn.smoove.init = function (settings){
        settings.items.each(function() {
            $item = $(this);
            params = $.extend({}, settings, $item.data());
            
            $item.css({
                WebkitTransition : params.transition.replace('transform','-webkit-transform'),
                MozTransition    : params.transition.replace('transform','-moz-transform'),
                OTransition      : params.transition.replace('transform','-o-transform'),
                transition       : params.transition
            });
            if(!$item.data('offsettop')) $item.data('offsettop', $item.offset().top);
            itemtop = $(window).scrollTop() + $(window).height() - $item.data('offsettop');
            
            if(itemtop < params.offset) {
                if(params.opacity !== false) $item.css({opacity: params.opacity});
                var transforms = [];
                if(params.move) transforms['translate'] = params.move;
                if(params.moveX) transforms['translateX'] = params.moveX;
                if(params.moveY) transforms['translateY'] = params.moveY;
                if(params.moveZ) transforms['translateZ'] = params.moveZ;
                if(params.rotate) transforms['rotate'] = params.rotate + 'deg';
                if(params.rotateX) transforms['rotateX'] = params.rotateX + 'deg';
                if(params.rotateY) transforms['rotateY'] = params.rotateY + 'deg';
                if(params.scale !== false) transforms['scale'] = params.scale;
                transform = '';
                for(i in transforms) {
                    transform += i + '(' + transforms[i] + ') ';
                }
                
                if(params.moveZ || params.rotateX || params.rotateY){
                    $item.parent().css({             
                        WebkitPerspective : params.perspective,
                        MozTransformPerspective : params.perspective,
                        MsTransformPerspective : params.perspective,
                        OTransformPerspective : params.perspective,
                        transformPerspective : params.perspective
                        /*,
                        WebkitTransformStyle : params.transformstyle,
                        MozTransformStyle : params.transformstyle,
                        MsTransformStyle : params.transformstyle,
                        OTransformStyle : params.transformstyle,
                        transformStyle : params.transformstyle
                        */
                    });
                }
                if(transform) {
                    $item.css({
                        WebkitTransform : transform,
                        MozTransform : transform,
                        MsTransform : transform,
                        OTransform : transform,
                        transform : transform
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
                    opacity : 1,
                    WebkitTransform : '',
                    MozTransform    : '',
                    MsTransform     : '',
                    OTransform      : '',
                    transform       : '',  
                });
            }
        });
    };

}( jQuery ));
