/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../../styles/CustomerForm.css";
import customerSchema from "../../utils/schemas";
import Button from "../common/Button";
import CustomerInfoForm from "./CustomerInfoForm";
import CustomerAddressForm from "./CustomerAddressForm";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
const emptyAddress = {
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
  others: "",
};

function getCustomerInitialState(customer) {
  const initialState = {
    name: "",
    cpf: "",
    email: "",
    phone: "",
    addresses: [emptyAddress],
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

export default function CustomerForm({
  customer,
  submitted,
  duplicatedErrors,
  onSubmitHandle,
}) {
  const [state, setState] = useState(getCustomerInitialState(customer));
  const [errors, setErrors] = useState({});

  const validate = useCallback(async () => {
    try {
      await customerSchema.validate(state, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      setErrors(getErrors(err));
      return false;
    }
  }, [state]);

  function onChangeHandle(field) {
    return (value) => {
      // setSubmitting(false);
      const stateField = field
        .replace(/(\w+)\[(\d+)\]\.(\w+)/, "$1 $2 $3")
        .split(" ");
      if (stateField.length === 1)
        setState((prevState) => ({ ...prevState, [field]: value }));
      else {
        const { addresses } = state;
        const newAddress = {
          ...addresses[stateField[1]],
          [stateField[2]]: value,
        };
        const newAddressList = addresses;
        newAddressList.splice(stateField[1], 1, newAddress);
        setState((prevState) => ({ ...prevState, addresses: newAddressList }));
      }
    };
  }

  async function beforeSubmit(event) {
    event.preventDefault();
    const valid = await validate(true);
    onSubmitHandle(
      new Promise((resolve, reject) => {
        if (valid) resolve({ ...state });
        else reject();
      })
    );
  }

  function addAddress() {
    const { addresses } = state;
    setState((prevState) => ({
      ...prevState,
      addresses: [...addresses, emptyAddress],
    }));
  }

  useEffect(() => {
    setErrors({
      cpf: duplicatedErrors.cpf && "Já existe cliente com este CPF", // : "",
      email: duplicatedErrors.email && "Já existe cliente com este Email", // : "",
    });
  }, [duplicatedErrors]);

  useEffect(() => {
    (async () => {
      await validate();
    })();
  }, [state, validate]);

  useEffect(() => {
    setState(getCustomerInitialState(customer));
  }, [customer]);

  return (
    <form className="form__container" onSubmit={beforeSubmit}>
      <CustomerInfoForm
        state={state}
        errors={errors}
        onChangeHandle={onChangeHandle}
        submitted={submitted}
      />
      <hr />
      {state.addresses.map((address, index) => (
        <CustomerAddressForm
          key={index}
          state={address}
          errors={errors}
          submitted={submitted}
          onChangeHandle={onChangeHandle}
          index={`addresses[${index}]`}
        />
      ))}
      <div className="form__buttons-wrapper">
        <Button variant="secondary" onClick={addAddress}>
          Adicionar endereço
        </Button>
        <Button type="submit" onClick={() => {}}>
          {customer ? "Salvar" : "Cadastrar"}
        </Button>
      </div>
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
  submitted: PropTypes.bool,
  onSubmitHandle: PropTypes.func,
  duplicatedErrors: PropTypes.shape({
    cpf: PropTypes.bool,
    email: PropTypes.bool,
  }),
};

CustomerForm.defaultProps = {
  customer: {},
  submitted: false,
  onSubmitHandle: () => {},
  duplicatedErrors: { cpf: false, email: false },
};
