import React, { useState } from "react";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api } from "../lib/axios";
import Alerta from "../components/Alerta";

type AlertaProps = {
  msg: string;
  error: boolean;
};
export const CrearCuentaValidation = z
  .object({
    nombre: z.string().min(3, { message: "El campo es obligatorio" }),
    password: z
      .string()
      .min(6, { message: "Password muy corto, Minimo 6 caracteres" })
      .max(12, { message: "Maximo 12 caracteres" }),
    password2: z
      .string()
      .min(6, { message: "Password muy corto, Minimo 6 caracteres" })
      .max(12, { message: "Maximo 12 caracteres" }),
    email: z.string().email({ message: "Correo invalido" }),
  })
  .superRefine(({ password2, password }, ctx) => {
    if (password2 !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Los password no son iguales",
        path: ["password"],
      });
    }
  });

export type CrearCuentaProps = z.infer<typeof CrearCuentaValidation>;

const Registrar = () => {
  const [alerta, setAlerta] = useState({ msg: "" } as AlertaProps);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CrearCuentaProps>({
    defaultValues: {
      nombre: "",
      password: "",
      password2: "",
      email: "",
    },

    resolver: zodResolver(CrearCuentaValidation),
  });

  const onSubmit = async (formData: CrearCuentaProps) => {
    try {
      const { data } = await api.post("/usuarios", formData);
      setAlerta({ msg: data.message, error: false });
      reset();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setAlerta({ msg: err.response.data.message, error: true });
      }
    }
  };

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Inicia sesión y administra tus{" "}
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-5 ">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            {...register("nombre")}
            id="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
          />
        </div>
        {errors.nombre ? (
          <Alerta
            alerta={{
              msg: errors.nombre?.message || "",
              error: !!errors.nombre,
            }}
          />
        ) : null}

        <div className="my-5 ">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
          />
          {errors.email ? (
            <Alerta
              alerta={{
                msg: errors.email?.message || "",
                error: !!errors.email,
              }}
            />
          ) : null}
        </div>

        <div className="my-5 ">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
            {...register("password")}
          />
          {errors.password ? (
            <Alerta
              alerta={{
                msg: errors.password?.message || "",
                error: !!errors.password,
              }}
            />
          ) : null}
        </div>
        <div className="my-5 ">
          <label
            className="block text-xl font-bold uppercase text-gray-600"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu Password"
            className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
            {...register("password2")}
          />
          {errors.password2 ? (
            <Alerta
              alerta={{
                msg: errors.password2?.message || "",
                error: !!errors.password2,
              }}
            />
          ) : null}
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="mb-5 w-full rounded bg-sky-700 py-3 font-bold uppercase text-white transition-colors hover:cursor-pointer hover:bg-sky-800"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="registrar" className="my-5 block uppercase text-slate-500">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to="/olvide-password"
          className="my-5 block uppercase text-slate-500"
        >
          Olvide Mi password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
