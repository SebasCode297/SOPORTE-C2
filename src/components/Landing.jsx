import React from 'react';
import { Monitor, Cpu, Shield, Users, ArrowRight, Lock, Menu } from 'lucide-react';
import Chatbot from './Chatbot';

const Landing = ({ onGetStarted, isLoggedIn }) => {
    return (
        <div style={{ background: 'radial-gradient(circle at top right, #1a1a2e 0%, #0a0a0c 100%)', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
            {/* Nav Section */}
            <nav style={{ 
                padding: '24px 80px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid var(--border)',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Monitor size={32} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SOPORTE-C2</h2>
                </div>
                
                {/* Desktop Nav */}
                <div className="desktop-only" style={{ display: 'flex', gap: '40px', fontSize: '1rem', color: 'var(--text-muted)', alignItems: 'center' }}>
                    <a href="#inicio" style={{ color: 'white', textDecoration: 'none' }}>Inicio</a>
                    <a href="#nosotros" style={{ color: 'inherit', textDecoration: 'none' }}>Nosotros</a>
                    <a href="#servicios" style={{ color: 'inherit', textDecoration: 'none' }}>Servicios</a>
                    {isLoggedIn && (
                        <button 
                            className="primary" 
                            onClick={onGetStarted}
                            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                        >
                            Ir al Panel Admin
                        </button>
                    )}
                </div>

                {/* Mobile Menu Icon (Visual Only for now or could trigger scroll) */}
                <div className="mobile-only" style={{ display: 'none' }}>
                    <Menu size={24} />
                </div>
            </nav>

            {/* Hero Section */}
            <section id="inicio" style={{ padding: '120px 80px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '24px', lineHeight: '1.1' }}>
                    Mantenimiento de Computadoras <span style={{ color: 'var(--primary)' }}>Profesional</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
                    Brindamos soluciones técnicas avanzadas para que tu tecnología nunca se detenga. 
                    Calidad técnica, rapidez y confianza en cada reparación.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <a href="#servicios" className="primary" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Servicios <ArrowRight size={20} />
                    </a>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" style={{ padding: '80px', background: 'rgba(255,255,255,0.02)' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px' }}>Lo que ofrecemos</h2>
                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <Cpu size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                        <h3>Hardware</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Diagnóstico y cambio de componentes con total trazabilidad.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <Monitor size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                        <h3>Software</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Limpieza de virus, formateo y actualización de sistemas operativos.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <Shield size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                        <h3>Preventivo</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Limpieza profunda y cambio de pasta térmica para mayor vida útil.</p>
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section id="nosotros" style={{ padding: '100px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="responsive-grid">
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>¿Quiénes Somos?</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '32px' }}>
                        Somos un equipo de apasionados dedicados a brindar soporte de alta calidad. 
                        Tus equipos son fundamentales para tu día a día y nosotros los cuidamos.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}><Users size={20} /></div>
                            <span>Enfoque centrado en el cliente</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px' }}><Shield size={20} /></div>
                            <span>Garantía y Seguridad total</span>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: 0, overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800" alt="Workplace" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                </div>
            </section>

            <footer style={{ padding: '60px 20px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <p>© 2026 SOPORTE-C2. Todos los derechos reservados.</p>
                <button 
                    onClick={onGetStarted}
                    style={{ 
                        background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.05)', 
                        fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' 
                    }}
                >
                    <Lock size={8} /> Acceso Staff
                </button>
            </footer>

            <Chatbot />
            
            {/* Custom Mobile Helper Style */}
            <style>{`
                @media (max-width: 768px) {
                    .mobile-only { display: block !important; }
                    nav h2 { fontSize: 1.2rem !important; }
                }
            `}</style>
        </div>
    );
};

export default Landing;
