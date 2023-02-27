import React from 'react';
import PropTypes from 'prop-types';
import css from './loadmorebtn.module.css';

export const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <>
      <button type="button" className={css.button} onClick={onLoadMore}>
        Load more...
      </button>
    </>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func,
};
