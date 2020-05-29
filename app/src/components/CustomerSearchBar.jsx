import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./common/Input";

export default function CustomerSearchBar({ onStopTyping }) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(null);

  function onValueChangeHandle(event) {
    const inputValue = event.target.value;
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
