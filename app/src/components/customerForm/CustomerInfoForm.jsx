import React from "react";
import Row from "../common/Row";
import Column from "../common/Column";
import Input from "../common/Input";

const filteredValue = (value) => value.replace(/[^A-Za-z0-9]/g, "");

export default function CustomerInfoForm({ customerForm }) {
  const { state, touched, errors, changeHandle, blurHandle } = customerForm;

  return (
    <>
      <Row>
        <Column>
          <Input
            name="name"
            label="Nome"
            value={state.name}
            error={touched.name ? errors.name : ""}
            onChange={(value) => changeHandle("name", value)}
            onBlur={() => blurHandle("name")}
          />
        </Column>
        <Column>
          <Input
            name="cpf"
            label="CPF"
            value={state.cpf}
            onChange={(value) => changeHandle("cpf", filteredValue(value))}
            onBlur={() => blurHandle("cpf")}
            error={touched.cpf ? errors.cpf : ""}
            mask="999.999.999-99"
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name="email"
            label="Email"
            value={state.email}
            onChange={(value) => changeHandle("email", value)}
            onBlur={() => blurHandle("email")}
            error={touched.email ? errors.email : ""}
          />
        </Column>
        <Column>
          <Input
            name="phone"
            label="Telefone"
            value={state.phone}
            onChange={(value) => changeHandle("phone", value)}
            onBlur={() => blurHandle("phone")}
            error={touched.phone ? errors.phone : ""}
            mask={
              filteredValue(state.phone).length < 11
                ? "(99) 9999-9999?"
                : "(99) 99999-9999"
            }
          />
        </Column>
      </Row>
    </>
  );
}
