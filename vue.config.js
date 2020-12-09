// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacaWebpackPlugin = require('monaco-editor-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CircularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.TYPE === 'lib'

module.exports = {
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaca').use(new MonacaWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
