import React from "react";
import "./PaginationComponent.css";

export const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} className={`pagination-page ${currentPage === i ? "pagination-active" : ""}`} onClick={() => handlePageClick(i)}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 1}>
        &laquo; Anterior
      </button>
      {renderPageNumbers()}
      <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
        Siguiente &raquo;
      </button>
    </div>
  );
};

