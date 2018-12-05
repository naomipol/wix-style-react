import ReactTestUtils from 'react-dom/test-utils'

export default ({ element }) => {
  return {
    driver: {
      exists: () => !!element,
      isLoading: () => {
        const loader = element.querySelector('[data-hook="loader"]')
        return !!loader
      },
      getImages: () => {
        return element
          .querySelectorAll('[data-hook="carousel-img"]')
          .map(img => img.src)
      },
    }
  }
}
