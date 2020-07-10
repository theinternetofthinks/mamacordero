const sass = require('node-sass');
const tilde_importer = require('grunt-sass-tilde-importer');

module.exports = function (grunt) {
   //secrets: grunt.file.readJSON('secrets.json'),
   require('load-grunt-tasks')(grunt);
   require('time-grunt')(grunt);
   require('jit-grunt')(grunt, {
      sftp: 'grunt-ssh'
   });

   var globalConfig = {
      system: 'dist/',
      tplPath: 'src/',
      tpl: 'dist',
      nodeModules: 'node_modules/'
   };

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      globalConfig: globalConfig,
      watch: {
         zetzer: {
            files: ['src/html/**/*.html'],
            tasks: ['zetzer'],
            options: {
               spawn: false,
               livereload: false
            }
         },
         uglify: {
            files: ['<%= globalConfig.tplPath  %>/js/**/*.js'],
            tasks: ['newer:uglify'],
            options: {
               spawn: false,
               livereload: false
            }
         },
         sass: {
            files: ['<%= globalConfig.tplPath  %>/scss/**/*.scss'],
            tasks: ['sass'],
            options: {
               spawn: false,
               livereload: true
            }
         }
      },

      browserSync: {
         bsFiles: {
            src: ['<%= globalConfig.system  %>/css/*.css', '<%= globalConfig.system  %>/js/*.js', '<%= globalConfig.system  %>/**/*.<%= globalConfig.tpl  %>']
         },
         /*
          options: {
          proxy: "<%= globalConfig.web  %>",
          watchTask : true,
          }
          */
         options: {
            port: 8080,
            server: {
               baseDir: "./dist"

            },
            cors: true,
            watchTask: true
         }
      },
      svgmin: {
         options: {
            plugins: [
               {
                  removeViewBox: false
               }, {
                  removeUselessStrokeAndFill: false
               }
            ]
         },
         multiple: {
            files: [{
               expand: true,
               cwd: '<%= globalConfig.tplPath  %>/svg',
               src: ['**/*.svg'],
               dest: '<%= globalConfig.tplPath  %>/svg/'
            }]
         }

      },
      uglify: {
         options: {
            mangle: false,
            beautify: true
            //wrap: true,
         },
         site: {
            files: {
               '<%= globalConfig.system  %>js/site.js':
                  [
                     '<%= globalConfig.nodeModules %>/jquery/dist/jquery.min.js',
                     '<%= globalConfig.nodeModules %>/bootstrap/js/dist/util.js',
                     '<%= globalConfig.nodeModules %>/bootstrap/js/dist/modal.js',

                     //app
                     '<%= globalConfig.tplPath %>/js/core/**/*.js',
                     '<%= globalConfig.tplPath %>/js/components/**/*.js',
                     '<%= globalConfig.tplPath %>/js/pages/**/*.js',
                  ]
            }
         },
         main: {
            files: {
               '<%= globalConfig.system  %>js/main.js':
                  [
                     '<%= globalConfig.tplPath %>/js/core/**/*.js',
                     '<%= globalConfig.tplPath %>/js/components/**/*.js',
                     '<%= globalConfig.tplPath %>/js/pages/**/*.js',
                  ]
            }
         }
      },
      sass: {
         options: {
            implementation: sass,
            sourceMap: true,
            importer: tilde_importer
         },
         dist: {
            files: [{
               expand: true,
               cwd: "<%= globalConfig.tplPath  %>/scss",
               src: "*.scss",
               dest: "<%= globalConfig.system  %>/css",
               ext: ".min.css"
            }]
         }

      },
      zetzer: {
         main: {
            options: {
               env: {
                  title: "Zetzer"
               },
               partials: "src/html/components",
               templates: "templates",

               dot_template_settings: {
                  strip: false

               }
            },
            files: [
               {
                  expand: true,
                  cwd: "src/html/pages/",
                  src: "*.html",
                  dest: "dist",
                  ext: ".html",
                  flatten: false
               }
            ]
         }
      },
      clean: {
         dist: {
            files: [{
               dot: true,
               src: [
                  '.tmp',
                  '<%= globalConfig.system  %>/{,*/}*'
               ]
            }]
         }
      },
      copy: {
         dist: {
            files: [
               {
                  expand: true,
                  cwd: '<%= globalConfig.tplPath %>/static/',
                  src: ['**'],
                  dest: '<%= globalConfig.system %>'
               },
               {
                  expand: true,
                  cwd: '<%= globalConfig.tplPath %>/css/',
                  src: ['**'],
                  dest: '<%= globalConfig.system %>/css'
               }
            ]
         }
      },
      webfont: {
         icons: {
            src: '<%= globalConfig.tplPath %>/static/svg/svg-icon/*.svg',
            dest: '<%= globalConfig.tplPath %>/static/fonts/icons/',
            destScss: '<%= globalConfig.tplPath %>/scss/core/',
            options: {
               font: "font-icons",
               fontPathVariables: true,
               stylesheets: ["scss"],
               engine: "fontforge",
               syntax: "bootstrap",
               relativeFontPath: "../fonts/icons/",
               htmlDemo: true,
               destHtml: "<%= globalConfig.tplPath %>/pages/",
               htmlDemoFilename: "icons",
               types: 'eot,woff,ttf'
            }
         }
      }
   });

   // Registramos tareas
   grunt.registerTask('default',
      ["browserSync", "watch"]
   );

   grunt.registerTask('dev', [
      "clean",
      "copy",
      "zetzer",
      "sass",
      "uglify",
      "browserSync",
      "watch"
   ]);

   grunt.registerTask('build', [
      "clean",
      "copy",
      "zetzer",
      "sass",
      "uglify"
   ]);

};
