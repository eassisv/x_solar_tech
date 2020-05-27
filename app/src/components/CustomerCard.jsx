import React from "react";
import PropTypes from "prop-types";
import Button from "./common/Button";
import CardCustomerGeneralInfo from "./CardCustomerGeneralInfo";
import CardAddressInfo from "./CardAddressInfo";
import CardCollapseContainer from "./CardCollapseContainer";
import "../styles/CustomerCard.css";

export default function CustomerCard({ customer }) {
  return (
    <div className="card__container">
      <div className="card__header">
        <h4 className="card__tittle">{customer.name}</h4>
        <div className="card__header-buttons">
          <Button variant="primary" small onClick={() => console.log("editar")}>
            Editar
          </Button>
          <Button variant="danger" small onClick={() => console.log("excluir")}>
            Excluir
          </Button>
        </div>
      </div>
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
