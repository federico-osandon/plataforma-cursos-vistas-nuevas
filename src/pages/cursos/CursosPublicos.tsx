import CursosList from "../../components/cursos/CursosList";

const cursos = [
  {
    id: 1,
    titulo: "Curso de Astro y Headless CMS",
    descripcion: "Aprende Astro y desarrolla sitios web modernos con CMS headless.",
    imagen: "/images/cards/card-01.jpg",
    duracion: "hace 1 semana",
    totalLecciones: 23,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#8b5cf6",
      to: "#6366f1"
    }
  },
  {
    id: 2,
    titulo: "Curso de Entrevistas Laborales en Inglés",
    descripcion: "Domina las entrevistas técnicas en inglés.",
    imagen: "/images/cards/card-02.jpg",
    duracion: "hace 1 mes",
    totalLecciones: 18,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#dc2626",
      to: "#b91c1c"
    }
  },
  {
    id: 3,
    titulo: "Utility Types en TypeScript",
    descripcion: "Aprende los tipos de utilidad de TypeScript.",
    imagen: "/images/cards/card-03.jpg",
    duracion: "hace 2 meses",
    totalLecciones: 18,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#3b82f6",
      to: "#2563eb"
    }
  },
  {
    id: 4,
    titulo: "Animaciones en CSS",
    descripcion: "Crea animaciones fluidas y atractivas con CSS.",
    imagen: "/images/cards/card-04.jpg",
    duracion: "hace 3 meses",
    totalLecciones: 29,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#0ea5e9",
      to: "#0284c7"
    }
  },
  {
    id: 5,
    titulo: "Curso de CSS Grid",
    descripcion: "Domina CSS Grid para layouts modernos.",
    imagen: "/images/cards/card-01.jpg",
    duracion: "hace 3 meses",
    totalLecciones: 27,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#6366f1",
      to: "#4f46e5"
    }
  },
  {
    id: 6,
    titulo: "CSS desde Cero",
    descripcion: "Aprende CSS desde los fundamentos.",
    imagen: "/images/cards/card-02.jpg",
    duracion: "hace 4 meses",
    totalLecciones: 80,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#3b82f6",
      to: "#1d4ed8"
    }
  },
  {
    id: 7,
    titulo: "HTML desde Cero",
    descripcion: "Fundamentos de HTML para desarrollo web.",
    imagen: "/images/cards/card-03.jpg",
    duracion: "hace 4 meses",
    totalLecciones: 44,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#ea580c",
      to: "#c2410c"
    }
  },
  {
    id: 8,
    titulo: "GSAP desde Cero",
    descripcion: "Animaciones avanzadas con GSAP.",
    imagen: "/images/cards/card-04.jpg",
    duracion: "hace 4 meses",
    totalLecciones: 23,
    leccionesCompletadas: 0,
    progreso: 0,
    gradiente: {
      from: "#10b981",
      to: "#059669"
    }
  },
];

export default function CursosPublicos() {
  return (
    <div
      className="min-h-screen p-8"
      style={{
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: '#0a0e27'
      }}
    >
      <h1 className="text-4xl font-normal mb-2 text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        Todos los cursos de la <span style={{ color: '#3b82f6' }}>Academia</span>
      </h1>
      <p className="text-gray-400 mb-8 text-sm">¡Próximamente tendremos más!</p>
      <CursosList cursos={cursos} />
    </div>
  );
}
