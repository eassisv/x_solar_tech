import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/Button.css";

export default function Button({
  children,
  variant,
  small,
  onClick,
  to,
  type,
}) {
  const className = `button ${variant}${small ? " small" : ""}`;
  const buttonElement =
    type === "submit" ? (
      <button type="submit" className={className} onClick={onClick}>
        {children}
      </button>
    ) : (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );

  return to !== "" ? (
    <Link className={className} to={to}>
      {children}
    </Link>
  ) : (
    buttonElement
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
};

Button.defaultProps = {
  variant: "primary",
  small: false,
  onClick: () => {},
  to: "",
  type: "button",
};
