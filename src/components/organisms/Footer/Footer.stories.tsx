import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Footer from './Footer';

storiesOf('Atoms|Footer', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Footer className="absolute bottom-0 left-0 flex w-full" />;
  });
