import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ProyectoValidation = z.object({
	nombre: z.string(),
	descripcion: z.string(),
	cliente: z.string(),
	entrega: z.string(),
});

type ProyectoValidationProps = z.infer<typeof ProyectoValidation>;

const FormularioProyecto = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProyectoValidationProps>({
		defaultValues: {
			nombre: '',
			descripcion: '',
			cliente: '',
			entrega: '',
		},

		resolver: zodResolver(ProyectoValidation),
	});

	const onSubmit = (formdata: ProyectoValidationProps) => {
		console.log(formdata);
	};
	console.log(errors);
	return (
		<div>
			<form
				className="rounded-lg bg-white py-10 px-5 shadow"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-5">
					<label
						className="text-sm font-bold uppercase text-gray-700"
						htmlFor="nombre"
					>
						Nombre Proyecto
					</label>
					<input
						type="text"
						id="nombre"
						className="rouded-md mt-2 w-full border px-2 placeholder-gray-400"
						placeholder="Nombre del proyecto"
						{...register('nombre')}
					/>
				</div>
				<div className="mb-5">
					<label
						className="text-sm font-bold uppercase text-gray-700"
						htmlFor="descripcion"
					>
						Descripcion
					</label>
					<textarea
						id="descripcion"
						className="rouded-md mt-2 w-full border px-2 placeholder-gray-400"
						placeholder="Descripcion del proyecto"
						{...register('descripcion')}
					/>
				</div>
				<div className="mb-5">
					<label
						className="text-sm font-bold uppercase text-gray-700"
						htmlFor="entrega"
					>
						Fecha Entrega
					</label>
					<input
						type="date"
						id="entrega"
						className="rouded-md mt-2 w-full border px-2 placeholder-gray-400"
						{...register('nombre')}
					/>
				</div>
				<div className="mb-5">
					<label
						className="text-sm font-bold uppercase text-gray-700"
						htmlFor="cliente"
					>
						Nombre del Cliente
					</label>
					<input
						type="text"
						id="cliente"
						className="rouded-md mt-2 w-full border px-2 placeholder-gray-400"
						placeholder="Nombre del proyecto"
						{...register('cliente')}
					/>
				</div>

				<input
					type="submit"
					value="Crear Proyecto"
					className="w-full cursor-pointer rounded bg-sky-600 p-3 font-bold uppercase text-white transition-colors hover:bg-sky-400"
				/>
			</form>
		</div>
	);
};

export default FormularioProyecto;
