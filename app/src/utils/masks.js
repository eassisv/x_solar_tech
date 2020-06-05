export const cpfMask = (cpf) =>
  cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3}\.\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2")
    .replace(/(\d{3}\.\d{3}\.\d{3}-\d{2})(.)/, "$1");

export const phoneMask = (phone) =>
  phone
    .replace(/(\D)/g, "")
    .replace(/(\d)/, "($1")
    .replace(/(\(\d{2})(\d)/, "$1) $2")
    .replace(/(\(\d{2}\) \d{4})(\d)/, "$1-$2")
    .replace(/(\(\d{2}\) \d{4})(-)(\d{1})(\d{4})/, "$1$3-$4")
    .replace(/(\(\d{2}\) \d{5}-\d{4})./, "$1");

export const cepMask = (cep) =>
  cep
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{1,3})/, "$1-$2")
    .replace(/(\d{5}-\d{3})./, "$1");

export const numberMask = (string) => String(string).replace(/\D/g, "");
