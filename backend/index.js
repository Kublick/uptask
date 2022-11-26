import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.includes(origin)) {
      // Puede consultar api
      callback(null, true);
    } else {
      // No puede consultar api
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

dotenv.config();

conectarDB();

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor Corriendo el puerto ${PORT}`);
});
