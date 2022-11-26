import React from "react";

type Props = {
  alerta: {
    msg: string;
    error: boolean;
  };
};

const Alerta = ({ alerta }: Props) => {
  return (
    <div
      className={`
    ${alerta.error ? "from-red-400 to-red-600  " : "from-sky-400 to-sky-600"}
    my-10 rounded-xl bg-gradient-to-br p-3 text-center text-sm uppercase text-white 
    `}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
