import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../../styles/CustomerForm.css";
import customerSchema from "../../utils/schemas";
import Button from "../common/Button";
import CustomerInfoForm from "./CustomerInfoForm";
import CustomerAddressForm from "./CustomerAddressForm";

function getCustomerInitialState(customer) {
  const initialState = {
    name: "",
    cpf: "",
    email: "",
    phone: "",
    addresses: [],
  };
  return customer
    ? Object.keys(initialState).reduce(
        (acc, field) => ({ ...acc, [field]: customer[field] }),
        {}
      )
    : initialState;
}

const getErrors = ({ inner }) =>
  inner
    ? inner.reduce((acc, err) => ({ [err.path]: err.errors[0], ...acc }), {})
    : {};

export default function CustomerForm({ customer }) {
  const [state, setState] = useState(getCustomerInitialState(customer));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback(() => {
    customerSchema
      .validate(state, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        setErrors(getErrors(err));
      });
  }, [state]);

  function onChangeHandle(field) {
    return (value) => setState((oldState) => ({ ...oldState, [field]: value }));
  }

  function onSubmitHandle(event) {
    event.preventDefault();
    setSubmitting(true);
  }

  useEffect(() => {
    validate();
  }, [state, validate]);

  return (
    <form className="form__container" onSubmit={onSubmitHandle}>
      <CustomerInfoForm
        state={state}
        errors={errors}
        onChangeHandle={onChangeHandle}
        submitting={submitting}
      />
      <hr />
      <CustomerAddressForm customerForm={{}} />
      <Button type="submit" onClick={() => {}}>
        {customer ? "Salvar" : "Cadastrar"}
      </Button>
    </form>
  );
}

CustomerForm.propTypes = {
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

CustomerForm.defaultProps = {
  customer: {},
};
