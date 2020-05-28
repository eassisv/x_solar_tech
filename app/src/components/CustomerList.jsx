import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "./CustomerCard";
import Spinner from "./common/Spinner";
import "../styles/CustomerList.css";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default function CustomerList({ search }) {
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await instance.get("/customers", {
          params: search !== "" ? { search } : {},
        });
        setCustomerList(response.data);
        setError(false);
      } catch (err) {
        setCustomerList([]);
        setError(true);
      }
      // setLoading(false);
    })();
  }, [search]);

  return (
    <div className="list__container">
      {loading ? (
        <Spinner />
      ) : (
        customerList.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))
      )}
    </div>
  );
}
