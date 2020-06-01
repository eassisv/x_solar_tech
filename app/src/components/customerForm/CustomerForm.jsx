import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "../common/Row";
import Column from "../common/Column";
import Input from "../common/Input";
import Loading from "../common/Loading";
import "../../styles/CustomerForm.css";

export default function CreateAndEditCustomerForm({ loading, customer }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const tmp = {};
    (() => {
      [("name", "email", "phone", "cpf", "addresses")].forEach((field) => {
        tmp[field] = customer[field] || "";
      });
    })();
  }, [customer]);

  return (
    <form className="form__container">
      {loading && <Loading />}
      <Row>
        <Column>
          <Input
            name="name"
            label="Nome"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />
        </Column>
        <Column>
          <Input
            name="cpf"
            label="CPF"
            value={formData.cpf}
            onChange={console.log}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name="email"
            label="Email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />
        </Column>
        <Column>
          <Input
            name="phone"
            label="Telefone"
            value={formData.phone}
            onChange={console.log}
          />
        </Column>
      </Row>
      <Input
        name="phone"
        label="Telefone"
        value={formData.phone}
        onChange={console.log}
      />
    </form>
  );
}

CreateAndEditCustomerForm.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.shape({
    id: PropTypes.number,
    street: PropTypes.string,
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    cep: PropTypes.string,
    others: PropTypes.string,
  }),
};

CreateAndEditCustomerForm.defaultProps = {
  loading: false,
  customer: {},
};
