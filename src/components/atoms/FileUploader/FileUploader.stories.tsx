import React from 'react';
import { action } from '@storybook/addon-actions';
import { array, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import FileUploader from './FileUploader';

storiesOf('Atoms|FileUploader', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const extensions = array('Allowed Extensions (just separate by comma)', ['jpg', 'png']);
    const limitSize = number('Limit Size (MB)', 100);
    const imageFolder = text('Image folder (Firestore)', 'images/test/');

    return (
      <FileUploader
        extensions={extensions}
        limitSize={limitSize}
        imageFolder={imageFolder}
        onFileUpload={action('file-change')}
      />
    );
  });
