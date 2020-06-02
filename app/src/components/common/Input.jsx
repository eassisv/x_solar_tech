import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import "../../styles/Input.css";

// eslint-disable-next-line react/jsx-props-no-spreading
const getInput = (props) => <input {...props} className="form-input" />;

export default function Input({
  type,
  name,
  value,
  error,
  label,
  placeholder,
  onChange,
  onBlur,
  mask,
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
      {mask ? (
        <InputMask
          formatChars={{ "9": "[0-9]", "?": "[0-9 ]" }}
          maskChar={null}
          mask={mask}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChangeHandle}
          onBlur={onBlur}
        >
          {getInput}
        </InputMask>
      ) : (
        getInput({
          type,
          name,
          value,
          placeholder,
          onChange: onChangeHandle,
          onBlur,
        })
      )}
      <div>{error}</div>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  mask: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  label: null,
  name: null,
  error: undefined,
  placeholder: "",
  onBlur: () => {},
  mask: null,
};
