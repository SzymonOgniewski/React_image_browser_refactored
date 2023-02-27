import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './imagegallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { LoadMoreBtn } from './Button/Button';

export const ImageGallery = ({ images, page, totalPages, onLoadMore }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTags, setSelectedTags] = useState('');

  const handleModalOpen = (largeImageURL, tags) => {
    setModalStatus(true);
    setSelectedImage(largeImageURL);
    setSelectedTags(tags);
  };
  const handleModalClose = () => setModalStatus(false);

  const list = images.map(img => (
    <ImageGalleryItem
      key={img.id}
      id={img.id}
      smallImg={img.webformatURL}
      largeImg={img.largeImageURL}
      tags={img.tags}
      onClick={handleModalOpen}
    />
  ));

  return (
    <>
      <ul className={css.gallery}>{list}</ul>
      {modalStatus && (
        <Modal
          largeImg={selectedImage}
          tags={selectedTags}
          onCloseModal={handleModalClose}
        />
      )}
      {page < totalPages && <LoadMoreBtn onLoadMore={onLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};
