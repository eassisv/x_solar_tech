import axios from "axios";

export const phoneValidate = (phone) =>
  /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/.test(phone);

export const numberValidate = (string) => /^\d*$/.test(string);

export const alreadyUsed = (field) => async (value) => {
  console.log(value);
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/customers/verify/`,
      {
        params: { [field]: value },
      }
    );
    return !data.emailOrCpfAlreadyUsed;
  } catch (err) {
    return true;
  }
};
