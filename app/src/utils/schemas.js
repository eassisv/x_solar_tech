import * as yup from "yup";
import CPF from "cpf-check";
import { phoneValidate } from "./validators";

yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
});

const address = yup.object().shape({
  street: yup.string().required(),
  number: yup.number().required(),
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
    .test("invalid-cpf", "CPF inválido", CPF.validate)
    .required(),
  email: yup.string().email("Email inválido").required(),
  phone: yup
    .string()
    .test("invalid-phone", "Número inválido", phoneValidate)
    .required(),
  addresses: yup.array().of(address),
});
