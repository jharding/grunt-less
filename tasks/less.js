// grunt-less
// ----------
// * GitHub: https://github.com/jharding/grunt-less
// * Copyright (c) 2012 Jake Harding
// * Licensed under the MIT license.


module.exports = function(grunt) {
  // grunt utilities
  // ===============

  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  // dependencies
  // ============

  var fs = require('fs');
  var path = require('path');
  var less = require('less');

  // task
  // ====

  grunt.registerMultiTask('less', 'Compile LESS files.', function() {
    var src = this.file.src;
    var dest = this.file.dest;
    var options = this.data.options || {};

    if (!src) {
      grunt.warn('Missing src property.');
      return false;
    }

    if (!dest) {
      grunt.warn('Missing dest property');
      return false;
    }

    var srcFiles = file.expandFiles(src);

    var done = this.async();

    grunt.helper('less', srcFiles, options, function(err, css) {
      if (err) {
        grunt.warn(less.formatError ? less.formatError(err) : err);
        done(false);

        return;
      }

      file.write(dest, css);
      done();
    });
  });

  // helper
  // ======

  grunt.registerHelper('less', function(srcFiles, options, callback) {
    var compile = function(src, callback) {
      var parser = new less.Parser({
        paths: [path.dirname(src)],
        filename: src
      });

      // read source file
      fs.readFile(src, 'utf8', function(err, data) {
        if (err) {
          callback(err);
        }

        // send data from source file to LESS parser to get CSS
        verbose.writeln('Parsing ' + src);
        parser.parse(data, function(err, tree) {
          if (err) {
            callback(err);
          }

          var css = null;
          try {
            css = tree.toCSS({
              compress: options.compress,
              yuicompress: options.yuicompress
            });
          } catch(e) {
            callback(e);
            return;
          }

          callback(null, css);
        });
      });
    };

    utils.async.map(srcFiles, compile, function(err, results) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, results.join(utils.linefeed));
    });
  });
};
