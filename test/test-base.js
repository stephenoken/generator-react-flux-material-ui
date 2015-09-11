var expect = require('chai').expect;
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var path = require('path');
var _ = require('lodash');

var appname = 'gen-test-repo';

describe('react-flux:', function () {

  before(function (done) {
    helpers.run(path.join(__dirname,'../generators/app'))
      .inDir(path.join(__dirname,'./tmp'))
      .withArguments([appname])
      .on('end',done);
    appname = _.snakeCase(appname);
  });

  it('can be imported', function () {
    var app = require('../generators/app/index.js');
    expect(app).not.to.be.undefinded;
  });
  describe('Directory creation:', function () {
    it('generates a src directory', function (done) {
      assert.file('./src');
      done();
    });
    it('generates a test directory', function (done) {
      assert.file('./test');
      done();
    });
    it('generates a gulp_tasks directory', function (done) {
      assert.file('./gulp_tasks');
      done();
    });
  });
  describe('File creation:', function () {
      it('generates package.json', function (done) {
        assert.file('/package.json');
        done();
      });
  });
});
