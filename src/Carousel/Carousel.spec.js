import React from 'react';
import carouselDriverFactory from './Carousel.driver';
import Carousel from './Carousel';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

describe('Carousel', () => {
  const createDriver = createDriverFactory(carouselDriverFactory);

  it('should be rendered', () => {
    const { driver } = createDriver(<Carousel images={[]} />);
    expect(driver.exists()).toBeTruthy();
  });

  describe('loader', () => {
    it('should show only the loader when loading', () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      expect(driver.isLoading()).toBeTruthy();
    });

    it('should hide the loader when images are loaded', () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      driver.loadImages();
      expect(driver.isLoading()).toBeFalsy();
    });
  });

  describe('basic behaviour', () => {
    it('should show the first image', () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      expect(driver.getCurrentImageIndex()).toBe(0);
    });

    it('should switch to the next image when clicking next', () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      driver.clickNext();
      expect(driver.getCurrentImageIndex()).toBe(1);
    });

    it('should switch to the previous image when clicking prev', () => {
      const { driver } = createDriver(
        <Carousel images={[{ src: 'image1.jpg' }, { src: 'image2.jpg' }]} />,
      );
      driver.clickNext();
      driver.clickPrevious();
      expect(driver.getCurrentImageIndex()).toBe(0);
    });
  });

  describe('infinite functionallity', () => {
    describe('default behaviour', () => {
      it('should show the last image when clicing `prev`', () => {
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
        expect(driver.getCurrentImageIndex()).toBe(2);
      });

      it('should show the first image when clicing `next` on the last image', () => {
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
        expect(driver.getCurrentImageIndex()).toBe(1);
        driver.clickNext();
        expect(driver.getCurrentImageIndex()).toBe(2);
        driver.clickNext();
        expect(driver.getCurrentImageIndex()).toBe(0);
      });
    });

    describe('when `infinite` is false', () => {
      it('should stay on the same image when clicking `prev`', () => {
        const { driver } = createDriver(
          <Carousel
            images={[
              { src: 'image1.jpg' },
              { src: 'image2.jpg' },
              { src: 'image3.jpg' },
            ]}
            infinite={false}
          />,
        );
        driver.clickPrevious();
        expect(driver.getCurrentImageIndex()).toBe(0);
      });

      it('should stay on the last image when clicing `next` on the last image', () => {
        const { driver } = createDriver(
          <Carousel
            images={[
              { src: 'image1.jpg' },
              { src: 'image2.jpg' },
              { src: 'image3.jpg' },
            ]}
            infinite={false}
          />,
        );
        driver.clickNext();
        expect(driver.getCurrentImageIndex()).toBe(1);
        driver.clickNext();
        expect(driver.getCurrentImageIndex()).toBe(2);
        driver.clickNext();
        expect(driver.getCurrentImageIndex()).toBe(2);
      });
    });
  });
});