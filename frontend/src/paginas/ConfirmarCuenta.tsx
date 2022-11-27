import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { effect } from "zod";
import Alerta from "../components/Alerta";
import { api } from "../lib/axios";
type AlertaProps = {
  msg: string;
  error: boolean;
};

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({ msg: "" } as AlertaProps);
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const { id } = useParams();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const confirmarCuenta = async () => {
        try {
          const { data } = await api(`/usuarios/confirmar/${id}`);
          setAlerta({
            msg: data.message,
            error: false,
          });
          setCuentaConfirmada(true);
        } catch (err) {
          if (axios.isAxiosError(err) && err.response) {
            setAlerta({ msg: err.response.data.message, error: true });
          }
        }
      };
      confirmarCuenta();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="mt-20 rounded-xl bg-white px-5 py-10 md:mt-5">
        {alerta.msg.length !== 0 ? (
          <Alerta
            alerta={{
              msg: alerta?.msg,
              error: alerta?.error,
            }}
          />
        ) : null}
        {cuentaConfirmada && (
          <Link to="registrar" className="my-5 block uppercase text-slate-500">
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
