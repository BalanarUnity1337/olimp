'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      style: {
        files: {
          'css/style.css': ['sass/style.scss'],
          'admin_panel/css/style.css': ['admin_panel/sass/style.scss']
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')({browsers: [
              'last 2 versions'
            ]}),
            require('css-mqpacker')({
              sort: true
            })
          ]
        },
        src: [
          'css/*.css',
          'admin_panel/css/*.css'
        ]
      }
    },

    csso: {
      style: {
        files: {
          'css/style.min.css': ['css/style.css'],
          'admin_panel/css/style.min.css': ['admin_panel/css/style.css']
        }
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            '*.html',
            'css/*.css',
            'js/*.js'
          ]
        },
        options: {
          server: './',
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ['*.html', 'admin_panel/*.html']
      },
      style: {
        files: ['sass/**/*.{scss, sass}', 'admin_panel/sass/**/*.{scss, css}'],
        tasks: ['sass']
      },
      scripts: {
        files: ['js/*.js'],
        // tasks: ['uglify']
     }
    },

    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['sass', 'postcss', 'csso', 'uglify']);
  grunt.registerTask('server', ['browserSync', 'watch']);
};
