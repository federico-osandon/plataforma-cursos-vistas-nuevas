import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCourses } from '../../hooks/useCourses';
import { useCourseEnrollments } from '../../hooks/useEnrollments';
import { EnrollUserModal } from '../../components/admin/EnrollUserModal';
import { unenrollUserFromCourse } from '../../hooks/useEnrollments';
import './ManageEnrollments.css';

export function ManageEnrollments() {
    const { user } = useAuth();
    const { courses, loading: coursesLoading } = useCourses(false); // Todos los cursos
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const { enrollments, loading: enrollmentsLoading, refetch } = useCourseEnrollments(selectedCourseId);

    const selectedCourse = courses.find((c) => c.id === selectedCourseId);

    const handleUnenroll = async (userId: string, userName: string) => {
        if (!confirm(`¿Seguro que quieres desinscribir a ${userName}?`)) return;

        const { error } = await unenrollUserFromCourse(userId, selectedCourseId);

        if (error) {
            alert('Error al desinscribir: ' + error.message);
        } else {
            alert('Usuario desinscrito exitosamente');
            refetch();
        }
    };

    if (!user) {
        return (
            <div className="manage-container">
                <p>Debes iniciar sesión para acceder a esta página.</p>
            </div>
        );
    }

    return (
        <div className="manage-container">
            <div className="manage-header">
                <h1>📋 Gestión de Inscripciones</h1>
                <p>Inscribe o desinscribe usuarios de los cursos manualmente</p>
            </div>

            <div className="course-selector">
                <label>Seleccionar curso:</label>
                <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    disabled={coursesLoading}
                >
                    <option value="">-- Selecciona un curso --</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title} ({course.is_published ? 'Publicado' : 'Borrador'})
                        </option>
                    ))}
                </select>
            </div>

            {selectedCourse && (
                <div className="course-info">
                    <div className="course-details">
                        <h2>{selectedCourse.title}</h2>
                        <p>{selectedCourse.description}</p>
                        <div className="course-stats">
                            <span>⏱️ {selectedCourse.duration}</span>
                            <span>📖 {selectedCourse.total_lessons} lecciones</span>
                            <span>📊 {selectedCourse.level}</span>
                        </div>
                    </div>

                    <button
                        className="btn-add-enrollment"
                        onClick={() => setShowEnrollModal(true)}
                    >
                        + Inscribir Usuario
                    </button>
                </div>
            )}

            {selectedCourseId && (
                <div className="enrollments-section">
                    <h3>Estudiantes Inscritos ({enrollments.length})</h3>

                    {enrollmentsLoading && <p className="loading">Cargando inscripciones...</p>}

                    {!enrollmentsLoading && enrollments.length === 0 && (
                        <div className="empty-state">
                            <p>No hay estudiantes inscritos en este curso aún.</p>
                            <p>Haz clic en "Inscribir Usuario" para agregar estudiantes.</p>
                        </div>
                    )}

                    {!enrollmentsLoading && enrollments.length > 0 && (
                        <div className="enrollments-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Estudiante</th>
                                        <th>Email</th>
                                        <th>Progreso</th>
                                        <th>Lecciones Completadas</th>
                                        <th>Fecha de Inscripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map((enrollment: any) => (
                                        <tr key={enrollment.id}>
                                            <td>{enrollment.profiles?.full_name || 'Sin nombre'}</td>
                                            <td>{enrollment.profiles?.email}</td>
                                            <td>
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${enrollment.progress}%` }}
                                                    />
                                                    <span className="progress-text">{enrollment.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="text-center">{enrollment.completed_lessons}</td>
                                            <td>{new Date(enrollment.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="btn-remove"
                                                    onClick={() =>
                                                        handleUnenroll(
                                                            enrollment.user_id,
                                                            enrollment.profiles?.full_name || enrollment.profiles?.email
                                                        )
                                                    }
                                                >
                                                    Desinscribir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {showEnrollModal && selectedCourse && (
                <EnrollUserModal
                    courseId={selectedCourseId}
                    courseName={selectedCourse.title}
                    onClose={() => setShowEnrollModal(false)}
                    onSuccess={() => refetch()}
                />
            )}
        </div>
    );
}
