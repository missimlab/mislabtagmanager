module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: { 
        files: [{
            src: 'src/js/*.js',
            dest: 'compiled/js/mislab-tagmanager.min.js'
        }]
      }
    },
    less: {
      development: {
        files: {
          'compiled/css/mislab-tagmanager-chosen-like.css': 'src/css/less/mislab-tagmanager-chosen-like.less'
        }
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less']);

};