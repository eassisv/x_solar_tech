import React, { useState } from "react";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import CustomerList from "../components/CustomerList";
import CustomerSearchBar from "../components/CustomerSearchBar";

export default function CustomerListView() {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <Button variant="primary" to="/customers/new">
        Adicionar Cliente
      </Button>
      <CustomerSearchBar onStopTyping={(value) => setSearch(value)} />
      <CustomerList search={search} />
    </Container>
  );
}
