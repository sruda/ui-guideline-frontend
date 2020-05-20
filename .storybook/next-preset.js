const path = require('path');

module.exports = {
  webpackFinal: async baseConfig => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])]
      }
    };

    // TypeScript with Next.js
    newConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['react-docgen', ['module-resolver', {
              'alias': {
                '@components': './src/components',
                '@validators': './src/validators',
                '@components': './src/components',
                '@primitives': './src/components/primitives',
                '@atoms': './src/components/atoms',
                '@organisms': './src/components/organisms',
                '@constants': './src/constants',
                '@config': './src/config',
                '@contexts': './src/contexts',
                '@environments': './environments',
                '@hooks': './src/hooks',
                '@interfaces': './src/interfaces',
                '@pages': './src/pages',
                '@theme': './src/theme',
                '@services': './src/services',
                '@utils': './src/utils',
              }
            }]]
          }
        }
      ]
    });
    newConfig.resolve.extensions.push('.ts', '.tsx');

    /*const dir = __dirname;
    newConfig.resolve.alias['@components'] = path.resolve(dir, './src/components');
    newConfig.resolve.alias['@primitives'] = path.resolve(dir, './src/components/primitives');
    newConfig.resolve.alias['@atoms'] = path.resolve(dir, './src/components/atoms');
    newConfig.resolve.alias['@organisms'] = path.resolve(dir, './src/components/organisms');
    newConfig.resolve.alias['@constants'] = path.resolve(dir, './src/constants');
    newConfig.resolve.alias['@config'] = path.resolve(dir, './src/config');
    newConfig.resolve.alias['@contexts'] = path.resolve(dir, './src/contexts');
    newConfig.resolve.alias['@environments'] = path.resolve(dir, './environments');
    newConfig.resolve.alias['@hooks'] = path.resolve(dir, './src/hooks');
    newConfig.resolve.alias['@interfaces'] = path.resolve(dir, './src/interfaces');
    newConfig.resolve.alias['@pages'] = path.resolve(dir, './src/pages');
    newConfig.resolve.alias['@theme'] = path.resolve(dir, './src/theme');
    newConfig.resolve.alias['@services'] = path.resolve(dir, './src/services');    
    newConfig.resolve.alias['@utils'] = path.resolve(dir, './src/utils');
    newConfig.resolve.alias['@validators'] = path.resolve(dir, './src/validators'); */


    newConfig.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    return newConfig;
  }
};