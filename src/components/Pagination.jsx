import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
          onClick={() => handleClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="page-button"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
