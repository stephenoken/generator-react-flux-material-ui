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
    this.appname = _.snakeCase(this.appname);
    console.log(this.appname);
  },
  createDirectory:function () {
    mkdirp('./src');
    mkdirp('./test');
    mkdirp('./gulp_tasks');
  },
  createFile: function () {
    this.fs.copyTpl(this.templatePath('_package.json'),'package.json',{
      name: this.appname
    });
  }
});

module.exports = baseGenerator;
