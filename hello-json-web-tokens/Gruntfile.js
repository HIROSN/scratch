'use strict';

module.exports = function(grunt) {
  var srcFiles = ['*.js'];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      files: srcFiles,
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: srcFiles,
      options: {
        preset: 'google'
      }
    }
  });

  grunt.registerTask('default',  ['jshint', 'jscs']);
};
