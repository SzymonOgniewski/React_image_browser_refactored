import React from 'react';
import PropTypes from 'prop-types';
import css from './imagegalleryitem.module.css';

export const ImageGalleryItem = ({ id, smallImg, tags, largeImg, onClick }) => {
  const handleModalOpen = () => onClick(largeImg, tags);

  return (
    <li key={id} className={css.galleryItem}>
      <img
        src={smallImg}
        alt={tags}
        className={css.galleryItemImg}
        onClick={handleModalOpen}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImg: PropTypes.string,
};
