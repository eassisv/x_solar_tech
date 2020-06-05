import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useCurrentPageAndSearch from "../hooks";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import CustomerList from "../components/customerList/CustomerList";
import CustomerListPagination from "../components/customerList/CustomerListPagination";
import CustomerSearchBar from "../components/customerList/CustomerSearchBar";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default function CustomerListView() {
  const history = useHistory();
  const { currentPage, search } = useCurrentPageAndSearch();
  const [toFetchData, setToFetchData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [lastPage, setLastPage] = useState(currentPage);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await instance.get("/customers", {
          params: { page: currentPage, ...(search !== "" ? { search } : {}) },
        });
        setCustomerList(data.customers);
        setLastPage(data.numPages);
      } catch (err) {
        setCustomerList(null);
      }
      setToFetchData(false);
      setLoading(false);
    })();
  }, [search, currentPage, toFetchData]);

  function onSearchHandle(value) {
    history.push(`/customers?${value && `search=${value}`}`);
  }

  async function onDeleteCardHandle(customerId) {
    setLoading(true);
    try {
      await instance.delete(`/customers/${customerId}/`);
      setToFetchData(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <Container>
      <Button variant="primary" to="/customers/new">
        Adicionar Cliente
      </Button>
      <CustomerSearchBar onStopTyping={onSearchHandle} />
      <CustomerList
        loading={loading}
        customerList={customerList}
        onDeleteCard={onDeleteCardHandle}
      />
      {lastPage > 1 && (
        <CustomerListPagination currentPage={currentPage} lastPage={lastPage} />
      )}
    </Container>
  );
}
