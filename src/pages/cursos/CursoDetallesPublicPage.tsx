import { useState } from "react";


// COMPONENTES: se pueden mover a archivos separados si lo deseas

function CursoPortada({ curso }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden mb-8">
      <img src={curso.imagenPortada} alt={curso.titulo} className="w-full object-cover aspect-video" />
    </div>
  );
}

function InfoLateral({ curso }) {
  return (
    <aside className="w-full md:w-80 bg-dark-800 rounded-xl p-6 shadow-md flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-4">El curso incluye:</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li><span className="font-semibold">Duración:</span> {curso.duracion}</li>
          <li><span className="font-semibold">Lenguaje:</span> {curso.lenguaje}</li>
        </ul>
        <div className="flex gap-2 mt-4">
          <div className="bg-dark-700 rounded px-3 py-1 text-xs text-white">{curso.lecciones} clases</div>
          <div className="bg-dark-700 rounded px-3 py-1 text-xs text-white">{curso.nivel}</div>
        </div>
        <button className="w-full mt-6 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
          Empezar curso
        </button>
        <div className="text-xs text-gray-400 mt-2">Acceso al curso mientras dura la suscripción</div>
      </div>
      <Docente docente={curso.creador} />
    </aside>
  );
}

function Docente({ docente }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <img src={docente.avatar} alt={docente.nombre} className="w-12 h-12 rounded-full border-2 border-primary object-cover" />
      <div>
        <span className="text-primary font-semibold block">{docente.nombre}</span>
        <span className="text-gray-400 text-sm">{docente.rol}</span>
      </div>
    </div>
  );
}

function Stack({ stack }) {
  return (
    <div className="flex gap-2 mb-6">
      {stack.map((tech, i) => (
        <span key={i} className="bg-dark-700 rounded px-3 py-1 text-xs text-white flex items-center gap-1">
          <img src={tech.icono} alt={tech.nombre} className="w-5 h-5" /> {tech.nombre}
        </span>
      ))}
    </div>
  );
}

function Aprendizajes({ aprendizajes }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-white mb-2">Lo que aprenderás</h3>
      <div className="flex flex-wrap gap-2">
        {aprendizajes.map((item, i) => (
          <span key={i} className="bg-dark-700 rounded px-3 py-1 text-xs text-white">{item}</span>
        ))}
      </div>
    </div>
  );
}



function ContenidoCurso({ capitulos }) {
  const [capituloAbierto, setCapituloAbierto] = useState(-1);
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-white mb-2">Contenido del curso</h3>
      <div className="flex flex-col gap-4">
        {capitulos.map((cap, capIdx) => (
          <div key={capIdx} className="border border-dark-600 rounded-lg bg-dark-700 overflow-hidden transition-all duration-300">
            <button
              type="button"
              className="w-full text-left px-4 py-3 font-bold text-white flex justify-between items-center bg-dark-700 hover:bg-dark-600 transition-colors focus:outline-none"
              onClick={() => setCapituloAbierto(capituloAbierto === capIdx ? -1 : capIdx)}
            >
              <span className="text-base font-bold text-white">Capítulo {capIdx + 1} {cap.titulo}</span>
              <span className={`text-xs text-gray-400 transform transition-transform duration-300 ${capituloAbierto === capIdx ? "rotate-180" : "rotate-0"}`}>▼</span>
            </button>
            <div className={`transition-all duration-300 ${capituloAbierto === capIdx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                 style={{overflow: capituloAbierto === capIdx ? "visible" : "hidden"}}>
              {capituloAbierto === capIdx && (
                <ul className="flex flex-col gap-2 px-4 pb-4">
                  {cap.lecciones.map((lec, lecIdx) => (
                    <li
                      key={lecIdx}
                      className="flex justify-between items-center text-gray-300 border-b border-dark-500 py-2"
                    >
                      <span className="text-sm font-medium">{lec.nombre}</span>
                      <span className="text-xs text-gray-500">{lec.duracion ? lec.duracion : "-"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// DATOS DE EJEMPLO (puedes reemplazar por fetch o props)
const curso = {
  id: 1,
  titulo: "Animaciones en CSS",
  descripcion: "Domina las animaciones CSS desde cero y sorpréndete con efectos que no requieren JavaScript.",
  imagenPortada: "/images/cards/card-01.jpg",
  duracion: "1h 28m",
  lenguaje: "Español",
  lecciones: 29,
  nivel: "Intermedio",
  aprendizajes: [
    "Introducción a las animaciones CSS",
    "Tipos de animación",
    "Transiciones básicas",
    "Estados y propiedades",
    "Control de tiempos y efectos",
    "Keyframes y animaciones complejas",
    "Optimización y rendimiento",
    "Animaciones con scroll",
  ],
  stack: [
    { nombre: "CSS", icono: "/images/icons/css.svg" },
    { nombre: "HTML", icono: "/images/icons/html.svg" },
  ],
  creador: {
    nombre: "Miguel Ángel Durán García",
    rol: "Creador de Contenido",
    avatar: "/images/brand/brand-01.svg",
    // redes: ...
  },
  capitulos: [
    {
      titulo: "Introducción",
      lecciones: [
        { nombre: "Introducción a las Animaciones en CSS", duracion: "1m 45s", video: "https://www.youtube.com/embed/XadZQZkcJ3Q" },
        { nombre: "Tipos de Animación en CSS", duracion: "14s", video: "https://www.youtube.com/embed/x_o5SR_24gM" },
        { nombre: "¡Practica lo que aprendimos!", video: "https://www.youtube.com/embed/XadZQZkcJ3Q" },
      ],
    },
    {
      titulo: "Transiciones Básicas",
      lecciones: [
        { nombre: "Transiciones Básicas", video: "https://www.youtube.com/embed/x_o5SR_24gM" },
      ],
    },
    {
      titulo: "Control de Transiciones",
      lecciones: [
        { nombre: "Control de Transiciones", video: "https://www.youtube.com/embed/XadZQZkcJ3Q" },
      ],
    },
    {
      titulo: "Animaciones con Keyframes",
      lecciones: [
        { nombre: "Animaciones con Keyframes", video: "https://www.youtube.com/embed/x_o5SR_24gM" },
      ],
    },
    {
      titulo: "Animaciones Avanzadas",
      lecciones: [
        { nombre: "Animaciones Avanzadas", video: "https://www.youtube.com/embed/XadZQZkcJ3Q" },
      ],
    },
  ],
};

export default function CursoDetallesPublicPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
      <div className="flex-1">
        <CursoPortada curso={curso} />
        <h1 className="text-3xl font-bold text-white mb-2">{curso.titulo}</h1>
        <p className="text-gray-400 mb-6 text-lg">{curso.descripcion}</p>
        <Stack stack={curso.stack} />
        <Aprendizajes aprendizajes={curso.aprendizajes} />
        <ContenidoCurso capitulos={curso.capitulos} />
      </div>
      <InfoLateral curso={curso} />
    </div>
  );
}
