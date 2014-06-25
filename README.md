jQuery Smoove - Gorgeous CSS3 Scroll Effects
=============

Smoove makes it easy to implement awesome CSS3 transition effects, making your content smoothly glide into the page as your scroll down the page.

## Usage

jQuery Smoove needs to be activated via JavaScript.

```javascript
$('.foo').smoove(options);
```
This will initiate jQuery Smoove on the `.foo` elements with the default settings. Options can however be overridden on individual objects via data-attributes as outlined in the following example.

```html
<div class="foo"></div>
<div class="bar" data-move-x="-200px" data></div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="jquery.smoove.min.js"></script>
<script>
  // Attach Smoove to elements and set default options
  $(".foo, .bar").smoove({
    offset  : '15%',
    // moveX is overridden to -200px for ".bar" object
    moveX   : '100px',
    moveY   : '100px',
  });
</script>
```

Also note that when defining parameters via data-attributes, CamelCase names are split with hyphens e.g. `moveX` becomes `data-move-x`.


## Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `offset`  | integer or string e.g. `10%`  | 150 | Distance to the bottom of the screen before object glides into view. |
| `opacity` | integer (0-100) | 0 | The opacity of the object before it comes into view. ' |
| `perspective` | integer | 1000 | 3D perspective in pixels. |
| `transformOrigin` | string | `50% 50%` | Origin of the transformin pixel, percentage or keyword (left, right, top or bottom) |
| `skewY`   | angle (e.g. `90deg`) | none | 2D skew along Y-axis |
| `move`    | string (e.g. `100px,50%`) | none | 2D move along the X- and the Y-axis |
| `move3d`  | string (e.g. `10px,10px,10px`) | none | 3D move along the X-, Y- and the Z-axis |
| `moveX`   | string (e.g. `10px` or `10%`) (e.g. 10px or 10%) | none | Move the object along its X axis |
| `moveY`   | string (e.g. `10px` or `10%`) | none | Move the object along its Y axis |
| `moveZ`   | string (e.g. `10px` or `10%`) | none | Move the object along its Z axis |
| `rotate`  | string (e.g. `90deg`) | none | 2D rotation |
| `rotate3d`| string (e.g. `1,1,1,90deg`) | none | 3D rotation along X-, Y- and Z-axis |
| `rotateX` | string (e.g. `90deg`) | none | 3D rotation along X-axis |
| `rotateY` | string (e.g. `90deg`) | none | 3D rotation along Y-axis |
| `rotateZ` | string (e.g. `90deg`) | none | 3D rotation along Z-axis |
| `scale`   | decimal or string (e.g. `2.5` or `2,0.5`) | none | 2D scale on X- and Y-axis (x,y) |
| `scale3d` | string (e.g. `2,3,0.5`) | none | 3D scale on X-, Y- and Z-axis (x,y,z) |
| `scaleX`  | decimal | none | 2D scale on X-axis |
| `scaleY`  | decimal | none | 2D scale on Y-axis |
| `skew`    | angle (e.g. `90deg,90deg`) | none | 2D skew along X- and the Y-axis |
| `skewX`   | angle (e.g. `90deg`) | none | 2D skew along X-axis |
| `skewY`   | angle (e.g. `90deg`) | none | 2D skew along Y-axis |
 

## Examples

Visit [ABE Media Web Design](http://abemedia.co.uk) to see the plugin in action.


## Copyright

&copy; 2014 Adam Bouqdib - http://abemedia.co.uk