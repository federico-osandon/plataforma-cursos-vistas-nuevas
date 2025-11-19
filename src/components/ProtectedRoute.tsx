import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useUserRole } from '../hooks/useUserRole';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
    requireInstructor?: boolean;
    redirectTo?: string;
}

export function ProtectedRoute({
    children,
    requireAdmin = false,
    requireInstructor = false,
    redirectTo = '/',
}: ProtectedRouteProps) {
    const { user, loading: authLoading } = useAuth();
    const { isAdmin, isInstructor, loading: roleLoading } = useUserRole();

    // Mostrar loading mientras se verifica autenticación y rol
    if (authLoading || roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Verificando permisos...</div>
            </div>
        );
    }

    // Si no está autenticado, redirigir a login
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Si requiere admin y no es admin, denegar acceso
    if (requireAdmin && !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">
                        ⛔ Acceso Denegado
                    </h1>
                    <p className="text-white mb-6">
                        Esta sección es solo para Super Administradores.
                    </p>
                    <a
                        href={redirectTo}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        );
    }

    // Si requiere instructor y no es instructor ni admin, denegar acceso
    if (requireInstructor && !isInstructor && !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">
                        ⛔ Acceso Denegado
                    </h1>
                    <p className="text-white mb-6">
                        Esta sección es solo para Instructores y Administradores.
                    </p>
                    <a
                        href={redirectTo}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        );
    }

    // Si pasa todas las verificaciones, mostrar el contenido
    return <>{children}</>;
}
