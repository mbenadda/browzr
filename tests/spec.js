describe('Browzr', function () {
  'use strict';

  it('should exist and be bound to the window', function () {
    expect(window.browzr).toBeDefined();
  });

  it('should detect the browser correctly', function () {

    var browser = window.browzr.isChrome() ||
                  window.browzr.isFirefox() ||
                  window.browzr.isInternetExplorer();

    expect(browser).toEqual([ 'Internet Explorer', '11' ]);
  });

});