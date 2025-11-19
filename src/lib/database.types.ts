// Este archivo será generado automáticamente por Supabase CLI
// Por ahora, definimos los tipos básicos manualmente

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            courses: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    description: string
                    instructor_id: string
                    price: number
                    duration: string
                    total_lessons: number
                    image_url: string | null
                    banner_url: string | null
                    gradient: string | null
                    category: string | null
                    level: string
                    is_published: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    description: string
                    instructor_id: string
                    price: number
                    duration: string
                    total_lessons: number
                    image_url?: string | null
                    banner_url?: string | null
                    gradient?: string | null
                    category?: string | null
                    level?: string
                    is_published?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    description?: string
                    instructor_id?: string
                    price?: number
                    duration?: string
                    total_lessons?: number
                    image_url?: string | null
                    banner_url?: string | null
                    gradient?: string | null
                    category?: string | null
                    level?: string
                    is_published?: boolean
                }
            }
            lessons: {
                Row: {
                    id: string
                    created_at: string
                    course_id: string
                    title: string
                    description: string | null
                    video_url: string | null
                    duration: string
                    order: number
                    is_free: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    course_id: string
                    title: string
                    description?: string | null
                    video_url?: string | null
                    duration: string
                    order: number
                    is_free?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    course_id?: string
                    title?: string
                    description?: string | null
                    video_url?: string | null
                    duration?: string
                    order?: number
                    is_free?: boolean
                }
            }
            enrollments: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    course_id: string
                    progress: number
                    completed_lessons: number
                    last_accessed: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    course_id: string
                    progress?: number
                    completed_lessons?: number
                    last_accessed?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    course_id?: string
                    progress?: number
                    completed_lessons?: number
                    last_accessed?: string | null
                }
            }
            profiles: {
                Row: {
                    id: string
                    created_at: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'student' | 'instructor' | 'admin'
                }
                Insert: {
                    id: string
                    created_at?: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'student' | 'instructor' | 'admin'
                }
                Update: {
                    id?: string
                    created_at?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'student' | 'instructor' | 'admin'
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
