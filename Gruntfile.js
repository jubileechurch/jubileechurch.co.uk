module.exports = function(grunt) {

  grunt.initConfig({

    wintersmith: {
      build: {
        options: {
          action: "build"
        }
      },
      preview: {
        options: {
          action: "preview"
        }
      }
    },

    aws_s3: {
      options: {
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
        region: 'eu-west-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      deploy: {
        options: {
          bucket: process.env.TRAVIS_BRANCH + '.jubileechurch.co.uk',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: '', action: 'upload'}
        ]
      },
    }

  });

  // Load NPM Task
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-aws-s3');
};