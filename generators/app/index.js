var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var baseGenerator = generators.Base.extend({
  welcome: function () {
    this.log(yosay("Hello, and welcome to react-frontstack"));
  },
  constructor:function () {
    generators.Base.apply(this,arguments);
    this.argument('appname',{
      type: String
    });
    this.appname = _.camelCase(this.appname);
    console.log(this.appname);
  },
  createDirectory:function () {
    mkdirp(this.appname);
  }
});

module.exports = baseGenerator;
