import { useState, useEffect, useCallback } from "react";

const getUntouchedObj = (state) =>
  Object.keys(state).reduce((acc, field) => ({ ...acc, [field]: false }), {});

const getErrors = ({ inner }) =>
  inner
    ? inner.reduce((acc, err) => ({ [err.path]: err.errors, ...acc }), {})
    : {};

export default function useFormValidation(initialState, schema) {
  const [state, setState] = useState(initialState);
  const [touched, setTouched] = useState(getUntouchedObj(initialState));
  const [errors, setErrors] = useState(false);
  // const [yupSchema, setYupSchema] = useState(schema);

  const validate = useCallback(async () => {
    try {
      await schema.validate(state, { abortEarly: false });
      setErrors({});
    } catch (err) {
      console.log(err);
      setErrors(getErrors(err));
    }
  }, [state, schema]);

  const changeHandle = useCallback((field, value) => {
    setState((oldState) => ({ ...oldState, [field]: value }));
  }, []);

  const blurHandle = useCallback((field) => {
    setTouched((oldValue) => ({ ...oldValue, [field]: true }));
  }, []);

  const resetState = useCallback((newState) => {
    setState(newState);
    setTouched(getUntouchedObj(newState));
  }, []);

  const handleSubmit = useCallback(async () => {
    await validate();
  }, [validate]);

  useEffect(() => {
    (async () => {
      await validate();
    })();
  }, [state, validate]);

  return {
    state,
    touched,
    errors,
    resetState,
    changeHandle,
    blurHandle,
    handleSubmit,
  };
}
