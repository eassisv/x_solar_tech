import React from "react";
import Button from "./components/Button";
import Container from "./components/Container";

const App = () => (
  <div className="app">
    <Container>
      <Button variant="" onClick={() => console.log("Cliquei")}>
        Adicionar Cliente
      </Button>
    </Container>
  </div>
);

export default App;
