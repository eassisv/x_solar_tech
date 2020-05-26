import React, { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";
import createFakeCustomerList from "../mock";

export default function CustomerList() {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    setCustomerList(createFakeCustomerList());
  }, []);

  return (
    <div className="list__container">
      {customerList.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
