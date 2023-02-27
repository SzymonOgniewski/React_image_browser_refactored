import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

export const Modal = ({ largeImg, tags, onCloseModal }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={css.overlay} onClick={onCloseModal}>
      <div className={css.modal}>
        <img src={largeImg} alt={tags} className={css.modalImg} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
  onCloseModal: PropTypes.func,
};
