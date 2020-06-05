import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/common/Loading";
import Container from "../components/common/Container";
import ErrorMessage from "../components/common/ErrorMessage";
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
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [duplicatedErrors, setDuplicatedErrors] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (id !== "new")
        try {
          const { data } = await instance.get(`/customers/${id}`);
          setCustomer(data);
        } catch (err) {
          const { response } = err;
          if (response && response.status === 404) {
            history.replace("/http404/");
            return;
          }
          setUnexpectedError(true);
        }
      setLoading(false);
    })();
  }, [id, history]);

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
          history.replace("/customers/");
        } catch (err) {
          const { response } = err;
          if (response) {
            if (response.status === 404) {
              history.replace("/http404/");
              return;
            }
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
          }
          setLoading(false);
          setUnexpectedError(true);
        }
      })
      .catch(() => {
        window.scrollTo(0, 0);
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
      {unexpectedError ? (
        <ErrorMessage />
      ) : (
        <CustomerForm
          duplicatedErrors={duplicatedErrors}
          customer={customer}
          submitted={submitted}
          onSubmitHandle={onSubmitHandle}
        />
      )}
    </Container>
  );
}
