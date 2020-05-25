import React from "react";
import PropTypes from "prop-types";

export default function CustomerCard({ customer }) {
  return (
    <div className="card__container">
      <h4 className="card__tittle">{customer.name}</h4>
      <div className="card__general-info">
        <div className="card__info-item">{customer.cpf}</div>
        <div className="card__info-item">{customer.email}</div>
        <div className="card__info-item">{customer.phone}</div>
      </div>
    </div>
  );
}

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
