import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import { api } from "../lib/axios";

type AlertaProps = {
  msg: string;
  error: boolean;
};

const LoginValidation = z.object({
  password: z.string().min(6, { message: "Todos los campos son obligatorios" }),
  email: z.string().email({ message: "Correo invalido" }),
});

type LoginValidationProps = z.infer<typeof LoginValidation>;

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const [alerta, setAlerta] = useState<AlertaProps>({
    msg: "",
    error: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginValidationProps>({
    defaultValues: {
      password: "",
      email: "",
    },

    resolver: zodResolver(LoginValidation),
  });

  const onSubmit = async (loginData: LoginValidationProps) => {
    try {
      const { data } = await api.post("/usuarios/login", loginData);
      setAuth(data);
      localStorage.setItem("token", data.token);
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

      <form
        className="my-10 rounded-lg bg-white py-5 px-10 shadow"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
            {...register("email")}
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
        <input
          type="submit"
          value="Iniciar Sesion"
          className="mb-5 w-full rounded bg-sky-700 py-3 font-bold uppercase text-white transition-colors hover:cursor-pointer hover:bg-sky-800"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="registrar" className="my-5 block uppercase text-slate-500">
          ¿No tienes una cuenta? Régistrate
        </Link>
        <Link
          to="olvide-password"
          className="my-5 block uppercase text-slate-500"
        >
          Olvide Mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
