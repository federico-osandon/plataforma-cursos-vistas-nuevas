import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { enrollUserToCourse } from '../../hooks/useEnrollments';
import './EnrollUserModal.css';

interface EnrollUserModalProps {
    courseId: string;
    courseName: string;
    onClose: () => void;
    onSuccess: () => void;
}

interface User {
    id: string;
    email: string;
    full_name: string | null;
}

export function EnrollUserModal({ courseId, courseName, onClose, onSuccess }: EnrollUserModalProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, email, full_name')
                .eq('role', 'student')
                .order('email');

            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const handleEnroll = async () => {
        if (!selectedUserId) {
            setMessage({ type: 'error', text: 'Selecciona un usuario' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const { error } = await enrollUserToCourse(selectedUserId, courseId);

        if (error) {
            setMessage({ type: 'error', text: error.message });
            setLoading(false);
        } else {
            setMessage({ type: 'success', text: '¡Usuario inscrito exitosamente!' });
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 1500);
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Inscribir Usuario</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <p className="course-name">Curso: <strong>{courseName}</strong></p>

                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Buscar por email o nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="user-select">
                        <label>Seleccionar usuario:</label>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">-- Selecciona un usuario --</option>
                            {filteredUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.full_name || user.email} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    {message && (
                        <div className={`message message-${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose} disabled={loading}>
                        Cancelar
                    </button>
                    <button
                        className="btn-enroll"
                        onClick={handleEnroll}
                        disabled={loading || !selectedUserId}
                    >
                        {loading ? 'Inscribiendo...' : 'Inscribir Usuario'}
                    </button>
                </div>
            </div>
        </div>
    );
}
