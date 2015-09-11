var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var packageManagerDetails = {
  description: ""
};
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
  },
  prompting: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'description',
      message: 'Your projects\'s description'
    },function (answers) {
      packageManagerDetails.description = answers.description;
      done();
    });
  },
  createDirectory:function () {
    mkdirp('./src');
    mkdirp('./test');
    mkdirp('./gulp_tasks');
  },
  createRootFiles: function () {
    this.fs.copyTpl(this.templatePath('_package.json'),'./package.json',{
      name: this.appname,
      description: packageManagerDetails.description
    });
  }
});

module.exports = baseGenerator;
