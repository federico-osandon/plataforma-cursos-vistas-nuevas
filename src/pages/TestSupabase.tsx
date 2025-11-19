import { useAuth } from '../hooks/useAuth';
import { useCourses } from '../hooks/useCourses';
import { AuthForm } from '../components/AuthForm';
import './TestSupabase.css';

export function TestSupabase() {
    const { user, loading: authLoading, signOut } = useAuth();
    const { courses, loading: coursesLoading, error } = useCourses();

    if (authLoading) {
        return (
            <div className="test-container">
                <div className="loading">Cargando autenticación...</div>
            </div>
        );
    }

    if (!user) {
        return <AuthForm />;
    }

    return (
        <div className="test-container">
            <div className="test-header">
                <h1>🎉 ¡Supabase está funcionando!</h1>
                <div className="user-info">
                    <p>Usuario: <strong>{user.email}</strong></p>
                    <button onClick={() => signOut()} className="logout-btn">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="courses-section">
                <h2>📚 Cursos desde Supabase</h2>

                {coursesLoading && <div className="loading">Cargando cursos...</div>}

                {error && (
                    <div className="error">
                        Error al cargar cursos: {error.message}
                    </div>
                )}

                {!coursesLoading && !error && courses.length === 0 && (
                    <div className="empty">
                        <p>No hay cursos publicados aún.</p>
                        <p>Ve al SQL Editor de Supabase y ejecuta el script de datos de prueba.</p>
                    </div>
                )}

                {!coursesLoading && courses.length > 0 && (
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="course-card"
                                style={{ background: course.gradient || '#1a1f3a' }}
                            >
                                <div className="course-content">
                                    <h3>{course.title}</h3>
                                    <p className="description">{course.description}</p>

                                    <div className="course-meta">
                                        <span className="meta-item">⏱️ {course.duration}</span>
                                        <span className="meta-item">📖 {course.total_lessons} lecciones</span>
                                        <span className="meta-item">📊 {course.level}</span>
                                    </div>

                                    <div className="course-footer">
                                        <span className="price">${course.price}</span>
                                        <span className="category">{course.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="success-message">
                <h3>✅ Todo está configurado correctamente:</h3>
                <ul>
                    <li>✅ Autenticación funcionando</li>
                    <li>✅ Conexión a Supabase establecida</li>
                    <li>✅ Base de datos respondiendo</li>
                    <li>✅ Cursos cargados: {courses.length}</li>
                </ul>
            </div>
        </div>
    );
}
