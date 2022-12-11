import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  console.log(
    "🚀 ~ file: RutaProtegida.tsx:7 ~ RutaProtegida ~ cargando",
    cargando
  );
  console.log("🚀 ~ file: RutaProtegida.tsx:7 ~ RutaProtegida ~ auth", auth);
  if (cargando) {
    return <p>Cargando</p>;
  }

  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RutaProtegida;
