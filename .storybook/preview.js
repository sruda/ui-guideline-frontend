import { addDecorator, addParameters } from '@storybook/react';

// Add 'ug' class prefix in Storybook body
addDecorator(story => {
  document.body.classList.add('ug-root');
  document.body.classList.add('font-sans');
  return story();
});

/************************************************/
/*           BACKGROUND ADDON CONFIG            */
/************************************************/

const backgroundOptions = [
  { name: 'white', value: '#FFFFFF', default: true },
  { name: 'slate', value: '#33475B' },
  { name: 'facebook', value: '#3B5998' },
];

addParameters({ backgrounds: backgroundOptions });
