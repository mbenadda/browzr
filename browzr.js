// UMD -- returnExports.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.returnExports = factory();
}
}(this, function () {

  function detectBrowser (window) {
    var userAgent = window.navigator.userAgent;

    /**
     * This is not an absolute check but it can give us some confidence regarding Firefox and IE detection :
     * if 3 or more properties start with 'moz' or 'ms' we can assume Firefox and IE respectively.
     */
    function checkPropertyPrefix (prefix) {
      var prop, certainty;

      function searchIn (obj) {
        for (prop in obj) {
          if (prop.toLowerCase().indexOf(prefix) === 0) {
            certainty++;
          }
        }
      }

      searchIn(window);
      searchIn(window.navigator);

      return certainty >= 3;
    }


    /**
     * Browser version parsing functions. Those are dumb functions that just parse the user agent string
     * and return a version number if such a thing can be found.
     * For consistency they return an empty string if no match is found.
     */

    function chromeVersion () {
      return userAgent.match(/Chrome\/(\d+)/)[1] || '';
    }

    function firefoxVersion () {
      return userAgent.match(/Firefox\/(\d+)/)[1] || '';
    }

    function ieVersion () {
      return 
        /Trident\/7\.0/.test(userAgent) ? '11' :
        /Trident\/6\.0/.test(userAgent) ? '10' :
        /Trident\/5\.0/.test(userAgent) : '9'  :
        /Trident\/4\.0/.test(userAgent) : '8'  :
        '';
    }

    
    /**
     * Actual browser checking functions. Those should return either false if they do not match, or an array
     * with a pretty browser name and a version string.
     */

    // GOOGLE CHROME
    // For Chrome it is easier to check desktop and mobile versions separately and aggregate them
    // to test for Chromeness, than the other way around
    function isChrome () {

      function isChromeDesktop () {
        // Only chrome for desktop exposes webstore
        if (window.chrome && window.chrome.webstore) {
          return [ 'Google Chrome', chromeVersion() ];
        }
        return false;
      }

      function isChromeMobile () {
        // Chrome mobile and Opera both expose window.chrome
        // However Chrome Mobile does not pretend to be Opera
        if (window.chrome && !window.chrome.webstore && !/OPR/.test(userAgent)) {
          return [ 'Google Chrome', chromeVersion() ];
        }
        return false;
      }

      return isChromeMobile() || isChromeDesktop();
    }

    // INTERNET EXPLORER
    function isInternetExplorer () {
      return checkPropertyPrefix('ms') && [ 'Internet Explorer', ieVersion() ];
    }

    // MOZILLA FIREFOX
    function isFirefox () {
      return checkPropertyPrefix('moz') && [ 'Mozilla Firefox', firefoxVersion() ];
    }
  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
