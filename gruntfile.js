module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      js: {
        // A single entry point for our app
        src: './src/app.jsx',
        // Compile to a single file to add a script tag for in your HTML
        dest: './dist/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);
};
