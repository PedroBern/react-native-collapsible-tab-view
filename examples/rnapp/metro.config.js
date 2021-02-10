const path = require('path');
const extraNodeModules = {
  // eslint-disable-next-line no-path-concat
  'react-native-collapsible-tab-view': path.resolve(__dirname + '/../../src'),
};
// eslint-disable-next-line no-path-concat
const watchFolders = [path.resolve(__dirname + '/../../src')];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from src/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};
