import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './AuthForm.css';

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) throw error;
                setMessage({ type: 'success', text: '¡Bienvenido de vuelta!' });
            } else {
                const { error } = await signUp(email, password, fullName);
                if (error) throw error;
                setMessage({
                    type: 'success',
                    text: '¡Cuenta creada! Revisa tu email para confirmar.'
                });
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'Ocurrió un error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form-card">
                <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>

                {message && (
                    <div className={`message message-${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="fullName">Nombre completo</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Tu nombre"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                    </button>
                </form>

                <div className="auth-toggle">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="toggle-button"
                    >
                        {isLogin
                            ? '¿No tienes cuenta? Regístrate'
                            : '¿Ya tienes cuenta? Inicia sesión'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
