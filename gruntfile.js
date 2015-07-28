module.exports = function (grunt) {

	grunt.loadNpmTasks("grunt-ts");

	grunt.initConfig({
		                 ts: {
			                 // A specific target
			                 build: {
				                 // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
				                 src: ["js/**/*.ts", "defs/**/*.ts"],
				                 // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
				                 //html: ["test/work/**/*.tpl.html"],
				                 // If specified, generate this file that to can use for reference management
				                 reference: "js/reference.ts",
				                 // If specified, generate an out.js file which is the merged js file
				                 //out: 'test/out.js',
				                 // If specified, the generate JavaScript files are placed here. Only works if out is not specified
				                 outDir: 'out',
				                 // If specified, watches this directory for changes, and re-runs the current target
				                 watch: 'js',
				                 // Use to override the default options, http://gruntjs.com/configuring-tasks#options
				                 options: {
					                 // 'es3' (default) | 'es5'
					                 target: 'es5',
					                 // 'amd' (default) | 'commonjs'
					                 //module: 'amd',
					                 // true (default) | false
					                 sourceMap: true,
					                 // true | false (default)
					                 declaration: false,
					                 // true (default) | false
					                 removeComments: true
				                 }
			                 },
			                 dist: {
				                 src: ["test/work/**/*.ts"],
				                 // Override the main options for this target
				                 options: {
					                 sourceMap: false
				                 }
			                 }
		                 }
	                 });

	grunt.registerTask("default", ["ts:build"]);
};
