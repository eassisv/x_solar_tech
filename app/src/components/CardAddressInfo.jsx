import React from "react";
import PropTypes from "prop-types";

const cepRegex = /^([0-9]{5})([0-9]{3})$/;

export default function CardAddressInfo({ addresses }) {
  return (
    <fieldset>
      <legend>Endereço</legend>
      {addresses.map((address) => (
        <div key={address.id} className="card__address-wrapper">
          <div className="card__address-item">
            CEP: {address.cep.replace(cepRegex, "$1-$2")}
          </div>
          <div className="card__address-item">
            Rua {address.street}, Nº {address.number}, bairro{" "}
            {address.neighborhood},{" "}
            <span className="card__address-item-city">
              {address.city} &mdash; {address.state}
            </span>
          </div>
          {address.others ? (
            <div className="card__address-item">
              Complemento: {address.others}
            </div>
          ) : null}
        </div>
      ))}
    </fieldset>
  );
}

CardAddressInfo.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      neighborhood: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      cep: PropTypes.string.isRequired,
      others: PropTypes.string,
    })
  ).isRequired,
};
