// karma.conf.js
module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
        'https://code.angularjs.org/1.7.9/angular.js',
        'https://code.angularjs.org/1.7.9/angular-mocks.js',
        'app.js',
        'notelist.controller.js'
      ],
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true
    });
  };