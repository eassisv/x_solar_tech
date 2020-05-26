import React from "react";
import PropTypes from "prop-types";
import "../styles/CardCustomerGeneralInfo.css";

const cpfRegex = /^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/;
const phoneRegex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})/;

export default function CardCustomerGeneralInfo({ cpf, email, phone }) {
  return (
    <div className="card__info-wrapper">
      <div className="card__info-item">
        {cpf.replace(cpfRegex, "$1.$2.$3-$4")}
      </div>
      <div className="card__info-item">{email}</div>
      <div className="card__info-item">
        {phone.replace(phoneRegex, "($1) $2-$3")}
      </div>
    </div>
  );
}

CardCustomerGeneralInfo.propTypes = {
  cpf: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
