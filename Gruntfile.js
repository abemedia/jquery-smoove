'use strict';

module.exports = function (grunt) {

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
            all: {
                options: {
                    urls: ['1.7.0', '1.8.0', '1.9.0', '1.10.0', '2.0.0b1'].map(function (version) {
                        return 'http://0.0.0.0:<%= connect.server.options.port %>/test/smoove.html?jquery=' + version;
                    })
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

    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
    grunt.registerTask('test', ['connect', 'jshint', 'qunit']);
    grunt.registerTask('build', ['clean', 'concat', 'uglify']);

};