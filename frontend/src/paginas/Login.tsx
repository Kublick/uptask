import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Inicia sesión y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 rounded-lg bg-white py-5 px-10 shadow">
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
          />
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
          />
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
