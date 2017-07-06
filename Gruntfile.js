'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('smoove.jquery.json'),
    banner: '/*!\n' +
      '* jQuery Smoove v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> Adam Bouqdib\n' +
      '* Licensed under <%= pkg.licenses[0].type %> (<%= pkg.licenses[0].url %>) \n*/\n\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/jquery.<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      },
    },
    connect: {
      server: {
        options: {
          port: 8085
        }
      }
    },
    qunit: {
      files: ['test/**/*.html'],
      options: {
        page: {
          viewportSize: {
            width: 1024,
            height: 768
          }
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
    updatejson: {
      options: {
        src: 'smoove.jquery.json',
        dest: ['bower.json', 'package.json'],
        indent: '    ',
        fields: ['title', 'description', 'version', 'homepage', 'keywords', 'dependencies']
      }
    }

  });

  grunt.registerTask('updatejson', function() {
    // set config vars
    var options = this.options();
    if (typeof(options.dest) === 'string') {
      options.dest = [options.dest];
    }

    // check that all files exist
    var files = (JSON.parse(JSON.stringify(options.dest)));
    files.push(options.src);
    for (var d = 0; d < files.length; d++) {
      if (!grunt.file.exists(files[d])) {
        grunt.log.error("file " + files[d] + " not found");
        return false;
      }
    }

    // read source data
    grunt.log.writeln("Reading from " + options.src);
    var src = grunt.file.readJSON(options.src);

    // update destination files
    for (d = 0; d < options.dest.length; d++) {
      var data = grunt.file.readJSON(options.dest[d]);
      for (var f = 0; f < options.fields.length; f++) {
        var field = options.fields[f];
        if (typeof(data[field]) !== 'undefined') {
          data[field] = src[field];
        }
      }
      grunt.file.write(options.dest[d], JSON.stringify(data, options.indent, 2));
      grunt.log.writeln("Updated " + options.dest[d]);
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['connect', 'jshint', 'qunit']);
  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'updatejson']);
  grunt.registerTask('default', ['test', 'build']);
};
