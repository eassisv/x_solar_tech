import React from "react";
import PropTypes from "prop-types";
import Spinner from "./common/Spinner";
import ErrorMessage from "./common/ErrorMessage";
import CustomerCard from "./CustomerCard";
import CustomerListPagination from "./CustomerListPagination";
import "../styles/CustomerList.css";

export default function CustomerList({
  loading,
  customerList,
  currentPage,
  lastPage,
}) {
  if (customerList === null && loading === false) return <ErrorMessage />;

  return (
    <>
      <CustomerListPagination currentPage={currentPage} lastPage={lastPage} />
      <div className="list__container">
        {loading ? (
          <Spinner />
        ) : (
          customerList.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        )}
      </div>
    </>
  );
}

CustomerList.propTypes = {
  loading: PropTypes.bool,
  customerList: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
};

CustomerList.defaultProps = {
  loading: false,
  customerList: [],
  currentPage: 1,
  lastPage: 1,
};
