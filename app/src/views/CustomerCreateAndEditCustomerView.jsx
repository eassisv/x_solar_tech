import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/common/Loading";
import Container from "../components/common/Container";
import CustomerForm from "../components/customerForm/CustomerForm";
import "../styles/CustomerCreateAndEditPage.css";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
const cleanMask = (value) => value.replace(/\D/g, "");

export default function CustomerCreateAndEditView() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [duplicatedErrors, setDuplicatedErrors] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (id !== "new")
        try {
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
    validate
      .then(async (state) => {
        const cpf = cleanMask(state.cpf);
        const phone = cleanMask(state.phone);
        const addresses = state.addresses.map((address) => ({
          ...address,
          cep: cleanMask(address.cep),
        }));
        try {
          const finalState = { ...state, cpf, phone, addresses };
          if (id === "new") await instance.post("/customers/", finalState);
          else await instance.put(`/customers/${id}/`, finalState);
          history.push("/customers/");
        } catch (err) {
          const { response } = err;
          if (response) {
            const { data } = response;
            if (data.errors) {
              const { errors } = data;
              const hasNoDuplicatedError = (field) =>
                errors[field] &&
                errors[field].filter((error) => error.type === "no-duplicate")
                  .length > 0;
              const duplicatedItems = {
                cpf: hasNoDuplicatedError("cpf"),
                email: hasNoDuplicatedError("email"),
              };
              if (Object.keys(duplicatedItems).length) {
                setDuplicatedErrors(duplicatedItems);
                setLoading(false);
                return;
              }
            }
            if (response.status === 404) {
              history.push("/http404/");
              return;
            }
          }
          history.push("/error/");
        }
      })
      .catch(() => {
        setLoading(false);
        setSubmitted(true);
      });
  }

  return (
    <Container>
      <Link className="form__go-back-link" to="/customers/">
        Voltar
      </Link>
      {loading && <Loading />}
      <CustomerForm
        duplicatedErrors={duplicatedErrors}
        customer={customer}
        submitted={submitted}
        onSubmitHandle={onSubmitHandle}
      />
    </Container>
  );
}
