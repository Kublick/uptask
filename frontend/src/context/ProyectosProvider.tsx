import { createContext, useState } from 'react';
import { Proyecto } from '../services/Proyecto';

type ProyectoContextProps = {
	proyectos: Proyecto;
	setProyectos: (proyectos: Proyecto) => void;
};

const ProyectosContext = createContext({} as ProyectoContextProps);

const ProyectosProvider = ({ children }: any) => {
	const [proyectos, setProyectos] = useState<Proyecto>({
		_id: '',
		nombre: '',
		descripcion: '',
		entrega: '',
		creado: '',
		colaboradores: '',
	});
	return (
		<ProyectosContext.Provider
			value={{
				proyectos,
				setProyectos,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };

export default ProyectosContext;
