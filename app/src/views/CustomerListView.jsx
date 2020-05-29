import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import CustomerList from "../components/CustomerList";
import CustomerSearchBar from "../components/CustomerSearchBar";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

function useCurrentPage() {
  const currentPage = Number(
    new URLSearchParams(useLocation().search).get("page")
  );
  return Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
}

export default function CustomerListView() {
  const currentPage = useCurrentPage();
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [search, setSearch] = useState("");
  const [lastPage, setLastPage] = useState(currentPage);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await instance.get("/customers", {
          params: { page: currentPage, ...(search !== "" ? { search } : {}) },
        });
        setLastPage(response.data.numPages);
        setCustomerList(response.data.customers);
      } catch (err) {
        setCustomerList(null);
      }
      setLoading(false);
    })();
  }, [search, currentPage]);

  return (
    <Container>
      <Button variant="primary" to="/customers/new">
        Adicionar Cliente
      </Button>
      <CustomerSearchBar onStopTyping={setSearch} />
      <CustomerList
        loading={loading}
        customerList={customerList}
        currentPage={currentPage}
        lastPage={lastPage}
      />
    </Container>
  );
}
