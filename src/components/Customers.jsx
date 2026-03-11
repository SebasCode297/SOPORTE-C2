import React, { useState } from 'react';
import {
    Users,
    Plus,
    Search,
    Mail,
    Phone,
    MapPin,
    X,
    History,
    Smartphone,
    ChevronRight,
    User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Customers = () => {
    const { customers, addCustomer, orders } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Form state
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        if (newCustomer.name && newCustomer.phone) {
            addCustomer(newCustomer);
            setShowModal(false);
            setNewCustomer({ name: '', email: '', phone: '', address: '' });
        }
    };

    const customerHistory = selectedCustomer
        ? orders.filter(o => o.client === selectedCustomer.name)
        : [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem' }}>Directorio de Clientes</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Historial consolidado de servicio técnico.</p>
                </div>
                <button className="primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} />
                    Nuevo Cliente
                </button>
            </header>

            {/* Modal Nuevo Cliente (REDISEÑADO) */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
                }}>
                    <div className="card animate-fade" style={{ width: '500px', padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem' }}>Filiación de Cliente</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Crea un perfil para seguimiento profesional.</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ background: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                <input
                                    type="text" placeholder="Nombre Completo del Cliente"
                                    value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                    style={{ paddingLeft: '44px' }}
                                    required
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                <input
                                    type="text" placeholder="WhatsApp / Teléfono Móvil"
                                    value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                    style={{ paddingLeft: '44px' }}
                                    required
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                <input
                                    type="email" placeholder="Correo Electrónico"
                                    value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                    style={{ paddingLeft: '44px' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                <input
                                    type="text" placeholder="Dirección de Domicilio o Trabajo"
                                    value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                    style={{ paddingLeft: '44px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <button type="button" style={{ flex: 1, background: 'var(--bg-dark)' }} onClick={() => setShowModal(false)}>Cerrar</button>
                                <button type="submit" className="primary" style={{ flex: 2 }}>Registrar Cliente</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Historial de Cliente (REDISEÑADO) */}
            {selectedCustomer && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
                }}>
                    <div className="card animate-fade" style={{ width: '650px', padding: '40px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>
                                    {selectedCustomer.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{selectedCustomer.name}</h2>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Perfil Consolidado del Cliente</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                style={{ background: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
                                <Phone size={20} color="var(--primary)" />
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, fontWeight: 'bold' }}>TELÉFONO</p>
                                    <p style={{ margin: 0 }}>{selectedCustomer.phone}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
                                <Mail size={20} color="var(--primary)" />
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, fontWeight: 'bold' }}>CORREO</p>
                                    <p style={{ margin: 0 }}>{selectedCustomer.email || 'No registrado'}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', fontSize: '1.1rem' }}>
                                <History size={22} color="var(--primary)" />
                                Historial de Visitas y Reparaciones
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {customerHistory.length > 0 ? customerHistory.map((order, i) => (
                                    <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ background: 'rgba(0,122,255,0.1)', padding: '8px', borderRadius: '8px' }}>
                                                    <Smartphone size={20} color="var(--primary)" />
                                                </div>
                                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.device}</span>
                                            </div>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px' }}>{order.date}</span>
                                        </div>
                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: '800', letterSpacing: '1px' }}>MOTIVO TÉCNICO DE VISITA:</p>
                                            <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>{order.problem}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed var(--border)' }}>
                                        Este cliente aún no registra órdenes de servicio históricas.
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="primary" onClick={() => setSelectedCustomer(null)} style={{ width: '100%', marginTop: '40px', padding: '16px' }}>
                            Cerrar Expediente
                        </button>
                    </div>
                </div>
            )}

            <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Buscar un cliente por nombre completo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '48px', height: '48px' }}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
            }}>
                {customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((customer) => (
                    <div key={customer.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold'
                                }}>{customer.name.charAt(0)}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{customer.name}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>N° Registro: #{customer.id.toString().padStart(3, '0')}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}><Phone size={16} color="var(--primary)" /> <span>{customer.phone}</span></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}><Mail size={16} color="var(--primary)" /> <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{customer.email || 'Sin correo'}</span></div>
                        </div>

                        <button
                            className="primary"
                            style={{ background: 'rgba(0, 122, 255, 0.1)', color: 'var(--primary)', border: '1px solid rgba(0, 122, 255, 0.2)' }}
                            onClick={() => setSelectedCustomer(customer)}
                        >
                            Expediente e Historial
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;
