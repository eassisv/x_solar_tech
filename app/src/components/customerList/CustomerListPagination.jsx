import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/CustomerListPagination.css";

const baseUrl = "/customers?page=";

export default function CustomerListPagination({ currentPage, lastPage }) {
  function getPageList() {
    const linkList = [];
    for (
      let s = Math.max(1, currentPage - 2),
        e = Math.min(lastPage, currentPage + 2);
      s <= e;
      ++s
    ) {
      linkList.push(
        <li key={s} className="pagination__link">
          <Link
            className={s === currentPage ? "active" : ""}
            to={`${baseUrl}${s}`}
          >
            {s}
          </Link>
        </li>
      );
    }
    return linkList;
  }

  return (
    <div className="pagination__container">
      <ul>
        {currentPage > 1 && (
          <li className="pagination__link-prev">
            <Link to={`${baseUrl}${currentPage - 1}`}>&#10094;</Link>
          </li>
        )}
        {currentPage - 2 > 1 && (
          <li className="pagination__link-first">
            <Link to={`${baseUrl}1`}>1</Link>
          </li>
        )}
        <li>
          <ul>{getPageList()}</ul>
        </li>
        {currentPage + 2 < lastPage && (
          <li className="pagination__link-last">
            <Link to={`${baseUrl}${lastPage}`}>{lastPage}</Link>
          </li>
        )}
        {currentPage < lastPage && (
          <li className="pagination__link-next">
            <Link to={`${baseUrl}${currentPage + 1}`}>&#10095;</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

CustomerListPagination.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
};

CustomerListPagination.defaultProps = {
  currentPage: 1,
  lastPage: 1,
};
