import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
  res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario.id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(401).json({ message: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario.id.toString()) {
    const error = new Error("No autorizado");
    return res.status(401).json({ message: error.message });
  }
  res.json(proyecto);
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(401).json({ message: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario.id.toString()) {
    const error = new Error("No autorizado");
    return res.status(401).json({ message: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (err) {
    console.log9err;
  }
};
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(401).json({ message: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario.id.toString()) {
    const error = new Error("No autorizado");
    return res.status(401).json({ message: error.message });
  }
  try {
    await Proyecto.findByIdAndDelete(id);
    res.status(200).json({ message: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};
const obtenerTaeeas = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTaeeas,
};
