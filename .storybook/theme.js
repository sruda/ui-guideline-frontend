import { create } from '@storybook/theming/create';
import logo from './logo.svg';

export default create({
  base: 'light',

  // Color palette
  colorPrimary: '#000000',
  colorSecondary: '#33ADA9',

  // UI
  appBg: '#EFF2F7',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E5E9F2',
  appBorderRadius: 5,

  // Fonts
  fontBase: 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontCode: 'Monaco, monospace',

  // Text colors
  textColor: '#33475B',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#33475B',
  barSelectedColor: '#3EA279',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: 'white',
  inputBorder: '#E5E9F2',
  inputTextColor: '#33475B',
  inputBorderRadius: 4,

  // Brand logo/text
  brandImage: logo,
  brandTitle: 'UI Guideline'
});