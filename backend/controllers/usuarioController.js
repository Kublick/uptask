import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarID.js";

const registrar = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    new Error("Usuario ya registrado");
    return res.status(400).json({ message: "Usuario ya registrado" });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { registrar };
