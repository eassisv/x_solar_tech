import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Row from "../common/Row";
import Column from "../common/Column";
import Button from "../common/Button";
import Loading from "../common/Loading";
import Input from "../common/Input";
import { cepMask } from "../../utils/masks";

const viaCepWSUrl = (cep) => `https://viacep.com.br/ws/${cep}/json/`;
export default function CustomerAddressForm({
  index,
  state,
  errors,
  submitted,
  onChangeHandle,
  canRemoveAddress,
  onAddressDeleteHandle,
}) {
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    street: false,
    number: false,
    neighborhood: false,
    city: false,
    state: false,
    cep: false,
    others: false,
  });

  const getFieldName = (field) => `${index}.${field}`;

  const getError = (field) =>
    touched[getFieldName(field)] || submitted
      ? errors[getFieldName(field)]
      : "";

  const onBlurHandle = (field) => () =>
    setTouched((prevState) => ({ ...prevState, [getFieldName(field)]: true }));

  async function findAddressWithCep() {
    onBlurHandle("cep")();
    const { cep } = state;
    setLoading(true);
    try {
      const { data } = await axios.get(viaCepWSUrl(cep.replace(/\D/g, "")));
      onChangeHandle(getFieldName("street"))(data.logradouro || "");
      onChangeHandle(getFieldName("neighborhood"))(data.bairro || "");
      onChangeHandle(getFieldName("city"))(data.localidade || "");
      onChangeHandle(getFieldName("state"))(data.uf || "");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="form__address-container">
      {loading && <Loading />}
      {canRemoveAddress && (
        <div className="form__address-remove-button">
          <Button
            variant="danger"
            small
            onClick={() =>
              onAddressDeleteHandle(Number(index.replace(/\D/g, "")))
            }
          >
            Remover
          </Button>
        </div>
      )}
      <Row>
        <Column>
          <Input
            value={state.cep}
            label="CEP"
            onChange={onChangeHandle(getFieldName("cep"))}
            onBlur={findAddressWithCep}
            error={getError("cep")}
            mask={cepMask}
          />
        </Column>
        <Column>
          <Input
            value={state.number}
            error={getError("number")}
            type="number"
            label="Número"
            onChange={onChangeHandle(getFieldName("number"))}
            onBlur={onBlurHandle("number")}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            value={state.street}
            label="Rua"
            onChange={onChangeHandle(getFieldName("street"))}
            onBlur={onBlurHandle("street")}
            error={getError("street")}
          />
        </Column>
        <Column>
          <Input
            value={state.neighborhood}
            label="Bairro"
            onChange={onChangeHandle(getFieldName("neighborhood"))}
            onBlur={onBlurHandle("neighborhood")}
            error={getError("neighborhood")}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            value={state.city}
            label="Cidade"
            onChange={onChangeHandle(getFieldName("city"))}
            onBlur={onBlurHandle("city")}
            error={getError("city")}
          />
        </Column>
        <Column>
          <Input
            value={state.state}
            label="Estado"
            onChange={onChangeHandle(getFieldName("state"))}
            onBlur={onBlurHandle("state")}
            error={getError("state")}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            value={state.others}
            label="Complemento"
            onChange={onChangeHandle(getFieldName("others"))}
            onBlur={onBlurHandle("others")}
            error={getError("others")}
          />
        </Column>
      </Row>
      <hr />
    </div>
  );
}

const addressProps = {
  id: PropTypes.number,
  cep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  street: PropTypes.string,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  neighborhood: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  others: PropTypes.string,
};

CustomerAddressForm.propTypes = {
  index: PropTypes.string.isRequired,
  state: PropTypes.shape(addressProps).isRequired,
  errors: PropTypes.shape(addressProps).isRequired,
  submitted: PropTypes.bool,
  onChangeHandle: PropTypes.func,
  canRemoveAddress: PropTypes.bool,
};

CustomerAddressForm.defaultProps = {
  submitted: false,
  onChangeHandle: () => {},
  canRemoveAddress: false,
};
