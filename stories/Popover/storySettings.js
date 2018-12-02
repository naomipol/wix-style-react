import { Category } from '../storiesHierarchy';

export const storySettings = {
  kind: Category.COMPONENTS,
  category: Category.COMPONENTS,
  storyName: 'Popover',
  dataHook: 'storybook-popover',
};

export const testStories = {
  AUTO_POSITIONING: 'Auto positioning',
  ARROW_ADJUSTING: 'Arrow adjusting',
  ARROW_EDGE_ADJUSTING: 'Arrow edge adjusting',
};

export const placements = [
  'auto-start',
  'auto',
  'auto-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start',
];
