import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import React from 'react';
import styles from './Carousel.scss';
import ChevronLeftLarge from '../new-icons/ChevronLeftLarge';
import ChevronRightLarge from '../new-icons/ChevronRightLarge';
import IconButton from '../IconButton/IconButton';
import Loader from '../Loader/Loader';
import cloneDeep from 'clone-deep';

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
  }

  prev() {
    this.setState({
      activeIndex: this.getPrevIndex(),
    });
  }

  next() {
    this.setState({
      activeIndex: this.getNextIndex(),
    });
  }

  getNextIndex() {
    return this.state.activeIndex === this.state.images.length - 1
      ? 0
      : this.state.activeIndex + 1;
  }

  getPrevIndex() {
    return this.state.activeIndex === 0
      ? this.state.images.length - 1
      : this.state.activeIndex - 1;
  }

  onImageLoad() {
    this.setState(state => {
      const loadedImageCount = state.loadedImageCount + 1;
      return {
        loadedImageCount,
      };
    });
  }

  isLoading() {
    return this.state.loadedImageCount < this.state.images.length;
  }

  isDotActive(index) {
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
              onClick={() => this.prev()}
            >
              <ChevronLeftLarge />
            </IconButton>
          </div>
          <div
            className={classNames([
              styles.imageContainer,
              { [styles.loading]: this.isLoading() },
            ])}
          >
            {this.state.images.map((image, currentIndex) => {
              return (
                <div
                  key={currentIndex}
                  style={{ transition: this.props.transition }}
                  className={classNames(styles.image, {
                    [styles.active]: currentIndex === this.state.activeIndex,
                    [styles.prev]: currentIndex === this.getPrevIndex(),
                    [styles.next]: currentIndex === this.getNextIndex(),
                  })}
                >
                  <img src={image.src} onLoad={() => this.onImageLoad()} />
                </div>
              );
            })}
          </div>
          {this.isLoading() ? (
            <div className={styles.loader}>
              <Loader dataHook="loader" size="small" />
            </div>
          ) : null}
          <div className={styles.buttonContainer}>
            <IconButton
              dataHook="next-button"
              priority="secondary"
              onClick={() => this.next()}
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
                    [styles.active]: this.isDotActive(currentIndex),
                  })}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = WixComponent.propTypes;
Carousel.defaultProps = WixComponent.defaultProps;
Carousel.displayName = 'Carousel';

export default Carousel;
