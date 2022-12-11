import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { User } from "../services/User";

type AuthContextProps = {
  auth: any;
  setAuth: (user: User) => void;
  cargando: boolean;
  setCargando: (cargando: boolean) => void;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await api(`/usuarios/perfil`, config);

        setAuth(data);
        navigate("/proyectos");
      } catch (err) {
        setAuth({});
        console.log(err);
      }
      setCargando(false);
    };
    autenticarUsuario();
    console.log(auth);
  }, [setAuth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
