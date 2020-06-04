import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/common/Loading";
import Container from "../components/common/Container";
import CustomerForm from "../components/customerForm/CustomerForm";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default function CustomerCreateAndEditView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (id !== "new")
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
  }, [id]);

  function onSubmitHandle(validate) {
    setLoading(true);
    setSubmitted(false);
    validate.then(console.log).catch(() => {
      setLoading(false);
      setSubmitted(true);
    });
  }

  return (
    <Container>
      <Link to="/customers/">Voltar</Link>
      {loading && <Loading />}
      <CustomerForm
        customer={customer}
        submitted={submitted}
        onSubmitHandle={onSubmitHandle}
      />
    </Container>
  );
}
