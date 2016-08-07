(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      QUnit.module(name, {[setup][ ,teardown]})
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

  QUnit.module('jQuery#smoove', {
    // This will run before each test in this module.
    beforeEach: function() {
      this.elems = $('#qunit-fixture').children();
      this.elem1 = $('#t1');
      this.elem2 = $('#t2');
    }
  });

  QUnit.test('is chainable', function(assert) {
    assert.expect(1);
    // Not a bad test to run on collection methods.
    assert.equal(this.elems.smoove(), this.elems, 'should be chainable');
  });

  QUnit.test('adds transition styles', function(assert) {
    assert.expect(1);
    assert.ok(this.elem1.smoove().attr('style').indexOf('transition') !== -1, 'should add transition styles');
  });

  QUnit.test('adds parameter styles', function(assert) {
    this.elems.smoove({rotate:'180deg'});
    this.elem2.data('top', 200000);
    $(window).trigger('load');
    
    var done = assert.async();
    setTimeout(function(){
        assert.ok($('#t2').attr('style').indexOf('rotate(180deg)') !== -1, 'should add parameter styles');
        done();
    }, 100);
  });

  QUnit.test('adds data attribute styles', function(assert) {
    this.elems.smoove();
    this.elem2.data('top', 200000);
    $(window).trigger('load');
    assert.ok(this.elem2.attr('style').indexOf('translate(10px, 10px)') !== -1, 'should add data-attribute styles');
  });

}(jQuery));
