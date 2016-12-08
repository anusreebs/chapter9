module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            //generate banner comment
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            target: {
                // Grunt will search for "**/*.js" under "src/" when the "uglify" task
                // runs and build the appropriate src-dest file mappings then, hence, 
                // no need to update the Gruntfile when files are added or removed.
                files: [{
                    expand: true,
                    cwd: 'src/',
                    ext: '.js',
                    src: ['**/*.js',
                        '!**/*.min.js'
                    ],
                    dest: 'dist/'
                }]
            }
        },
        //Minification of css files
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    ext: '.css',
                    src: ['**/*.css',
                        '!**/*.min.css'
                    ],
                    dest: 'dist/'
                }]
            }
        },
        // Copying HTML file
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html',
                        '**/*.html'
                    ],
                    dest: 'dist/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
};