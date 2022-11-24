import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findById(decoded.id).select(
        "id nombre email "
      );
      return next();
    } catch (error) {
      return res.status(404).json({ message: "Hubo un error" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }

  next();
};

export default checkAuth;
