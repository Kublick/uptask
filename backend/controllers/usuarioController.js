import Usuario from '../models/Usuario.js';

const registrar = async (req, res) => {
	const { email } = req.body;

	const existeUsuario = await Usuario.findOne({ email });

	if (existeUsuario) {
		const error = new Error('Usuario ya registrado');
		return res.status(400).json({ message: error });
	}
	try {
		const usuario = new Usuario(req.body);
		const usuarioAlmacenado = await usuario.save();
		res.json(usuarioAlmacenado);
	} catch (error) {
		console.log(error);
	}
};

export { registrar };