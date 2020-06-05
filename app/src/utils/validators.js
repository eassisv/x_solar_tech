export const phoneValidate = (phone) =>
  /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/.test(phone);

export const numberValidate = (string) => /^\d*$/.test(string);

export const cepValidate = (cep) => cep.replace(/\D/g, "").length === 8;
