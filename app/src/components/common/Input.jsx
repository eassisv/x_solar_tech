import React from "react";
import PropTypes from "prop-types";
import "../../styles/Input.css";

export default function Input({
  name,
  value,
  error,
  label,
  placeholder,
  onChange,
  onBlur,
  mask,
  type,
  maxLength,
}) {
  function onChangeHandle(event) {
    const input = event.target.value;
    const inputValue = mask(
      type === "number" ? input.replace(/\D/g, "") : input
    );
    if (maxLength && inputValue.length <= maxLength) onChange(inputValue);
  }

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        name={name}
        value={mask(value)}
        placeholder={placeholder}
        className="form-input"
        type="text"
        onChange={onChangeHandle}
        onBlur={onBlur}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.func,
  type: PropTypes.oneOf(["text", "number"]),
  maxLength: PropTypes.number,
};

Input.defaultProps = {
  label: null,
  name: null,
  error: undefined,
  placeholder: "",
  onBlur: () => {},
  mask: (value) => value,
  maxLength: 254,
  type: "text",
};
