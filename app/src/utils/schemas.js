import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
});

export const customerSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  cpf: yup.string().length(11, "CPF inválido").required(),
  email: yup.string().email().max(255).required(),
  phone: yup.string().min(10).max(11).required(),
});
