import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4a18885f722562",
      pass: "42685c3fbecd6b",
    },
  });

  // Informacion del email

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask confirma tu cuenta",
    html: `<p>Hola ${nombre}, confirma tu cuenta en UpTask</p>} </p>
    <p>Tu cuenta esta casi lista solo debes comprobarla en el siguiente enlace</p>,
    <a href="http://localhost:3000/confirmar-cuenta/${token}">Comprobar Cuenta</a>
    <p>Si no creaste tu cuenta ignora este mensaje</p>
    `,
  });

  console.log(info);
};
