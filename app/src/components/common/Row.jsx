import React from "react";
import PropTypes from "prop-types";
import "../../styles/Row.css";

export default function Row({ children }) {
  return <div className="row">{children}</div>;
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Row.defaultProps = {
  children: null,
};
