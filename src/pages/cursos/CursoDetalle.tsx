import { useState } from "react";
import { useParams } from "react-router";

const YOUTUBE_URL_1 = "https://www.youtube.com/embed/XadZQZkcJ3Q";
const YOUTUBE_URL_2 = "https://www.youtube.com/embed/x_o5SR_24gM";

const curso = {
	id: 1,
	titulo: "Presentación del curso",
	descripcion: "Aprende a crear animaciones modernas usando CSS.",
	creador: {
		nombre: "Braulio Díez",
		rol: "Technical Lead at Lemoncode & basefactor",
		avatar: "/images/brand/brand-01.svg",
	},
	capitulos: [
		{
			titulo: "Capítulo 1",
			subtitulo: "Introducción",
			lecciones: [
				{ nombre: "Presentación del curso", duracion: "29s", video: YOUTUBE_URL_1 },
				{ nombre: "Conceptos de SSG y Astro", duracion: "8m 6s", video: YOUTUBE_URL_2 },
				{ nombre: "¡Practica lo que aprendimos sobre introducción a Astro y SSG!", video: YOUTUBE_URL_1 },
			],
		},
		{
			titulo: "Capítulo 2",
			subtitulo: "Fundamentos de Astro",
			lecciones: [
				{ nombre: "Instalación y configuración", duracion: "5m 20s", video: YOUTUBE_URL_2 },
				{ nombre: "Estructura de proyecto", duracion: "7m 15s", video: YOUTUBE_URL_1 },
			],
		},
		{
			titulo: "Proyecto",
			subtitulo: "Astro + Headless CMS",
			lecciones: [
				{ nombre: "Configuración del CMS", duracion: "12m 30s", video: YOUTUBE_URL_2 },
				{ nombre: "Integración con Astro", duracion: "15m 45s", video: YOUTUBE_URL_1 },
			],
		},
	],
};

export default function CursoDetalle() {
	const { id } = useParams();
	const [capituloAbierto, setCapituloAbierto] = useState(0);
	const [videoActual, setVideoActual] = useState({ cap: 0, lec: 0 });
	const [autoplay, setAutoplay] = useState(false);

	const handleToggleCapitulo = (idx: number) => {
		setCapituloAbierto((prev) => (prev === idx ? -1 : idx));
	};

	const handleSelectVideo = (capIdx: number, lecIdx: number) => {
		setVideoActual({ cap: capIdx, lec: lecIdx });
	};

	const videoSrc = curso.capitulos[videoActual.cap]?.lecciones[videoActual.lec]?.video || YOUTUBE_URL_1;
	const leccionActual = curso.capitulos[videoActual.cap]?.lecciones[videoActual.lec];

	return (
		<div className="flex h-screen bg-gray-950">
			{/* Video Player Section - Left Side */}
			<div className="flex-1 flex flex-col p-6">
				{/* Video Container */}
				<div className="w-full rounded-xl mb-6 bg-black flex items-center justify-center aspect-video overflow-hidden">
					<iframe
						src={videoSrc}
						title="Video del curso"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full"
					/>
				</div>

				{/* Video Title and Instructor Info */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-white mb-4">
						{leccionActual?.nombre || curso.titulo}
					</h1>
					<div className="flex items-center gap-3">
						<img
							src={curso.creador.avatar}
							alt={curso.creador.nombre}
							className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover"
						/>
						<div>
							<span className="text-cyan-400 font-semibold block">
								{curso.creador.nombre}
							</span>
							<span className="text-gray-400 text-sm">
								{curso.creador.rol}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content Sidebar - Right Side */}
			<aside className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col">
				{/* Header with Autoplay Toggle */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
					<h2 className="text-xl font-bold text-white">Contenido</h2>
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-400">Autoplay</span>
						<button
							onClick={() => setAutoplay(!autoplay)}
							className={`relative w-12 h-6 rounded-full transition-colors ${autoplay ? "bg-cyan-500" : "bg-gray-700"
								}`}
						>
							<div
								className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoplay ? "translate-x-6" : "translate-x-0"
									}`}
							/>
						</button>
					</div>
				</div>

				{/* Chapters List - Scrollable */}
				<div className="flex-1 overflow-y-auto px-6 py-4">
					<div className="flex flex-col gap-3">
						{curso.capitulos.map((cap, capIdx) => (
							<div key={capIdx} className="rounded-lg bg-gray-800/50 overflow-hidden">
								<button
									className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-800 transition-colors"
									onClick={() => handleToggleCapitulo(capIdx)}
								>
									<div>
										<div className="text-xs text-cyan-400 font-semibold mb-1">
											{cap.titulo}
										</div>
										<div className="text-sm text-white font-medium">
											{cap.subtitulo}
										</div>
									</div>
									<svg
										className={`w-5 h-5 text-gray-400 transform transition-transform ${capituloAbierto === capIdx ? "rotate-180" : "rotate-0"
											}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>

								{/* Lessons List */}
								<div
									className={`transition-all duration-300 ${capituloAbierto === capIdx ? "max-h-96" : "max-h-0"
										} overflow-hidden`}
								>
									{capituloAbierto === capIdx && (
										<ul className="pb-2">
											{cap.lecciones.map((lec, lecIdx) => (
												<li
													key={lecIdx}
													className={`px-4 py-3 cursor-pointer hover:bg-gray-800 transition-colors border-l-2 ${videoActual.cap === capIdx && videoActual.lec === lecIdx
															? "border-cyan-400 bg-gray-800/70"
															: "border-transparent"
														}`}
													onClick={() => handleSelectVideo(capIdx, lecIdx)}
												>
													<div className="flex justify-between items-start gap-2">
														<span className={`text-sm ${videoActual.cap === capIdx && videoActual.lec === lecIdx
																? "text-cyan-400 font-medium"
																: "text-gray-300"
															}`}>
															{lec.nombre}
														</span>
														{lec.duracion && (
															<span className="text-xs text-gray-500 flex-shrink-0">
																{lec.duracion}
															</span>
														)}
													</div>
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Certificate Section - Bottom */}
				<div className="px-6 py-4 border-t border-gray-800 bg-gray-900/50">
					<div className="flex items-start gap-3 mb-3">
						<svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<p className="text-sm text-cyan-400 font-semibold mb-1">
								Completa el curso y consigue tu certificado
							</p>
							<p className="text-xs text-gray-400 mb-3">
								Activar Windows
							</p>
							<p className="text-xs text-gray-500">
								Ve a Configuración para activar Windows.
							</p>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}
