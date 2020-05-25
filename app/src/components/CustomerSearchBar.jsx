import React, { useState } from "react";
import PropTypes from "prop-types";

export default function CustomerSearchBar({ onStopTyping }) {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(null);

  function onValueChangeHandle(event) {
    const inputValue = event.target.value;
    if (timer) clearTimeout(timer);
    setValue(inputValue);
    if (inputValue) setTimer(setTimeout(() => onStopTyping(inputValue), 1000));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome, CPF, Email ou Telefone"
        value={value}
        onChange={onValueChangeHandle}
      />
    </div>
  );
}

CustomerSearchBar.propTypes = {
  onStopTyping: PropTypes.func.isRequired,
};
