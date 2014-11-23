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

    // aws: grunt.file.readJSON('aws_creds.json'), // Read the file

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'eu-west-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      staging: {
        options: {
          bucket: 'staging.jubileechurch.co.uk',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: '', action: 'upload'}
        ]
      },
      prod: {
        options: {
          bucket: 'www.jubileechurch.co.uk',
          differential: true // Only uploads the files that have changed
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: '', action: 'upload'}
        ]
      }
    }

  });

  // Load NPM Task
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-aws-s3');
};