import React from "react";
import PropTypes from "prop-types";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import CustomerCard from "./CustomerCard";
import "../../styles/CustomerList.css";

export default function CustomerList({ loading, customerList, onDeleteCard }) {
  console.log("mounting");

  if (customerList === null && loading === false) return <ErrorMessage />;

  return (
    <div className="list__container">
      {loading && <Loading />}
      {customerList &&
        customerList.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onDelete={onDeleteCard}
          />
        ))}
    </div>
  );
}

CustomerList.propTypes = {
  loading: PropTypes.bool,
  customerList: PropTypes.arrayOf(PropTypes.object),
  onDeleteCard: PropTypes.func,
};

CustomerList.defaultProps = {
  loading: false,
  customerList: [],
  onDeleteCard: () => {},
};
