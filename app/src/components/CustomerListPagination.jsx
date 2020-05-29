import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function getLinkUrl(currentPage, step, lastPage) {
  const targetPage = currentPage + step;
  return `/customers?page=${
    targetPage > 0 && targetPage <= lastPage ? targetPage : currentPage
  }`;
}

export default function CustomerListPagination({ currentPage, lastPage }) {
  return (
    <div>
      <Link
        className="pagination__link prev"
        to={getLinkUrl(currentPage, -1, lastPage)}
      >
        Anterior
      </Link>
      {currentPage}
      <Link
        className="pagination__link next"
        to={getLinkUrl(currentPage, 1, lastPage)}
      >
        Próxima
      </Link>
    </div>
  );
}

CustomerListPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
};
