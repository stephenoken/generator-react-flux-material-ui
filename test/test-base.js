var expect = require('chai').expect;
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var path = require('path');
var _ = require('lodash');

var appname = 'gen-test-repo';

describe('react-flux:', function () {

  before(function (done) {
    var mockPrompt = {
      description: 'Really cool app that does stuff',
      keywords: 'Reactjs Enquirejs',
      git: 'http://github.com'
    };
    helpers.run(path.join(__dirname,'../generators/app'))
      .inDir(path.join(__dirname,'./tmp'))
      .withArguments([appname])
      .withPrompts(mockPrompt)
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


  describe('Root File creation:', function () {


      describe('Package.json:', function () {
        it('generates package.json', function (done) {
          assert.file('./package.json');
          done();
        });
        it('contains a prompt details', function (done) {
          assert.fileContent('./package.json',/['|"]*name['|"]*[ ]*:[ ]*['|"]gen_test_repo['|"]/);
          assert.fileContent('./package.json',/['|"]*description['|"]*[ ]*:[ ]*['|"]Really cool app that does stuff['|"]/);
          assert.fileContent('./package.json',/['|"]*keywords['|"]*[ ]*:[ ]*\[/);
          assert.fileContent('./package.json',/['|"]*Reactjs['|"]*[ ]*,/);
          assert.fileContent('./package.json',/['|"]*Enquirejs['|"]*[ ]*,/);
          assert.fileContent('./package.json',/['|"]*repository['|"]*[ ]*:[ ]*{/);
          assert.fileContent('./package.json',/['|"]*type['|"]*[ ]*:[ ]*['|"]git['|"]/);
          assert.fileContent('./package.json',/['|"]*url['|"]*[ ]*:[ ]*['|"]http:\/\/github.com['|"]/);
          done();
        });
      });
  });
});
