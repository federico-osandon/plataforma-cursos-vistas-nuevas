import { ReactNode } from 'react';
import { useUserRole } from '../hooks/useUserRole';

interface AdminOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
    const { isAdmin, loading } = useUserRole();

    if (loading) return null;
    if (!isAdmin) return <>{fallback}</>;

    return <>{children}</>;
}

interface InstructorOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function InstructorOnly({ children, fallback = null }: InstructorOnlyProps) {
    const { hasInstructorAccess, loading } = useUserRole();

    if (loading) return null;
    if (!hasInstructorAccess) return <>{fallback}</>;

    return <>{children}</>;
}
