import React, { useState } from 'react';
import { Lock, User, Monitor, ChevronLeft, AlertCircle } from 'lucide-react';

const Login = ({ onLogin, onBack }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            onLogin({ name: 'Administrador' });
        } else {
            setError('Credenciales incorrectas. Pruebe con admin / admin123');
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top right, #1a1a2e 0%, #0a0a0c 100%)'
        }}>
            <div className="card animate-fade" style={{ width: '400px', padding: '40px', position: 'relative' }}>
                <button
                    onClick={onBack}
                    style={{
                        position: 'absolute', top: '20px', left: '20px',
                        background: 'transparent', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem'
                    }}
                >
                    <ChevronLeft size={16} /> Volver
                </button>

                <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
                    <div style={{
                        background: 'rgba(0, 122, 255, 0.1)',
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        color: 'var(--primary)'
                    }}>
                        <Monitor size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>SOPORTE-PRO</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Panel Administrativo</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(255, 69, 58, 0.1)', color: 'var(--danger)',
                        padding: '12px', borderRadius: '8px', marginBottom: '20px',
                        fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center'
                    }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Usuario (admin)"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(''); }}
                            style={{ paddingLeft: '44px' }}
                            required
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Contraseña (admin123)"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            style={{ paddingLeft: '44px' }}
                            required
                        />
                    </div>
                    <button type="submit" className="primary" style={{ marginTop: '10px' }}>
                        Acceder al Sistema
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
