import React from "react";
import PropTypes from "prop-types";
import "../../styles/Input.css";

export default function Input({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
}) {
  function onChangeHandle(event) {
    onChange(event.target.value);
  }

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="form-input"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandle}
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
};
