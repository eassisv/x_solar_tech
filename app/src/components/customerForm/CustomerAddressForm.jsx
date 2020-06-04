import React, { useState } from "react";
import Row from "../common/Row";
import Column from "../common/Column";
import Input from "../common/Input";

export default function CustomerAddressForm({ customerForm, submitting }) {
  const [touched, setTouched] = useState({
    street: false,
    number: false,
    neighborhood: false,
    city: false,
    state: false,
    cep: false,
    others: false,
  });

  return (
    <>
      <Row>
        <Column>
          <Input value="" label="CEP" onChange={() => {}} />
        </Column>
        <Column>
          <Input value="" label="Rua" onChange={() => {}} />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input value="" label="Número" onChange={() => {}} />
        </Column>
        <Column>
          <Input value="" label="Bairro" onChange={() => {}} />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input value="" label="Cidade" onChange={() => {}} />
        </Column>
        <Column>
          <Input value="" label="Estado" onChange={() => {}} />
        </Column>
      </Row>
      <Input value="" label="Complemento" onChange={() => {}} />
    </>
  );
}
