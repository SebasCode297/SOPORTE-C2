import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  ArrowRightLeft,
  ChevronRight,
  MessageSquare,
  Trash2,
  Smartphone,
  User,
  ClipboardCheck,
  PlusCircle,
  X,
  Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = ({ onNavigate }) => {
  const { orders, customers, inventory, inquiries, deleteInquiry, addOrder, addCustomer } = useApp();
  const [registeringInquiry, setRegisteringInquiry] = useState(null);

  const stats = [
    { label: 'Servicios Totales', value: orders.length, icon: Database, color: 'var(--primary)', target: 'orders' },
    { label: 'En Proceso', value: orders.filter(o => o.status === 'repairing').length, icon: Clock, color: 'var(--warning)', target: 'repairs' },
    { label: 'Listos para Entrega', value: orders.filter(o => o.status === 'ready').length, icon: CheckCircle2, color: 'var(--success)', target: 'repairs' },
    { label: 'Urgentes', value: orders.filter(o => o.status === 'urgent').length, icon: AlertCircle, color: 'var(--danger)', target: 'orders' },
  ];

  const handleQuickRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const device = formData.get('device');
    
    // 1. Verificar si el cliente ya existe
    const normalizedInquiryPhone = registeringInquiry.contact.replace(/\s+/g, '');
    const clientExists = customers.find(c => 
      c.phone.replace(/\s+/g, '') === normalizedInquiryPhone || 
      c.name.toLowerCase() === registeringInquiry.name.toLowerCase()
    );
    
    if (!clientExists) {
      // Registrar cliente nuevo con los datos del chatbot (incluyendo email)
      addCustomer({
        name: registeringInquiry.name,
        phone: registeringInquiry.contact,
        email: registeringInquiry.email || '',
        address: 'No registrada',
      });
    }

    // 2. Registrar la nueva orden de servicio vinculada
    addOrder({
      client: registeringInquiry.name,
      device: device,
      problem: registeringInquiry.problem,
    });

    // 3. Eliminar la consulta
    deleteInquiry(registeringInquiry.id);
    setRegisteringInquiry(null);
    onNavigate('orders'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '1.8rem' }}>Resumen Administrativo</h1>
        <p style={{ color: 'var(--text-muted)' }}>Bienvenido de nuevo al panel de SOPORTE-PRO.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="card hover-scale" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', cursor: 'pointer',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)'
            }}
            onClick={() => onNavigate(stat.target)}
          >
            <div style={{ 
              background: `rgba(${stat.color === 'var(--primary)' ? '0,122,255' : stat.color === 'var(--warning)' ? '255,159,10' : stat.color === 'var(--success)' ? '52,199,89' : '255,69,58'}, 0.1)`, 
              padding: '16px', 
              borderRadius: '20px',
              color: stat.color
            }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 'bold' }}>{stat.label}</p>
              <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: '800' }}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Section Consultas */}
      <div className="card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(0,122,255,0.1)', padding: '10px', borderRadius: '12px' }}>
              <MessageSquare size={24} color="var(--primary)" />
            </div>
            <h3 style={{ margin: 0 }}>Consultas del Chatbot</h3>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '900', background: 'var(--primary)', color: 'white', padding: '4px 14px', borderRadius: '20px' }}>
            {inquiries.length} CONSULTAS
          </span>
        </div>

        {inquiries.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '20px' 
          }}>
            {inquiries.map((iq) => (
              <div key={iq.id} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--border)', 
                borderRadius: '20px', 
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '12px', 
                      background: 'var(--primary)', display: 'flex', alignItems: 'center', 
                      justifyContent: 'center', fontWeight: 'bold'
                    }}>{(iq.name || 'C').charAt(0)}</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: '800', fontSize: '1rem' }}>{iq.name || 'Cliente'}</p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--success)', fontWeight: 'bold' }}>{iq.contact}</p>
                        {iq.email && <Mail size={12} color="var(--text-muted)" title={iq.email} />}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setRegisteringInquiry(iq)} 
                      style={{ background: 'var(--primary)', color: 'white', padding: '6px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold' }}
                    >
                      Registrar
                    </button>
                    <button onClick={() => deleteInquiry(iq.id)} style={{ background: 'rgba(255, 69, 58, 0.05)', color: 'var(--danger)', padding: '8px', borderRadius: '10px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase' }}>Falla Reportada:</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>{iq.problem}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{iq.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', opacity: 0.3 }}>
            <MessageSquare size={48} style={{ marginBottom: '20px' }} />
            <p>No hay consultas pendientes.</p>
          </div>
        )}
      </div>

      {/* Modal de Conversión */}
      {registeringInquiry && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1200, backdropFilter: 'blur(4px)'
        }}>
          <div className="card animate-fade" style={{ width: '420px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, border: 'none' }}>Registrar Orden</h3>
              <button onClick={() => setRegisteringInquiry(null)} style={{ background: 'transparent', padding: 4 }}><X size={20} /></button>
            </div>

            <form onSubmit={handleQuickRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '8px' }}>CLIENTE IDENTIFICADO:</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>{registeringInquiry.name}</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--success)' }}>{registeringInquiry.contact}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{registeringInquiry.email || 'Sin Correo'}</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>MODELO DEL EQUIPO</label>
                <input 
                  type="text" 
                  name="device" 
                  placeholder="Ej: Laptop HP, iPhone..." 
                  required 
                  autoFocus
                  style={{ height: '48px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" style={{ flex: 1, background: 'var(--bg-dark)' }} onClick={() => setRegisteringInquiry(null)}>Cerrar</button>
                <button type="submit" className="primary" style={{ flex: 2 }}>Registrar Orden</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Access Grid Bottom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
          <div>
            <h4 style={{ margin: 0 }}>Stock Crítico</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>{inventory.filter(i => i.stock < 3).length} productos requieren atención.</p>
          </div>
          <button className="primary" onClick={() => onNavigate('inventory')}>Gestionar Stock</button>
        </div>
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
          <div>
            <h4 style={{ margin: 0 }}>Cartera de Clientes</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>{customers.length} perfiles fidelizados.</p>
          </div>
          <button className="primary" onClick={() => onNavigate('customers')}>Ver Directorio</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
