import * as yup from "yup";
import CPF from "cpf-check";
import { phoneValidate, numberValidate } from "./validators";

yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  number: "Número inválido",
});

const address = yup.object().shape({
  street: yup.string().required(),
  number: yup
    .string()
    .required()
    .test("is-number", "Número inválido", numberValidate),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  cep: yup.string().required(),
  others: yup.string(),
});

export default yup.object().shape({
  name: yup.string().required(),
  cpf: yup
    .string()
    .required()
    .test("invalid-cpf", "CPF inválido", CPF.validate),
  email: yup.string().email("Email inválido").required(),
  phone: yup
    .string()
    .required()
    .test("invalid-phone", "Número inválido", phoneValidate),
  addresses: yup.array().of(address),
});
