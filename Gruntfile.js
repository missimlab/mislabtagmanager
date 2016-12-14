module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: { 
        files: [{
            src: 'src/*.js',
            dest: 'compiled/mislab-tagmanager.min.js'
        }]
      }
    },
    src_files: ['src/*.js'],
    dest_files: ['compiled/*.min.js']
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};