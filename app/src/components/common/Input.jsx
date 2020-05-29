import React from "react";
import PropTypes from "prop-types";
import "../../styles/Input.css";

export default function Input({ type, placeholder, value, onChange }) {
  function onChangeHandle(input) {
    onChange(input);
  }

  return (
    <input
      className="form-input"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandle}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
};
