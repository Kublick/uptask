import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tareas.js";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;
  const existeProyecto = await Proyecto.findById(proyecto);

  if (!existeProyecto) {
    return res.status(404).json({
      msg: "El proyecto no existe",
    });
  }
  if (existeProyecto.creador.toString() !== req.usuario.id.toString()) {
    const error = new Error("No autorizado");
    return res.status(404).json({ message: error.message });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    await tareaAlmacenada.save();

    res.json(tareaAlmacenada);
  } catch (err) {
    const error = new Error("Error al crear tarea");
    res.json({ message: error.message });
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    return res.status(404).json({
      msg: "La tarea no existe",
    });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    res.status(403).json({ message: error.message });
  }

  res.json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    return res.status(404).json({
      msg: "La tarea no existe",
    });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    res.status(403).json({ message: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenada = await tarea.save();
    res.json(tareaAlmacenada);
  } catch (err) {
    const error = new Error("Ocurrio un Error al actualizar tarea");
    res.status(403).json({ message: error.message });
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    return res.status(404).json({
      msg: "La tarea no existe",
    });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    res.status(403).json({ message: error.message });
  }

  try {
    await Tarea.findByIdAndDelete(id);
    res.status(201).json({ message: "Tarea Eliminada" });
  } catch (err) {
    const error = new Error("Ocurrio un error");
    res.status(404).json({ message: error.message });
  }
};

const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
