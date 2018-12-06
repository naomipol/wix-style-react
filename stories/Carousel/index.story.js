import React from 'react'
import Carousel from 'wix-style-react/Carousel'
import storySettings from './storySettings'

const imagesExamples = [
  {
    value: [
      {
        src:
          'https://a-static.besthdwallpaper.com/garfield-wallpaper-2800x2100-815_28.jpg'
      },
      {
        src:
          'https://m.media-amazon.com/images/M/MV5BZGMwOGIwZjUtOWQ1OS00YWRjLWJmZGMtN2Y1OWQ3ZDYwYTM3XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg'
      }
    ],
    label: 'two images'
  },
  {
    value: [
      {
        src:
          'https://a-static.besthdwallpaper.com/garfield-wallpaper-2800x2100-815_28.jpg'
      },
      {
        src:
          'https://m.media-amazon.com/images/M/MV5BZGMwOGIwZjUtOWQ1OS00YWRjLWJmZGMtN2Y1OWQ3ZDYwYTM3XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg'
      },
      {
        src:
          'https://a-static.besthdwallpaper.com/cartoons-garfield-wallpaper-1440x1080-6773_22.jpg'
      }
    ],
    label: 'three images'
  }
]
export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Carousel,
  componentPath: '../../src/Carousel/index.js',
  componentWrapper: ({ component }) => (
    <div style={{ width: '500px', height: '300px' }}>{component}</div>
  ),
  exampleProps: {
    images: imagesExamples
  },
  componentProps: {
    images: imagesExamples[0].value,
    infinite: true,
    autoplay: true
  }
}
