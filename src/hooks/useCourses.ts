import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

export function useCourses(published: boolean = true) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchCourses();
    }, [published]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: false });

            if (published) {
                query = query.eq('is_published', true);
            }

            const { data, error } = await query;

            if (error) throw error;
            setCourses(data || []);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { courses, loading, error, refetch: fetchCourses };
}

export function useCourse(courseId: string) {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!courseId) return;
        fetchCourse();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single();

            if (error) throw error;
            setCourse(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { course, loading, error, refetch: fetchCourse };
}
