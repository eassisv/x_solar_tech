import React from "react";
import PropTypes from "prop-types";
import "../../styles/Container.css";

const Container = ({ children }) => <div className="container">{children}</div>;

Container.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
};

Container.defaultProps = {
  children: "",
};

export default Container;
