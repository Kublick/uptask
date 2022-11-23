import express from "express";

import { registrar, autenticar } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);

export default router;
