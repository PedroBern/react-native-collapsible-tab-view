// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const extraNodeModules = {
  'react-native-collapsible-tab-view': path.resolve(`${__dirname}/../src`),
}

const config = getDefaultConfig(__dirname)

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
})

config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
  get: (target, name) =>
    //redirects dependencies referenced from src/ to local node_modules
    name in target
      ? target[name]
      : path.join(process.cwd(), `node_modules/${name}`),
})

config.watchFolders = [path.resolve(`${__dirname}/../src`)]

module.exports = config
