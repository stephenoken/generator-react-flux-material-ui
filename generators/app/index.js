var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var packageManagerDetails = {
  description: "",
  keywords: [],
  git: ""
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
    this.prompt(
      this._prompt('description','Your projects\'s description'),
      function (answers) {
        packageManagerDetails.description = answers.description;
        done();
    });
    this.prompt(
      this._prompt('keywords','Project keywords'),
      function (answers) {
        packageManagerDetails.keywords = _.words(answers.keywords);
        done();
    });
    this.prompt(
      this._prompt('git','Project github url'),
      function (answers) {
        packageManagerDetails.git = answers.git;
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
      description: packageManagerDetails.description,
      keywords: packageManagerDetails.keywords,
      git: packageManagerDetails.git
    });
  },
  _prompt: function (name,message) {
    return{
      type: 'input',
      name: name,
      message: message
    };
  }
});

module.exports = baseGenerator;
