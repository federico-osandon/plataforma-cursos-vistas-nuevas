import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Enrollment = Database['public']['Tables']['enrollments']['Row'];
type EnrollmentInsert = Database['public']['Tables']['enrollments']['Insert'];

// Hook para obtener las inscripciones de un usuario
export function useUserEnrollments(userId?: string) {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        fetchEnrollments();
    }, [userId]);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('enrollments')
                .select('*')
                .eq('user_id', userId!)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEnrollments(data || []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { enrollments, loading, error, refetch: fetchEnrollments };
}

// Hook para obtener los estudiantes inscritos en un curso
export function useCourseEnrollments(courseId?: string) {
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!courseId) {
            setLoading(false);
            return;
        }
        fetchEnrollments();
    }, [courseId]);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('enrollments')
                .select(`
          *,
          profiles:user_id (
            id,
            email,
            full_name,
            avatar_url
          )
        `)
                .eq('course_id', courseId!)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEnrollments(data || []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { enrollments, loading, error, refetch: fetchEnrollments };
}

// Función para inscribir un usuario a un curso (solo admin/instructor)
export async function enrollUserToCourse(
    userId: string,
    courseId: string
): Promise<{ data: Enrollment | null; error: Error | null }> {
    try {
        // Verificar si ya está inscrito
        const { data: existing } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (existing) {
            return {
                data: null,
                error: new Error('El usuario ya está inscrito en este curso'),
            };
        }

        // Crear inscripción
        const enrollment: EnrollmentInsert = {
            user_id: userId,
            course_id: courseId,
            progress: 0,
            completed_lessons: 0,
        };

        const { data, error } = await supabase
            .from('enrollments')
            .insert(enrollment)
            .select()
            .single();

        if (error) throw error;

        return { data, error: null };
    } catch (err) {
        return { data: null, error: err as Error };
    }
}

// Función para remover inscripción
export async function unenrollUserFromCourse(
    userId: string,
    courseId: string
): Promise<{ error: Error | null }> {
    try {
        const { error } = await supabase
            .from('enrollments')
            .delete()
            .eq('user_id', userId)
            .eq('course_id', courseId);

        if (error) throw error;
        return { error: null };
    } catch (err) {
        return { error: err as Error };
    }
}

// Verificar si un usuario está inscrito en un curso
export async function isUserEnrolled(
    userId: string,
    courseId: string
): Promise<boolean> {
    try {
        const { data } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        return !!data;
    } catch {
        return false;
    }
}
