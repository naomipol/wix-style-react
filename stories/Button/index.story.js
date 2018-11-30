import React from 'react';
import Button from 'wix-style-react/Button';
import { storySettings } from './storySettings';
import icons from '../utils/icons-for-story';

import ButtonStory from './examples';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Button,
  componentPath: '../../src/Button/Button.js',

  componentProps: {
    new: true,
    children: 'Button',
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    prefixIcon: icons,
    suffixIcon: icons,
    disabled: false,
  },

  examples: <ButtonStory />,
};
