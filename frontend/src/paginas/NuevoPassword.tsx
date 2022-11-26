import React from "react";
import { Link } from "react-router-dom";

const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Restable tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 rounded-lg bg-white py-5 px-10 shadow">
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
          />
        </div>

        <input
          type="submit"
          value="Guardar nuevo password"
          className="mb-5 w-full rounded bg-sky-700 py-3 font-bold uppercase text-white transition-colors hover:cursor-pointer hover:bg-sky-800"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
