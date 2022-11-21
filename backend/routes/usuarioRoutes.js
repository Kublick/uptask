import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Desde API Usuarios');
});

router.post('/', (req, res) => {
	res.send('Desde Post Usuarios');
});

router.delete('/', (req, res) => {
	res.send('Desde Delete Usuarios');
});

router.put('/', (req, res) => {
	res.send('Desde Put Usuarios');
});

export default router;
