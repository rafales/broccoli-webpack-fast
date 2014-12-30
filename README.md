# broccoli-webpack-fast

A [Broccoli] plugin for [webpack] with fast rebuilds. It has one limitation (for now) - you can't pass broccoli tree to it.

This module has been created as an alternative to [webpack-broccoli] which has terrible rebuild times.

## Installation

Just use npm:

```bash
$ npm install --save-dev broccoli-webpack-fast
```

## Usage

Webpack plugin accepts [webpack config] as the only argument.

```js
var path = require('path')
var webpackFast = require('broccoli-webpack-fast')

var jsTree = webpackFast({
  entry: './main',
  context: path.resolve('app/js'),
  output: {filename: 'app.js'},
  externals: [{'react': 'React', 'jquery': '$'}],
  devtool: 'eval-source-map'
})

module.exports = jsTree
```

[broccoli]: https://github.com/joliss/broccoli
[webpack]: https://github.com/webpack/webpack
[webpack-broccoli]: https://github.com/myfreeweb/broccoli-webpack
[webpack config]: http://webpack.github.io/docs/configuration.html
