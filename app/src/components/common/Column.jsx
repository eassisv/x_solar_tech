import React from "react";
import PropTypes from "prop-types";
import "../../styles/Column.css";

export default function Column({ children }) {
  return <div className="column ">{children}</div>;
}

Column.propTypes = {
  children: PropTypes.element,
};

Column.defaultProps = {
  children: null,
};
