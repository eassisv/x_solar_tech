import { useState, useEffect, useCallback } from "react";

const getErrors = ({ inner }) =>
  inner
    ? inner.reduce((acc, err) => ({ [err.path]: err.errors[0], ...acc }), {})
    : {};

export default function useFormValidation(initialState, schema) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(false);

  console.log("chamando o hook");

  const validate = useCallback(() => {
    schema
      .validate(state, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        console.log(err);
        setErrors(getErrors(err));
      });
  }, [state, schema]);

  const onChangeHandle = useCallback(
    (field) => (value) =>
      setState((oldState) => ({
        ...oldState,
        [field]: value,
      })),
    []
  );

  const handleSubmit = useCallback(async () => {
    await validate();
  }, [validate]);

  return {
    state,
    errors,
    validate,
    onChangeHandle,
    handleSubmit,
  };
}
