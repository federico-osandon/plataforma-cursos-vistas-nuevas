import { Link } from "react-router";

// DATOS DE EJEMPLO (puedes reemplazar por fetch o props)
const curso = {
  id: 1,
  titulo: "Curso de Astro y Headless CMS",
  subtitulo: "Astro Headless",
  descripcion: "Desarrollador FullStack/TypeScript con experiencia en .NET. Le apasiona el desarrollo Open Source y formar a desarrolladores.",
  imagenPortada: "/images/cards/card-01.jpg",
  duracion: "2h 59m",
  lenguaje: "Español",
  lecciones: 23,
  nivel: "Intermedio",
  creador: {
    nombre: "Braulio Díez",
    rol: "Technical Lead en Lemoncode & basefactor",
    avatar: "/images/brand/brand-01.svg",
    descripcion: "Desarrollador FullStack/TypeScript con experiencia en .NET. Le apasiona el desarrollo Open Source y formar a desarrolladores.",
  },
};

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6 px-8 pt-6">
      <Link to="/" className="text-gray-400 hover:text-white transition-colors">
        Inicio
      </Link>
      <span className="text-gray-500">/</span>
      <span className="text-cyan-400">{curso.titulo}</span>
    </nav>
  );
}

function HeroSection() {
  return (
    <div className="relative w-full min-h-[500px] overflow-hidden rounded-2xl">
      {/* Imagen de fondo con overlay de degradado */}
      <div className="absolute inset-0">
        <img
          src={curso.imagenPortada}
          alt={curso.titulo}
          className="w-full h-full object-cover"
        />
        {/* Degradado púrpura superpuesto */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 11, 46, 0.95) 0%, rgba(74, 25, 66, 0.85) 50%, rgba(88, 28, 135, 0.75) 100%)'
          }}
        />
      </div>

      {/* Contenido sobre la imagen */}
      <div className="relative h-full min-h-[500px] flex items-center justify-center px-8 py-12">
        <div className="text-center max-w-4xl">
          {/* Título grande del curso */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight"
            style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, #e0d0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
            }}
          >
            {curso.subtitulo}
          </h1>

          {/* Información del instructor */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src={curso.creador.avatar}
              alt={curso.creador.nombre}
              className="w-16 h-16 rounded-full border-2 border-white/30 object-cover"
            />
            <div className="text-left">
              <p className="text-white/90 text-sm">Un curso de</p>
              <p className="text-white font-semibold text-lg">{curso.creador.nombre}</p>
            </div>
          </div>

          {/* Botón Empezar curso */}
          <button
            className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
              boxShadow: '0 4px 20px rgba(0, 217, 255, 0.4)'
            }}
          >
            ▶ Empezar curso
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoLateral() {
  return (
    <aside className="w-full md:w-96 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-800">
      {/* El curso incluye */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-6">El curso incluye:</h2>

        {/* Duración */}
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="text-gray-400 text-sm">Duración:</span>
            <p className="text-white font-medium">{curso.duracion}</p>
          </div>
        </div>

        {/* Lenguaje */}
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <div>
            <span className="text-gray-400 text-sm">Lenguaje:</span>
            <p className="text-white font-medium">{curso.lenguaje}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-3 mb-6">
          <div className="bg-gray-800 rounded-lg px-4 py-2 text-sm text-white border border-gray-700">
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Lecciones
            <span className="ml-2 font-bold">{curso.lecciones} clases</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-4 py-2 text-sm text-white border border-gray-700">
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Nivel
            <span className="ml-2 font-bold">{curso.nivel}</span>
          </div>
        </div>

        {/* Botón Empezar curso */}
        <button
          className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 mb-3"
          style={{
            background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
            boxShadow: '0 4px 15px rgba(0, 217, 255, 0.3)'
          }}
        >
          ▶ Empezar curso
        </button>

        <p className="text-xs text-gray-500 text-center">
          Acceso al curso mientras dura la suscripción
        </p>
      </div>

      {/* Docente */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-bold text-white mb-4">Docente</h3>
        <div className="flex items-start gap-4 mb-4">
          <img
            src={curso.creador.avatar}
            alt={curso.creador.nombre}
            className="w-14 h-14 rounded-full border-2 border-cyan-400/50 object-cover"
          />
          <div>
            <p className="text-cyan-400 font-semibold text-base">{curso.creador.nombre}</p>
            <p className="text-gray-400 text-sm">{curso.creador.rol}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {curso.creador.descripcion}
        </p>
      </div>
    </aside>
  );
}

function ContenidoPrincipal() {
  return (
    <div className="flex-1 px-8 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">{curso.titulo}</h2>

      {/* Aquí puedes agregar más contenido como descripción detallada, 
          contenido del curso, etc. */}
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          {curso.descripcion}
        </p>
      </div>
    </div>
  );
}

export default function CursoDetallesPublicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <Breadcrumb />

      {/* Hero + Sidebar en la misma fila */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Hero Section - ocupa más espacio */}
          <div className="flex-1">
            <HeroSection />
          </div>

          {/* Sidebar - al lado del hero */}
          <div className="lg:w-96 flex-shrink-0">
            <InfoLateral />
          </div>
        </div>
      </div>

      {/* Contenido principal debajo */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <ContenidoPrincipal />
      </div>
    </div>
  );
}
