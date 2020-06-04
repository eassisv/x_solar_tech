import React, { useState, useCallback } from "react";
import { cpfMask, phoneMask } from "../../utils/masks";
import Row from "../common/Row";
import Column from "../common/Column";
import Input from "../common/Input";

// const filteredValue = (value) => value.replace(/[^A-Za-z0-9]/g, "");

export default function CustomerInfoForm({
  state,
  errors,
  onChangeHandle,
  submitting,
}) {
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    cpf: false,
  });

  function onBlurHandle(field) {
    return () => setTouched((oldState) => ({ ...oldState, [field]: true }));
  }

  const getError = useCallback(
    (field) => (touched[field] || submitting ? errors[field] : null),
    [errors, touched, submitting]
  );

  return (
    <>
      <Row>
        <Column>
          <Input
            name="name"
            label="Nome"
            value={state.name}
            error={getError("name")}
            onChange={onChangeHandle("name")}
            onBlur={onBlurHandle("name")}
          />
        </Column>
        <Column>
          <Input
            name="cpf"
            label="CPF"
            value={state.cpf}
            onChange={onChangeHandle("cpf")}
            onBlur={onBlurHandle("cpf")}
            error={getError("cpf")}
            mask={cpfMask}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name="email"
            label="Email"
            value={state.email}
            onChange={onChangeHandle("email")}
            onBlur={onBlurHandle("email")}
            error={getError("email")}
          />
        </Column>
        <Column>
          <Input
            name="phone"
            label="Telefone"
            value={state.phone}
            onChange={onChangeHandle("phone")}
            onBlur={onBlurHandle("phone")}
            error={getError("phone")}
            mask={phoneMask}
          />
        </Column>
      </Row>
    </>
  );
}
