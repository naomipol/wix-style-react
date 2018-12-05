import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import React from 'react';
import styles from './Carousel.scss';
import ChevronLeftLarge from '../new-icons/ChevronLeftLarge';
import ChevronRightLarge from '../new-icons/ChevronRightLarge';
import IconButton from '../IconButton/IconButton';
import Loader from '../Loader/Loader';
import cloneDeep from 'clone-deep';

// because lodash throttle is not compatible with jest timeout mocks
function throttle(callback, time) {
  let pause;

  return function(...args) {
    if (!pause) {
      pause = true;
      setTimeout(() => {
        pause = false;
      }, time);
      callback(...args);
    }
  };
}

const duplicateIfTwoImages = images =>
  images.length === 2 ? images.concat(cloneDeep(images)) : images;

class Carousel extends WixComponent {
  constructor(props) {
    super(props);
    const images = this.props.images || [];
    this.state = {
      activeIndex: 0,
      images: duplicateIfTwoImages(images),
      loadedImageCount: 0,
    };
    this._slide = throttle(this._slide.bind(this), 600);
  }

  _isLastImage() {
    return this.state.activeIndex === this.props.images.length - 1;
  }

  _slide(index) {
    this.setState({
      activeIndex: index,
    });
  }

  _prev() {
    if (this.state.activeIndex === 0 && !this.props.infinite) {
      return;
    }
    this._slide(this._getPrevIndex());
  }

  _next() {
    if (this._isLastImage() && !this.props.infinite) {
      return;
    }
    this._slide(this._getNextIndex());
  }

  _getNextIndex() {
    return this.state.activeIndex === this.state.images.length - 1
      ? 0
      : this.state.activeIndex + 1;
  }

  _getPrevIndex() {
    return this.state.activeIndex === 0
      ? this.state.images.length - 1
      : this.state.activeIndex - 1;
  }

  _onImageLoad() {
    this.setState(state => {
      const loadedImageCount = state.loadedImageCount + 1;
      return {
        loadedImageCount,
      };
    });
  }

  _isLoading() {
    return this.state.loadedImageCount < this.state.images.length;
  }

  _isDotActive(index) {
    const activeIndex = this.state.activeIndex;
    const originalImageCount = this.props.images.length;
    if (activeIndex > originalImageCount - 1) {
      return index === activeIndex - originalImageCount;
    }
    return index === activeIndex;
  }

  render() {
    return (
      <div className={styles.carousel}>
        <div className={styles.gallery}>
          <div className={styles.buttonContainer}>
            <IconButton
              dataHook="prev-button"
              priority="secondary"
              onClick={() => this._prev()}
            >
              <ChevronLeftLarge />
            </IconButton>
          </div>
          <div
            className={classNames([
              styles.imageContainer,
              { [styles.loading]: this._isLoading() },
            ])}
          >
            {this.state.images.map((image, currentIndex) => {
              return (
                <div
                  key={currentIndex}
                  className={classNames(styles.image, {
                    [styles.active]: currentIndex === this.state.activeIndex,
                    [styles.prev]: currentIndex === this._getPrevIndex(),
                    [styles.next]: currentIndex === this._getNextIndex(),
                  })}
                >
                  <img
                    data-hook="carousel-img"
                    src={image.src}
                    onLoad={() => this._onImageLoad()}
                  />
                </div>
              );
            })}
          </div>
          {this._isLoading() ? (
            <div className={styles.loader}>
              <Loader dataHook="loader" size="small" />
            </div>
          ) : null}
          <div className={styles.buttonContainer}>
            <IconButton
              dataHook="next-button"
              priority="secondary"
              onClick={() => this._next()}
            >
              <ChevronRightLarge />
            </IconButton>
          </div>
        </div>
        <div className={styles.pagination}>
          {this.props.images &&
            this.props.images.map((image, currentIndex) => {
              return (
                <div
                  key={currentIndex}
                  className={classNames(styles.dot, {
                    [styles.active]: this._isDotActive(currentIndex),
                  })}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

Carousel.defaultProps = Object.assign(
  {
    infinite: true,
  },
  WixComponent.defaultProps,
);
Carousel.displayName = 'Carousel';

export default Carousel;
