import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Sidebar() {
	const { auth } = useAuth();
	return (
		<aside className="px-5 py-10 md:w-80 lg:w-96">
			<p className="text-xl font-bold">Hola: {auth.nombre}</p>
			<Link
				to="crear-proyecto"
				className="mt-5 block w-full rounded-lg bg-sky-600 p-3 text-center font-bold uppercase text-white"
			>
				Nuevo Proyecto
			</Link>
		</aside>
	);
}

export default Sidebar;
