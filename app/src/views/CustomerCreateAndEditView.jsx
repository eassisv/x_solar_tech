import React from "react";
import { Link, useParams } from "react-router-dom";

export default function CustomerCreateAndEditView() {
  const { id } = useParams();

  return (
    <div>
      {id || "Hello World"}
      <Link to="/customers" replace>
        Voltar
      </Link>
    </div>
  );
}
