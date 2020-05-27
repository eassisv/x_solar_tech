import React from "react";
import PropTypes from "prop-types";
import "../../styles/Button.css";

export default function Button({ children, variant, small, onClick }) {
  const smallClass = small ? " small" : "";

  return (
    <button
      type="button"
      className={`button ${variant}${smallClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string,
  small: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  variant: "primary",
  small: false,
};
