import ReactTestUtils from 'react-dom/test-utils';

export default ({ element }) => {
  return {
    driver: {
      exists: () => !!element,
      getCurrentImageIndex: () => {
        const imageContainers = element.querySelectorAll('.image');
        for (let i = 0; i < imageContainers.length; i++) {
          if (imageContainers[i].classList.contains('active')) return i;
        }
      },
      isLoading: () => {
        const loader = element.querySelector('[data-hook="loader"]');
        return !!loader;
      },
      clickPrevious: () => {
        const prevButton = element.querySelector('[data-hook="prev-button"]');
        ReactTestUtils.Simulate.click(prevButton);
      },
      clickNext: () => {
        const nextButton = element.querySelector('[data-hook="next-button"]');
        ReactTestUtils.Simulate.click(nextButton);
      },
    },
  };
};
