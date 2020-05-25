import React from "react";
import PropTypes from "prop-types";

export default function Button({ children, variant, onClick }) {
  const className = `button ${variant}`;

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  variant: "primary",
};
