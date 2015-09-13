var generators = require('yeoman-generator');
var _ = require('lodash');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var path = require('path');

var packageManagerDetails = {
  appname:"",
  version: "",
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
    // this.argument('appname',{
    //   type: String,
    //   required: true
    // });
    // this.appname = _.snakeCase(this.appname);
  },
  prompting: function () {
    var done = this.async();
    var questions = [
      this._prompt('appname','name:',path.basename(path.resolve('.'))),
      this._prompt('version','version:','1.0.0'),
      this._prompt('description','projects\'s description:'),
      this._prompt('keywords','keywords:'),
      this._prompt('git','github url:')
    ];
    this.prompt(questions,function (answers) {
      packageManagerDetails.appname = answers.appname;
      packageManagerDetails.version = answers.version;
      packageManagerDetails.description = answers.description;
      packageManagerDetails.keywords = _.words(answers.keywords);
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
    this._createPackageFile();
  },
  installAllDependencies: function () {
    this.installDependencies();
  },
  _prompt: function (name,message,defaultAnswer) {
    return{
      type: 'input',
      name: name,
      message: message,
      default:defaultAnswer
    };
  },
  _createPackageFile: function () {
    this.fs.copyTpl(this.templatePath('_package.json'),'./package.json',{
      name: _.snakeCase(packageManagerDetails.appname),
      version: packageManagerDetails.version,
      description: packageManagerDetails.description,
      keywords: packageManagerDetails.keywords,
      git: packageManagerDetails.git
    });

  }
});

module.exports = baseGenerator;
