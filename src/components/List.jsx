import React, { useEffect, useState } from "react";
import "./List.css";
import { getBooksList } from "../api/apiCall";
import Pagination from "./Pagination";

const BookList = ({ formState, setFormState }) => {
  const fetchBooks = async (pageSize, sortBy, page) => {
    const response = await getBooksList(
      formState.searchText,
      sortBy,
      pageSize,
      page
    );
    if (response && response.data) {
      console.log(response.data);
      setFormState((prevState) => ({
        ...prevState,
        list: response.data.data,
        totalPages: response.data.pagination.totalPages,
      }));
    }
  };

  useEffect(() => {
    fetchBooks(formState.pageSize, formState.sortBy, formState.pageNumber);
  }, [formState.isModalOpen]);

  return (
    <>
      <select
        className="select-tag page-size"
        value={formState.pageSize}
        onChange={(e) => {
          const newValue = e.target.value;
          setFormState({ ...formState, pageSize: newValue });
          fetchBooks(newValue, formState.sortBy, formState.pageNumber);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
      <div className="page-sort">
        <label>Sort By: &nbsp;</label>
        <select className="select-tag"
          value={formState.sortBy}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormState({ ...formState, sortBy: newValue });
            fetchBooks(formState.pageSize, newValue, formState.pageNumber);
          }}
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      <div className="book-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Country</th>
              <th>Language</th>
              <th>Pages</th>
              <th>Year</th>
              <th>Link</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {formState && formState.list && formState.list.length > 0 ? (
              formState.list.map((book, index) => (
                <tr key={book.id} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.country}</td>
                  <td>{book.language}</td>
                  <td>{book.pages}</td>
                  <td>{book.year}</td>
                  <td>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {book.link}
                    </a>
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        setFormState((prevState) => ({
                          ...prevState,
                          isModalOpen: true,
                          isEdit: true,
                          bookData: {
                            id: book.id,
                            author: book.author,
                            country: book.country,
                            language: book.language,
                            link: book.link,
                            pages: book.pages,
                            title: book.title,
                            year: book.year,
                          },
                        }))
                      }
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="no-data"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
          currentPage={formState.pageNumber}
          totalPages={formState.totalPages}
          onPageChange={(page) => {
            setFormState((prevState) => ({
              ...prevState,
              pageNumber: page,
            }));
            fetchBooks(formState.pageSize, formState.sortBy, page);
          }}
        />
    </>
  );
};

export default BookList;
