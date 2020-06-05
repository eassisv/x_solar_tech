import React from "react";
import Container from "../components/common/Container";
import "../styles/Http404Page.css";

export default function Http404Page() {
  return (
    <Container>
      <div className="http404__message-wrapper">
        <h1>404</h1>
        <h3>Página não encontrada</h3>
      </div>
    </Container>
  );
}
