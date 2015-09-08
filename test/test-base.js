var expect = require('chai').expect;
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var path = require('path');
var _ = require('lodash');

var appname = 'gen-test-repo';

describe('react-flux: ', function () {

  before(function (done) {
    helpers.run(path.join(__dirname,'../generators/app'))
      .inDir(path.join(__dirname,'./tmp'))
      .withArguments([appname])
      .on('end',done);
    appname = _.camelCase(appname);
  });

  it('can be imported', function () {
    var app = require('../generators/app/index.js');
    expect(app).not.to.be.undefinded;
  });

  it('generates a root directory', function () {
    assert.file(appname);
  });
});
