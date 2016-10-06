'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  // 初始化准备工作
  initializing: function () {
    if (this.args.indexOf('mocha test') !== -1) {
      this.debug = true;
    }
  },

  // 接受用户输入
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the riveting ' + chalk.red('generator-project-folder') + ' generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'name for project:',
      default: this.appname.replace(/\s/g, '-')
    }, {
      name: 'description',
      message: 'description:',
      default: ''
    }, {
      type: 'confirm',
      name: 'useBower',
      message: 'Would you like to use bower?',
      default: true
    }, {
      type: 'confirm',
      name: 'useLess',
      message: 'Would you like to use LESS?',
      default: false
    }, {
      type: 'confirm',
      name: 'useSass',
      message: 'Would you like to use SASS?',
      default: true
    }, {
      type: 'confirm',
      name: 'useUrlLoader',
      message: 'Would you like to use url-loader?',
      default: true
    }, {
      type: 'confirm',
      name: 'useIconFont',
      message: 'Would you like to use iconfont?',
      default: true
    }, {
      type: 'confirm',
      name: 'useBabel',
      message: 'Would you like to use babel?',
      default: true
    }, {
      type: 'confirm',
      name: 'useWpDev',
      message: 'Would you like to use webpack-dev-server?',
      default: true
    }, {
      name: 'author',
      message: 'author:',
      default: this.user.git.name()
    }, {
      name: 'email',
      message: 'email:',
      default: this.user.git.email()
    }, {
      name: 'license',
      message: 'license:',
      default: 'MIT'
    }, {
      type: 'confirm',
      name: 'autoInstall',
      message: 'auto install dependencies:',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  // 生成目录结构阶段
  writing: function () {
    var self = this;
    var copy = function (from, to) {
      self.fs.copy(self.templatePath(from), self.destinationPath(to));
    };
    copy('_app/', 'app/');
    copy('_gitignore', '.gitignore');
    copy('_editorconfig', '.editorconfig');
    
    this.template('_README.md', 'README.md');
    this.template('_package.json', 'package.json');
    this.template('_webpack.config_js', 'webpack.config.js');

    if (self.props.useBower) {
      copy('_bowerrc', '.bowerrc');
      this.template('_bower.json', 'bower.json');
    }

    if (self.props.useBabel) {
      copy('_babelrc', '.babelrc');
    }

  },

  // 安装项目依赖
  install: function () {
    if (this.props.autoInstall) {
      if (this.props.useBower) {
        this.installDependencies();
      } else {
        this.npmInstall();
      }
    }
  },

  // 生成器退出前运行npm start，开启构建任务
  end: function () {
    if (!this.debug && this.props.autoInstall) {
      var done = this.async();
      this.spawnCommand('npm', ['start'])
        .on('exit', function (code) {
          if (code) {
            done(new Error('code:' + code));
          } else {
            done();
          }
        })
        .on('error', done);
    }
  }
});
