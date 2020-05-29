import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/CustomerListPagination.css";

const baseUrl = "/customers?page=";

export default function CustomerListPagination({
  currentPage,
  lastPage,
  onPageChange,
}) {
  function pageChangeHandle(page) {
    if (page < 1 || page > lastPage) return;
    onPageChange(page);
  }

  return (
    <div className="pagination__wrapper">
      <Link
        className={`pagination__link${currentPage === 1 ? " disabled" : ""}`}
        to={`${baseUrl}${currentPage - 1}`}
      >
        &#10094;
      </Link>
      <div className="pagination__page-display">
        <input type="number" value={currentPage} onChange={pageChangeHandle} />
        <div>{lastPage}</div>
      </div>
      <Link
        className={`pagination__link${
          currentPage === lastPage ? " disabled" : ""
        }`}
        to={`${baseUrl}${currentPage + 1}`}
      >
        &#10095;
      </Link>
    </div>
  );
}

CustomerListPagination.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

CustomerListPagination.defaultProps = {
  currentPage: 1,
  lastPage: 1,
  onPageChange: () => {},
};
