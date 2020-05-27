import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "../styles/CardCollapseContainer.css";

export default function CardCollapseContainer({ children }) {
  const [closed, setClosed] = useState(true);
  const collapseClass = useMemo(() => (closed ? " closed" : ""), [closed]);

  return (
    <div className="card__collapse-container">
      <div className={`card__collapse-content${collapseClass}`}>{children}</div>
      {!closed && <hr />}
      <button
        type="button"
        className={`card__collapse-button${collapseClass}`}
        onClick={() => setClosed(!closed)}
      >
        <div className={`card__collapse-button-icon${collapseClass}`} />
      </button>
    </div>
  );
}

CardCollapseContainer.propTypes = {
  children: PropTypes.element,
};

CardCollapseContainer.defaultProps = {
  children: <div />,
};
