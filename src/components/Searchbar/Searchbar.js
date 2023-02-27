import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setValue(value);
  };
  const handleFormSubmit = e => {
    onSubmit(e, value);
    setValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          name="query"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
