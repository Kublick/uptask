import jwt from "jsonwebtoken";

const generarJWT = () => {
  return jwt.sign(
    {
      nombre: "Juan",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

export default generarJWT;
