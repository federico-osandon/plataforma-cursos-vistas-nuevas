import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export type UserRole = 'student' | 'instructor' | 'admin';

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    role: UserRole;
}

export function useUserRole() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user!.id)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    // Helper functions para verificar roles
    const isAdmin = profile?.role === 'admin';
    const isInstructor = profile?.role === 'instructor';
    const isStudent = profile?.role === 'student';
    const hasAdminAccess = isAdmin; // Solo admin tiene acceso completo
    const hasInstructorAccess = isAdmin || isInstructor; // Admin e instructor

    return {
        profile,
        loading,
        error,
        role: profile?.role || null,
        isAdmin,
        isInstructor,
        isStudent,
        hasAdminAccess,
        hasInstructorAccess,
        refetch: fetchProfile,
    };
}
