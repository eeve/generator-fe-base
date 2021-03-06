'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-js-module:app', function () {
  this.timeout(30000);
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['mocha test'])
      .withPrompts({
        name: 'test',
        description: 'just a test',
        useLess: true,
        useSass: true,
        useBower: true,
        useUrlLoader: true,
        useIconFont: true,
        useBabel: true,
        useWpDev: true,
        author: 'eeve',
        email: 'eeveme@gmail.com',
        license: 'MIT',
        autoInstall: true
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'README.md',
      'bower.json',
      '.bowerrc',
      '.babelrc',
      '.editorconfig',
      '.gitignore',
      'app/index.js',
      'package.json',
      'webpack.config.js'
    ]);
  });
});
