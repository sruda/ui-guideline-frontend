import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs, boolean } from '@storybook/addon-knobs';

import ComponentCard from './ComponentCard';

storiesOf('Atoms|Cards/Component Card', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const name = text('Component Name', 'Button');
    const imgSrc = text('Image Src Url', './image.svg');
    const imgAltText = text('Image Alt Text', 'Button');
    const withBadgeIcon = boolean('With Badge Icon', false);

    return (
      <ComponentCard
        className="max-w-sm"
        name={name}
        imgSrc={imgSrc}
        imgAltText={imgAltText}
        withBadgeIcon={withBadgeIcon}
      />
    );
  });
