import React, { useState } from 'react';
import './searchBooks.css';
import { getBooksList } from '../api/apiCall';

const SearchBooks = ({ formState, setFormState }) => {

  const handleSearch = async () => {
    const response = await getBooksList(formState.searchText, formState.sortBy, formState.pageSize, formState.pageNumber);
    setFormState((prevState) => ({
      ...prevState,
      list: response.data.data,
      totalPages: response.data.pagination.totalPages,
      pageNumber: 1
    }));
  };

  return (
    <div className="book-search">
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          className='input-tag'
          type="text"
          value={formState.searchText}
          onChange={(e) => {
            setFormState((prevState) => ({
              ...prevState,
              searchText: e.target.value,
            }));
          }}
          placeholder="Search by title"
        />
      </div>
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBooks;
