module.exports = function(grunt) {
  grunt.initConfig({
    test: {
      files: ['less_test.js']
    },
    less: {
      test: {
        src: 'fixtures/test.less',
        dest: 'fixtures/output/test.css'
      }
    }
});

  // Load local tasks.
  grunt.loadTasks('../tasks');

  grunt.registerTask('default', 'less test');
};
