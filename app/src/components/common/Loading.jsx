import React from "react";
import Spinner from "./Spinner";
import "../../styles/Loading.css";

export default function Loader() {
  return (
    <div className="loading">
      <Spinner />
    </div>
  );
}
