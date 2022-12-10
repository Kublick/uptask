import axios, { isAxiosError } from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { api } from "../lib/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState<string>("");
  const [alerta, setAlerta] = useState({ msg: "", error: false });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      console.log("entro");
      setAlerta({
        msg: "el Email es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const { data } = await api.post("/usuarios/olvide-password", { email });
      console.log(data);
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
  }
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Recupera tu acceso y no pierdas tus{" "}
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
      <form
        className="my-10 rounded-lg bg-white py-5 px-10 shadow"
        onSubmit={handleSubmit}
      >
        <div className="my-5 ">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="mb-5 w-full rounded bg-sky-700 py-3 font-bold uppercase text-white transition-colors hover:cursor-pointer hover:bg-sky-800"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/login" className="my-5 block uppercase text-slate-500">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link to="registrar" className="my-5 block uppercase text-slate-500">
          ¿No tienes una cuenta? Régistrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
