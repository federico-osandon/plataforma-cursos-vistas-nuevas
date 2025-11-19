import { Link } from 'react-router';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  duracion: string;
  totalLecciones: number;
  leccionesCompletadas: number;
  progreso: number;
  gradiente: {
    from: string;
    to: string;
  };
}

interface CursosListProps {
  cursos: Curso[];
}
let user = false;

export default function CursosList({ cursos }: CursosListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <Link
          key={curso.id}
          to={user ? `/cursos/${curso.id}` : `/cursos-publicos/${curso.id}`}
          className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer group relative"
          style={{
            background: `linear-gradient(135deg, ${curso.gradiente.from} 0%, ${curso.gradiente.to} 100%)`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Imagen del curso - ancho completo */}
          <div className="w-full">
            <img
              src={curso.imagen}
              alt={curso.titulo}
              className="w-full h-40 object-cover"
            />
          </div>

          {/* Contenido de la card */}
          <div className="px-6 pb-6 pt-4 flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-white leading-tight">
              {curso.titulo}
            </h2>

            {/* Metadata - tiempo a la izquierda, lecciones a la derecha */}
            <div className="flex justify-between items-center mb-4 text-xs text-white/80">
              <span>{curso.duracion}</span>
              <span>{curso.leccionesCompletadas}/{curso.totalLecciones} lecciones</span>
            </div>

            {/* Barra de progreso */}
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/90 font-medium">{curso.progreso}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-300"
                  style={{ width: `${curso.progreso}%` }}
                />
              </div>
            </div>
          </div>

          {/* Hover overlay sutil */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl pointer-events-none" />
        </Link>
      ))}
    </div>
  );
}
