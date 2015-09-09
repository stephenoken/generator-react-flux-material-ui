var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var baseGenerator = generators.Base.extend({
  welcome: function () {
    this.log(yosay("Allo Allo, and welcome to react-frontstack"));
  },
  constructor:function () {
    generators.Base.apply(this,arguments);
    this.argument('appname',{
      type: String,
      required: true
    });
    this.appname = _.camelCase(this.appname);
    console.log(this.appname);
  },
  createDirectory:function () {
    mkdirp(this.appname);
    mkdirp(this.appname+'/src');
    mkdirp(this.appname+'/test');
    mkdirp(this.appname+'/gulp_tasks');
  }
});

module.exports = baseGenerator;
