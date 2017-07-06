# jQuery Smoove - Gorgeous CSS3 Scroll Effects

Smoove makes it easy to implement awesome CSS3 transition effects, making your content smoothly glide into view as you scroll down the page.

[![CDNJS](https://img.shields.io/cdnjs/v/jquery-smoove.svg)](https://cdnjs.com/libraries/jquery-smoove)
[![Build Status](https://travis-ci.org/abeMedia/jquery-smoove.svg?branch=master)](https://travis-ci.org/abeMedia/jquery-smoove)
[![Dependency Status](https://dependencyci.com/github/abeMedia/jquery-smoove/badge)](https://dependencyci.com/github/abeMedia/jquery-smoove)


## Setup

### Load from CDN

The easiest way to get up and running is to load jQuery Smoove from [cdnjs](https://cdnjs.com/libraries/jquery-smoove). Make sure jQuery is loaded first though.

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-smoove/0.2.10/jquery.smoove.min.js"></script>
```

### Install with Bower

Use the following command to install jQuery Smoove using [bower](https://github.com/twitter/bower).

```
$ bower install jquery-smoove
```

Or simply add `jquery-smoove` to your project's `bower.json`.

``` json
  "dependencies": {
    "jquery-smoove": "latest"
  }
```

### Download

You can also just download the latest package.

- [Download latest version](https://github.com/abeMedia/jquery-smoove/archive/master.zip)
- or `curl -O https://raw.github.com/abeMedia/jquery-smoove/master/dist/jquery.smoove.js`

## Usage

jQuery Smoove needs to be activated via JavaScript.

```javascript
$('.foo').smoove(options);
```
This will initiate jQuery Smoove on the `.foo` elements with the default settings. Options can however be overridden on individual objects via data-attributes as outlined in the following example.

```html
<div class="foo"></div>
<div class="bar" data-move-x="-200px" data></div>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-smoove/0.2.10/jquery.smoove.min.js"></script>
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


### Options

| Name      | Type | Default | Description |
|-----------|------|---------|-------------|
| `min_width`  | integer  | 768 | Disable smoove on screens with less pixel width. |
| `min_height`  | integer  | none | Disable smoove on screens with less pixel height. |
| `offset`  | integer or string  | 150 | Distance to the bottom of the screen before object glides into view e.g. `10%`. |
| `opacity` | integer (0-100) | 0 | The opacity of the object before it comes into view. |
| `perspective` | integer | 1000 | 3D perspective in pixels. |
| `transformOrigin` | string | `50% 50%` | Origin of the transform in pixel, percentage or keyword (left, right, top or bottom). |
| `skewY`   | angle | none | 2D skew along Y-axis e.g. `90deg`. |
| `move`    | string | none | 2D move along the X- and the Y-axis e.g. `100px,50%`. |
| `move3d`  | string | none | 3D move along the X-, Y- and the Z-axis e.g. `10px,10px,10px`. |
| `moveX`   | string | none | Move the object along its X axis e.g. `10px` or `10%`. |
| `moveY`   | string | none | Move the object along its Y axis e.g. `10px` or `10%`. |
| `moveZ`   | string | none | Move the object along its Z axis e.g. `10px` or `10%`. |
| `rotate`  | string | none | 2D rotation e.g. `90deg`. |
| `rotate3d`| string | none | 3D rotation along X-, Y- and Z-axis e.g. `1,1,1,90deg`. |
| `rotateX` | string | none | 3D rotation along X-axis e.g. `90deg`. |
| `rotateY` | string | none | 3D rotation along Y-axis e.g. `90deg`. |
| `rotateZ` | string | none | 3D rotation along Z-axis e.g. `90deg`. |
| `scale`   | decimal or string  | none | 2D scale on X- and Y-axis (x,y) (e.g. `2.5` or `2,0.5`). |
| `scale3d` | string | none | 3D scale on X-, Y- and Z-axis (x,y,z) (e.g. `2,3,0.5`). |
| `scaleX`  | decimal | none | 2D scale on X-axis. |
| `scaleY`  | decimal | none | 2D scale on Y-axis. |
| `skew`    | angle | none | 2D skew along X- and the Y-axis (e.g. `90deg,90deg`). |
| `skewX`   | angle | none | 2D skew along X-axis e.g. `90deg`. |
| `skewY`   | angle | none | 2D skew along Y-axis e.g. `90deg`. |


## Demo

Visit [ABE Media Web Design](http://abemedia.co.uk) and scroll down the page to see the plugin in action.


## Copyright

&copy; 2014 - 2017 Adam Bouqdib - http://abemedia.co.uk
