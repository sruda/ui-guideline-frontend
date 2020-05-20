const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
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
      include: [
        path.resolve(__dirname, '../src/components')
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['react-docgen']
          }
        }
      ]
    });
    newConfig.resolve.extensions.push('.ts', '.tsx');

    newConfig.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    return newConfig;
  }
};