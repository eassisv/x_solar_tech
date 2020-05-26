import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import CardCustomerGeneralInfo from "./CardCustomerGeneralInfo";
import CardAddressInfo from "./CardAddressInfo";
import CardCollapseContainer from "./CardCollapseContainer";
import "../styles/CustomerCard.css";

export default function CustomerCard({ customer }) {
  const [closed, setClosed] = useState(true);
  const collapseClass = useMemo(() => (closed ? " closed" : ""), [closed]);

  return (
    <div className="card__container">
      <h4 className="card__tittle">{customer.name}</h4>
      <CardCustomerGeneralInfo
        cpf={customer.cpf}
        email={customer.email}
        phone={customer.phone}
      />
      <CardCollapseContainer>
        <CardAddressInfo addresses={customer.addresses} />
      </CardCollapseContainer>
    </div>
  );
}

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
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
    ),
  }).isRequired,
};
