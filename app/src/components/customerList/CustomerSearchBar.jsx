import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useCurrentPageAndSearch from "../../hooks";
import Input from "../common/Input";

export default function CustomerSearchBar({ onStopTyping }) {
  const { search } = useCurrentPageAndSearch();
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setValue(search);
  }, [search]);

  function onValueChangeHandle(inputValue) {
    if (timer) clearTimeout(timer);
    setValue(inputValue);
    setTimer(setTimeout(() => onStopTyping(inputValue), 500));
  }

  return (
    <Input
      type="email"
      placeholder="Nome, CPF, Email ou Telefone"
      value={value}
      onChange={onValueChangeHandle}
    />
  );
}

CustomerSearchBar.propTypes = {
  onStopTyping: PropTypes.func.isRequired,
};
