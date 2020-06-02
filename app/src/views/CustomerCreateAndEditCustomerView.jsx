import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/common/Loading";
import Container from "../components/common/Container";
import CustomerForm from "../components/customerForm/CustomerForm";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default function CustomerCreateAndEditView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id !== "new") {
      (async () => {
        setLoading(true);
        try {
          /* buscamos o usuário novamente para garantir
          que os dados estão atualizados */
          const { data } = await instance.get(`/customers/${id}`);
          setCustomer(data);
        } catch (err) {
          console.log(err.response);
        }
        setLoading(false);
      })();
    }
  }, [id]);

  return (
    <Container>
      <Link to="/customers/">Voltar</Link>
      {loading ? <Loading /> : <CustomerForm customer={customer} />}
    </Container>
  );
}
