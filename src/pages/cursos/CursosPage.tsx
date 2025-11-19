import React from 'react';
import CursosList from '../../components/cursos/CursosList';

// Datos mock que coinciden con la interfaz de CursosList
const cursos = [
	{
		id: 1,
		titulo: 'React desde cero',
		descripcion: 'Aprende React y desarrolla aplicaciones modernas.',
		imagen: '/images/cards/card-01.jpg',
		duracion: '8 horas',
		totalLecciones: 24,
		leccionesCompletadas: 12,
		progreso: 50,
		gradiente: {
			from: '#667eea',
			to: '#764ba2',
		},
	},
	{
		id: 2,
		titulo: 'Node.js avanzado',
		descripcion: 'Domina el backend con Node.js y Express.',
		imagen: '/images/cards/card-02.jpg',
		duracion: '10 horas',
		totalLecciones: 30,
		leccionesCompletadas: 5,
		progreso: 17,
		gradiente: {
			from: '#f093fb',
			to: '#f5576c',
		},
	},
	{
		id: 3,
		titulo: 'Diseño UX/UI',
		descripcion: 'Crea interfaces atractivas y funcionales.',
		imagen: '/images/cards/card-03.jpg',
		duracion: '6 horas',
		totalLecciones: 18,
		leccionesCompletadas: 18,
		progreso: 100,
		gradiente: {
			from: '#4facfe',
			to: '#00f2fe',
		},
	},
	{
		id: 4,
		titulo: 'Python para data science',
		descripcion: 'Analiza datos y crea modelos predictivos con Python.',
		imagen: '/images/cards/card-04.jpg',
		duracion: '12 horas',
		totalLecciones: 36,
		leccionesCompletadas: 0,
		progreso: 0,
		gradiente: {
			from: '#43e97b',
			to: '#38f9d7',
		},
	},
];

export default function CursosPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6 text-white">
				Todos los cursos digitales
			</h1>
			<CursosList cursos={cursos} />
		</div>
	);
}
