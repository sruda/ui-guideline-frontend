import React from 'react';
import { storiesOf } from '@storybook/react';
import { optionsKnob as options, select, text, withKnobs } from '@storybook/addon-knobs';

import Icon, { Catalog, Style } from './Icon';

storiesOf('Primitives|Icons', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const icon = select('icon', Catalog, Catalog.badgeCheck);
    const iconStyle = options('Icon Style', Style, Style.regular, { display: 'inline-radio' });
    const width = text('Icon Width', '24');
    const height = text('Icon Height', '24');
    const className = text('Class Styles', 'text-default-slate');

    return <Icon icon={icon} iconStyle={iconStyle} width={width} height={height} className={className} />;
  });
