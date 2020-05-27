import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/Button.css";

export default function Button({ children, variant, small, onClick, to }) {
  const className = `button ${variant}${small ? " small" : ""}`;

  return to !== "" ? (
    <Link className={className} to={to}>
      {children}
    </Link>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  small: false,
  onClick: () => {},
  to: "",
};
