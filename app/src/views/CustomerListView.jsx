import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useCurrentPageAndSearch from "../hooks";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import CustomerList from "../components/CustomerList";
import CustomerListPagination from "../components/CustomerListPagination";
import CustomerSearchBar from "../components/CustomerSearchBar";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default function CustomerListView() {
  const history = useHistory();
  const { currentPage, search } = useCurrentPageAndSearch();
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
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

  function onSearchHandle(value) {
    history.push(`customers?${value && `search=${value}`}`);
  }

  return (
    <Container>
      <Button variant="primary" to="/customers/new">
        Adicionar Cliente
      </Button>
      <CustomerSearchBar onStopTyping={onSearchHandle} />
      <CustomerList loading={loading} customerList={customerList} />
      <CustomerListPagination currentPage={currentPage} lastPage={lastPage} />
    </Container>
  );
}
