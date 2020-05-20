import React from 'react';
import { storiesOf } from '@storybook/react';
import { optionsKnob as options, text, withKnobs } from '@storybook/addon-knobs';

import Avatar, { Size } from './Avatar';

storiesOf('Atoms|Avatar', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const size = options('Size', Size, Size.md, { display: 'inline-radio' });
    const imgUrl = text(
      'Image url',
      'https://lh5.googleusercontent.com/-4yoLOE3qOVI/AAAAAAAAAAI/AAAAAAAADG4/v5Eq70CxKc4/photo.jpg?sz=200',
    );
    const altText = text('Alt text', 'avatar image');

    return <Avatar size={size} imgUrl={imgUrl} altText={altText} />;
  });
