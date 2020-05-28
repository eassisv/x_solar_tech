import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "./CustomerCard";
import Spinner from "./common/Spinner";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default function CustomerList({ search }) {
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    async function fetchData(search) {
      setLoading(true);
      try {
        const params = search !== "" ? { search } : {};
        const response = await instance.get("/customers", {
          params,
        });
        setCustomerList(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData(search);
  }, [search]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="list__container">
      {customerList.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
