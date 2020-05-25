import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CustomerSearchBar.css";

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
    <div className="search-bar__wrapper">
      <input
        type="text"
        className="search-bar__input"
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
