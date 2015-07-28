// Karma configuration
// Generated on Tue Oct 28 2014 14:54:35 GMT+0200 (South Africa Standard Time)

module.exports = function (config) {
	config.set({

		           // base path that will be used to resolve all patterns (eg. files, exclude)
		           basePath: '',


		           // frameworks to use
		           // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		           frameworks: ['jasmine'],


		           // list of files / patterns to load in the browser
		           files: [
					   "http://fb.me/react-0.11.2.js",
				   "js/collections.js",
					"js/TypedReact.js",
					"js/Debug.js",
					"js/Reflector.js",
					"js/Injector.js",
					"js/Signals.js",
					"js/MVC.js",
					"js/ReactMediatorMap.js",
					"js/model/FlipFlopModel.js",
					"js/model/BowlingGameRollModel.js",
					"js/ui/ViewBase.js",
					"js/ui/LifecycleSignalMixin.js",
					"js/ui/BatManView.js",
					"js/ui/BowlingGameView.js",
					"js/ui/ButtonView.js",
					"js/ui/BatManMediator.js",
					"js/ui/BowlingGameMediator.js",
					"js/ui/ButtonMediator.js",
					"js/controller/SetupViewCommand.js",
					"js/controller/LogModelUpdateCommand.js",

					   "js/ui/BowlingGameViewTests.js"
		           ],


		           // list of files to exclude
		           exclude: [
		           ],


		           // preprocess matching files before serving them to the browser
		           // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		           preprocessors: {
		           },


		           // test results reporter to use
		           // possible values: 'dots', 'progress'
		           // available reporters: https://npmjs.org/browse/keyword/karma-reporter
		           reporters: ['progress'],


		           // web server port
		           port: 9876,


		           // enable / disable colors in the output (reporters and logs)
		           colors: true,


		           // level of logging
		           // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		           logLevel: config.LOG_INFO,


		           // enable / disable watching file and executing tests whenever any file changes
		           autoWatch: true,


		           // start these browsers
		           // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		           browsers: ['ChromeCanary'],


		           // Continuous Integration mode
		           // if true, Karma captures browsers, runs the tests and exits
		           singleRun: false
	           });
};
