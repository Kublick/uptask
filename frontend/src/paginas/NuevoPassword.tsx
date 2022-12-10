import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import { api } from "../lib/axios";

const NuevoPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [alerta, setAlerta] = useState({ msg: "", error: false });
  const { token } = params;
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await api(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setAlerta({
            msg: err.response.data.message,
            error: true,
          });
        }
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const { data } = await api.post(`/usuarios/olvide-password/${token}`, {
        password,
      });
      setPasswordModificado(true);
      setAlerta({
        msg: data.message,
        error: false,
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setAlerta({
          msg: err.response.data.message,
          error: true,
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Restable tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alerta.msg.length !== 0 ? (
        <Alerta
          alerta={{
            msg: alerta?.msg,
            error: alerta?.error,
          }}
        />
      ) : null}
      {tokenValido && (
        <form
          className="my-10 rounded-lg bg-white py-5 px-10 shadow"
          onSubmit={handleSubmit}
        >
          <div className="my-5 ">
            <label
              className="block text-xl font-bold uppercase text-gray-600"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="mb-5 w-full rounded bg-sky-700 py-3 font-bold uppercase text-white transition-colors hover:cursor-pointer hover:bg-sky-800"
          />
        </form>
      )}
      {passwordModificado ? (
        <Link
          className="my-5 block text-center uppercase text-slate-500"
          to="/"
        >
          Iniciar Sesión
        </Link>
      ) : null}
    </>
  );
};

export default NuevoPassword;
