import React from "react";
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
