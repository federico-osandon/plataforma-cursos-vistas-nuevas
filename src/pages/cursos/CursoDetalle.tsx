import { useState } from "react";
import { useParams } from "react-router";

const YOUTUBE_URL_1 = "https://www.youtube.com/embed/XadZQZkcJ3Q";
const YOUTUBE_URL_2 = "https://www.youtube.com/embed/x_o5SR_24gM";

const curso = {
	id: 1,
	titulo: "Introducción a las Animaciones en CSS",
	descripcion: "Aprende a crear animaciones modernas usando CSS.",
	creador: {
		nombre: "Miguel Ángel Durán García",
		rol: "Creador de Contenido",
		avatar: "/images/brand/brand-01.svg",
	},
	capitulos: [
		{
			titulo: "Capítulo 1: Introducción",
			lecciones: [
				{ nombre: "Introducción a las Animaciones en CSS", duracion: "1m 45s", video: YOUTUBE_URL_1 },
				{ nombre: "Tipos de Animación en CSS", duracion: "14s", video: YOUTUBE_URL_2 },
				{ nombre: "¡Practica lo que aprendimos!", video: YOUTUBE_URL_1 },
			],
		},
		{
			titulo: "Capítulo 2: Transiciones Básicas",
			lecciones: [
				{ nombre: "Transiciones Básicas", video: YOUTUBE_URL_2 },
			],
		},
		{
			titulo: "Capítulo 3: Control de Transiciones",
			lecciones: [
				{ nombre: "Control de Transiciones", video: YOUTUBE_URL_1 },
			],
		},
		{
			titulo: "Capítulo 4: Animaciones con Keyframes",
			lecciones: [
				{ nombre: "Animaciones con Keyframes", video: YOUTUBE_URL_2 },
			],
		},
		{
			titulo: "Capítulo 5: Animaciones Avanzadas",
			lecciones: [
				{ nombre: "Animaciones Avanzadas", video: YOUTUBE_URL_1 },
			],
		},
	],
};

export default function CursoDetalle() {
	const { id } = useParams();
	const [capituloAbierto, setCapituloAbierto] = useState(0);
	const [videoActual, setVideoActual] = useState({ cap: 0, lec: 0 });

	const handleToggleCapitulo = (idx: number) => {
		setCapituloAbierto((prev) => (prev === idx ? -1 : idx));
	};

	const handleSelectVideo = (capIdx: number, lecIdx: number) => {
		setVideoActual({ cap: capIdx, lec: lecIdx });
	};

	const videoSrc = curso.capitulos[videoActual.cap]?.lecciones[videoActual.lec]?.video || YOUTUBE_URL_1;

	return (
		<div className="flex flex-col md:flex-row gap-8 p-6">
			<div className="flex-1">
				<div className="w-full rounded-xl mb-6 bg-black flex items-center justify-center aspect-video">
					<iframe
						src={videoSrc}
						title="Video del curso"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="rounded-xl w-full h-full"
						style={{ aspectRatio: "16/9" }}
					></iframe>
				</div>
				<h1 className="text-3xl font-bold text-white mb-2">
					{curso.titulo}
				</h1>
				<div className="flex items-center gap-3 mb-6">
					<img
						src={curso.creador.avatar}
						alt={curso.creador.nombre}
						className="w-12 h-12 rounded-full border-2 border-primary object-cover"
					/>
					<div>
						<span className="text-primary font-semibold block">
							{curso.creador.nombre}
						</span>
						<span className="text-gray-400 text-sm">
							{curso.creador.rol}
						</span>
					</div>
				</div>
				<p className="text-gray-400 mb-6 text-lg">{curso.descripcion}</p>
				
				{/* Sección para crear tarea (profesores) */}
				<div className="mb-8">
					<label htmlFor="crear-tarea-titulo" className="block text-white font-semibold mb-2">Crear tarea (Profesores)</label>
					<input
						type="text"
						id="crear-tarea-titulo"
						placeholder="Título de la tarea"
						className="block w-full px-4 py-2 rounded-lg bg-dark-700 text-white border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
					/>
					<textarea
						id="crear-tarea-descripcion"
						placeholder="Descripción de la tarea"
						className="block w-full px-4 py-2 rounded-lg bg-dark-700 text-white border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
						rows={3}
					/>
					<input
						type="file"
						id="archivo-tarea-profesor"
						accept=".doc,.docx,.pdf"
						className="block w-full px-4 py-2 rounded-lg bg-dark-700 text-white border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
					/>
					<button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
						Guardar tarea
					</button>
				</div>

				{/* Sección para entregar tarea (estudiantes) */}
				<div className="mb-8">
					<label htmlFor="tarea" className="block text-white font-semibold mb-2">Entregar tarea (Estudiantes)</label>
					<input
						type="file"
						id="tarea"
						className="block w-full px-4 py-2 rounded-lg bg-dark-700 text-white border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>
			<aside className="w-full md:w-80 bg-dark-800 rounded-xl p-6 shadow-md">
				<h2 className="text-lg font-bold text-white mb-4">Contenido</h2>
				<div className="flex flex-col gap-4">
					{curso.capitulos.map((cap, capIdx) => (
						<div key={capIdx} className="border border-dark-600 rounded-lg bg-dark-700 overflow-hidden transition-all duration-300">
							<button
								className={`w-full text-left px-4 py-3 font-bold text-white focus:outline-none flex justify-between items-center bg-dark-700 hover:bg-dark-600 transition-colors`}
								onClick={() => handleToggleCapitulo(capIdx)}
							>
								<span className="text-base font-bold text-white">{cap.titulo}</span>
								<span
									className={`text-xs text-gray-400 transform transition-transform duration-300 ${capituloAbierto === capIdx ? "rotate-180" : "rotate-0"}`}
								>
									▼
								</span>
							</button>
							<div
								className={`transition-all duration-300 ${capituloAbierto === capIdx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
							>
								{capituloAbierto === capIdx && (
									<ul className="flex flex-col gap-2 px-4 pb-4">
										{cap.lecciones.map((lec, lecIdx) => (
											<li
												key={lecIdx}
												className={`flex justify-between items-center text-gray-300 cursor-pointer hover:text-primary transition-colors border-b border-dark-500 py-2 ${videoActual.cap === capIdx && videoActual.lec === lecIdx ? "font-bold text-primary" : ""}`}
												onClick={() => handleSelectVideo(capIdx, lecIdx)}
											>
												<span className="text-sm font-medium">{lec.nombre}</span>
												{lec.duracion && (
													<span className="text-xs text-gray-500">{lec.duracion}</span>
												)}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					))}
				</div>
			</aside>
		</div>
	);
}
