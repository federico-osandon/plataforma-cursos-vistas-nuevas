import { Link } from 'react-router';
import './QuickAccess.css';

export function QuickAccess() {
    const routes = [
        {
            title: '🏠 Dashboard',
            description: 'Vista principal del sistema',
            path: '/',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            title: '📚 Mis Cursos',
            description: 'Gestiona tus cursos como instructor',
            path: '/cursos',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
            title: '🌐 Cursos Públicos',
            description: 'Explora todos los cursos disponibles',
            path: '/cursos-publicos',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
        {
            title: '👥 Gestión de Inscripciones',
            description: 'Inscribe usuarios a cursos manualmente',
            path: '/admin/enrollments',
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        },
        {
            title: '🧪 Test Supabase',
            description: 'Prueba la integración con Supabase',
            path: '/test-supabase',
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            badge: 'NEW',
        },
        {
            title: '👤 Perfil de Usuario',
            description: 'Gestiona tu información personal',
            path: '/profile',
            color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        },
    ];

    return (
        <div className="quick-access-container">
            <div className="quick-access-header">
                <h1>⚡ Acceso Rápido</h1>
                <p>Navega fácilmente a todas las secciones de la plataforma</p>
            </div>

            <div className="routes-grid">
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        to={route.path}
                        className="route-card"
                        style={{ background: route.color }}
                    >
                        <div className="route-content">
                            <h2>{route.title}</h2>
                            <p>{route.description}</p>
                            {route.badge && <span className="route-badge">{route.badge}</span>}
                        </div>
                        <div className="route-arrow">→</div>
                    </Link>
                ))}
            </div>

            <div className="info-section">
                <h3>📖 Guías Disponibles</h3>
                <div className="guides-grid">
                    <div className="guide-card">
                        <h4>🔧 Configuración de Supabase</h4>
                        <p>Revisa el archivo <code>SUPABASE_SETUP.md</code> para instrucciones completas</p>
                    </div>
                    <div className="guide-card">
                        <h4>👥 Sistema de Inscripciones</h4>
                        <p>Consulta la guía de inscripciones por autorización en los artifacts</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
