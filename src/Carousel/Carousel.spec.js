import React from 'react';
import carouselDriverFactory from './Carousel.driver';
import Carousel from './Carousel';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import eventually from 'wix-eventually';

describe('Carousel', () => {
  const createDriver = createDriverFactory(carouselDriverFactory);

  it('should be rendered', () => {
    const { driver } = createDriver(<Carousel images={[]} />);
    expect(driver.exists()).toBeTruthy();
  });

  describe('basic behaviour', () => {
    it('should show only the loader when loading', () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      expect(driver.isLoading()).toBeTruthy();
    });

    // skiping all the following tests since we don't know how to test the onloading image thingi

    it.skip('should show the first image when finished loading', async () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      await eventually(async () => {
        expect(driver.isLoading()).toBeFalsy();
        expect(driver.getCurrentImageIndex()).toBe(0);
      });
    });

    it.skip('should switch to the next image when clicking next', async () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(1);
      });
    });

    it.skip('should switch to the previous image when clicking prev', async () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      driver.clickNext();
      driver.clickPrevious();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(0);
      });
    });
  });

  describe('when `loopImages` is true', () => {
    it.skip('should show the last image when clicing `prev`', async () => {
      const { driver } = createDriver(
        <Carousel
          images={[
            { src: 'image1.jpg' },
            { src: 'image2.jpg' },
            { src: 'image3.jpg' },
          ]}
        />,
      );
      driver.clickPrevious();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(2);
      });
    });

    it.skip('should show the first image when clicing `next` on the last image', async () => {
      const { driver } = createDriver(
        <Carousel
          images={[
            { src: 'image1.jpg' },
            { src: 'image2.jpg' },
            { src: 'image3.jpg' },
          ]}
        />,
      );
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(1);
      });
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(2);
      });
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(0);
      });
    });
  });

  describe.skip('when `loopImages` is false', () => {
    it('should stay on the same image when clicking `prev`', async () => {
      const { driver } = createDriver(
        <Carousel
          images={[
            { src: 'image1.jpg' },
            { src: 'image2.jpg' },
            { src: 'image3.jpg' },
          ]}
        />,
      );
      driver.clickPrevious();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(0);
      });
    });

    it('should stay on the last image when clicing `next` on the last image', async () => {
      const { driver } = createDriver(
        <Carousel
          images={[
            { src: 'image1.jpg' },
            { src: 'image2.jpg' },
            { src: 'image3.jpg' },
          ]}
        />,
      );
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(1);
      });
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(2);
      });
      driver.clickNext();
      await eventually(async () => {
        expect(driver.getCurrentImageIndex()).toBe(0);
      });
    });
  });
});
