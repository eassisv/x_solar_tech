import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "../../styles/CustomerForm.css";
import useFormValidation from "../../hooks/formValidation";
import { customerSchema } from "../../utils/schemas";
import CustomerInfoForm from "./CustomerInfoForm";

function getCustomerInitialState(customer) {
  const initialState = { name: "", cpf: "", email: "", phone: "" };
  return customer
    ? Object.keys(initialState).reduce(
        (acc, field) => ({ ...acc, [field]: customer[field] }),
        {}
      )
    : initialState;
}

export default function CreateAndEditCustomerForm({ customer }) {
  const customerForm = useFormValidation(
    getCustomerInitialState(customer),
    customerSchema
  );

  console.log(customerForm);

  return (
    <form className="form__container">
      <CustomerInfoForm customerForm={customerForm} />
    </form>
  );
}

CreateAndEditCustomerForm.propTypes = {
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
  customer: {},
};
