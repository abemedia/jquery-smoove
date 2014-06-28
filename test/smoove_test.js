(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#smoove', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      this.elem1 = $('#t1');
      this.elem2 = $('#t2');
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    equal(this.elems.smoove(), this.elems, 'should be chainable');
  });

  test('adds transition styles', function() {
    expect(1);
    ok(this.elem1.smoove().attr('style').indexOf('transition') !== -1, 'should add transition styles');
  });

  test('adds parameter styles', function() {
    this.elems.smoove({rotate:'180deg'});
    this.elem2.data('top', 200000);
    $(window).trigger('load');
    stop();
    setTimeout(function(){
        start();
        ok($('#t2').attr('style').indexOf('rotate(180deg)') !== -1, 'should add parameter styles');
    }, 100);
  });

  test('adds data attribute styles', function() {
    this.elems.smoove();
    this.elem2.data('top', 200000);
    $(window).trigger('load');
    ok(this.elem2.attr('style').indexOf('translate(10px, 10px)') !== -1, 'should add data-attribute styles');
  });

}(jQuery));
