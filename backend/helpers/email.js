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

export const emailOlvidePassword = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // const transport = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "4a18885f722562",
  //     pass: "42685c3fbecd6b",
  //   },
  // });

  // Informacion del email

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask confirma tu cuenta",
    html: `<p>Hola ${nombre}, has solicitado restablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un nuevo password</p>
      <a href="http://localhost:3000/nuevo-password/${token}">Restablecer Password</a>
      <p>Si no solicitaste este cambio ignora este mensaje</p>
      `,
  });

  console.log(info);
};
