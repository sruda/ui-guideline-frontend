const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links'
  ],
  presets: [path.resolve(__dirname, './next-preset.js')]
};