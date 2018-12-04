import React from 'react';
import Carousel from 'wix-style-react/Carousel';

import storySettings from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Carousel,
  componentPath: '../../src/Carousel/index.js',

  componentProps: {},

  examples: (
    <div style={{ width: '500px', height: '300px' }}>
      <Carousel
        images={[
          {
            src:
              'https://a-static.besthdwallpaper.com/garfield-wallpaper-2800x2100-815_28.jpg',
          },
          {
            src:
              'https://m.media-amazon.com/images/M/MV5BZGMwOGIwZjUtOWQ1OS00YWRjLWJmZGMtN2Y1OWQ3ZDYwYTM3XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg',
          },
          {
            src:
              'https://a-static.besthdwallpaper.com/cartoons-garfield-wallpaper-1440x1080-6773_22.jpg',
          },
        ]}
      />
    </div>
  ),
};
