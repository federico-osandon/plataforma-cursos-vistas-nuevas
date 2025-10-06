import React from 'react';
import { Link } from 'react-router';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

interface CursosListProps {
  cursos: Curso[];
}
let user = false; 

export default function CursosList({ cursos }: CursosListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cursos.map((curso) => (
        <Link
          key={curso.id}
          to={user ? `/cursos/${curso.id}` : `/cursos-publicos/${curso.id}`}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer group"
        >
          <img
            src={curso.imagen}
            alt={curso.titulo}
            className="h-40 w-full object-cover"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary">
              {curso.titulo}
            </h2>
            <p className="text-gray-400 mb-4 group-hover:text-primary">
              {curso.descripcion}
            </p>
            <span className="mt-auto bg-primary text-white px-4 py-2 rounded group-hover:bg-primary-dark transition-colors text-center">
              Ver curso
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
