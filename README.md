[![build status](https://secure.travis-ci.org/jharding/grunt-less.png)](http://travis-ci.org/jharding/grunt-less)
grunt-less (deprecated)
==========

This grunt plugin has been [deprecated](https://github.com/jharding/grunt-less/issues/15). If you're looking for a less grunt plugin, check out [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less).

Getting Started
---------------

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-less`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-less');
```

[npm_registry_page]: http://search.npmjs.org/#/grunt-less
[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

Documentation
-------------

This task is a [multi task][types_of_tasks], meaning that grunt will automatically iterate over all `less` targets if a target is not specified.

### Target Properties
*   __src__*(required)*: The LESS file(s) to be compiled. Can be either a string or an array of strings. If more than one LESS file is provided, each LESS file will be compiled individually and then concatenated together.
*   __dest__*(required)*: The path where the output from the LESS compilation should be placed. Must be a string as there can be only one destination.
*   __options__*(optional)*: An object of LESS options. As of right now, the only options supported are `compress` and `yuicompress`.

### Example

```javascript
// project configuration
grunt.initConfig({
  less: {
    signup: {
      src: 'signup.less',
      dest: 'signup.css'
    },
    homepage: {
      src: ['banner.less', 'app.less'],
      dest: 'homepage.css',
      options: {
        yuicompress: true
      }
    },
    all: {
      src: '*.less',
      dest: 'all.css',
      options: {
        compress: true
      }
    }
  }
});
```

[types_of_tasks]: https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md

Contributing
------------

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

Release History
---------------
*   __08/28/2012 - 0.1.6__: Remove grunt as a dependency.
*   __06/14/2012 - 0.1.5__: Added test cases. 
*   __04/08/2012 - 0.1.4__: Refactored the code to make the helper function more usable. 
*   __04/08/2012 - 0.1.3__: Added `gruntplugin` keyword to be [consistent with other plugins](https://github.com/cowboy/grunt/issues/111).
*   __04/05/2012 - 0.1.2__: Added support for wildcard patterns and normalizing linefeeds for concatenation. 
*   __04/04/2012 - 0.1.1__: Checking to see if the `src` and `dest` properties are defined. Also now accept a string for `src` and not just an array of strings.
*   __04/04/2012 - 0.1.0__: Initial release.

License
-------

Copyright (c) 2012 Jake Harding  
Licensed under the MIT license.
