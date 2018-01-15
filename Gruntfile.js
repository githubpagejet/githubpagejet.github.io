var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        handlebars: {
            compile: {
                files: {                    
                    "./js/templates.js": [
                        "./templates/*.handlebars",
                        "./templates/*/*.handlebars"
                    ]
                },
                options: {
                    amd: false,
                    namespace: "Handlebars.templates",
                    processName: function (filePath) {
                        return path.basename(filePath, '.handlebars');
                    },
                    partialsUseNamespace: true,
                    processPartialName: function (filePath) {
                        return path.basename(filePath, '.handlebars');
                    },
                    partialRegex: /^par_/
                }
            }
        },
        uglify: {
            js: {
                files: {
                    './js/lib.min.js': [
                        './js/lib/*.js'
                    ],
                    './js/custom.min.js': [
                        './js/controllers/*.js',
                        './js/templates.js',
                        './js/config.js',
						'./js/app.js',
                        './js/routes.js',                        
						'./js/translations/*.js'
                    ]
                }
            }
        },
        /*less: {
            production: {
                options: {
                    paths: ['./css']
                },
                files: {
                    './css/style.css': './css/style.less'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    './css/style.css': './css/style.scss'
                }
            }
        },*/
        watch: {
            scripts: {
                files: [
                    './templates/*.handlebars',
                    "./templates/*/*.handlebars",

                    './js/lib/*.js',
                    './js/controllers/*.js',
                    './js/templates.js',
                    './js/config.js',
                    './js/routes.js',
                    './js/app.js',
					'./js/translations/*.js'

                    //'./css/style.less'
                ],
                tasks: ['default']
            }
        }
    });

    grunt.registerTask('default', ['handlebars', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-watch');
}