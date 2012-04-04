/*
 * grunt-less
 * https://github.com/jachardi/grunt-less
 *
 * Copyright (c) 2012 Jake Harding
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  // Grunt utilities.
  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  // external dependencies
  var fs = require('fs');
  var path = require('path');
  var less = require('less');

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('less', 'Your task description goes here.', function() {
    var src = this.file.src;
    var dest = this.file.dest;
    var options = this.data.options || {};

    var done = this.async();

    utils.async.map(src, grunt.helper('less', options), function(err, results) {
      if (err) {
        grunt.warn(err);
        done(false);
      }

      file.write(dest, results.join('\n\n')); 
      done(true);
    });
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('less', function(options, callback) {
    return function(src, callback) {
      var parser = new less.Parser({
        paths: [path.dirname(src)]
      });

      var data = fs.readFileSync(src, 'utf8');
      parser.parse(data, function(err, tree) {
        if (err) {
          callback(err);
        }

        var css = tree.toCSS(options);
        callback(null, css);
      });
    };
  });
};
