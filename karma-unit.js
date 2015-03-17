var auth = require('./auth');

module.exports = function (karma) {

  var customLaunchers = {
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  };

  karma.set({

    basePath: './',

    files: [
      'browzr.js',
      'tests/spec.js'
    ],

    frameworks: [ 'jasmine' ],

    plugins: [
      'karma-jasmine',
      'karma-sauce-launcher',
      'karma-chrome-launcher'
    ],

    reporters: [ 'dots', 'saucelabs' ],

    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    sauceLabs: {
      testName: 'Initial SL test setup',
      username: auth.sauce_username,
      accessKey: auth.sauce_key,
      connectOptions: {
        username: auth.sauce_username,
        accessKey: auth.sauce_key,
        verbose: true
      }
    },

    customLaunchers: customLaunchers,
    browsers: [
      'sl_ie_11'
    ]
  });
};