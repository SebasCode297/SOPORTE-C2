import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Smartphone,
  X,
  AlertTriangle,
  Clipboard,
  User,
  Settings,
  RefreshCcw,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Orders = () => {
  const { orders, updateOrderStatus, addOrder, customers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusPicker, setShowStatusPicker] = useState(null); // ID de la orden para mostrar el selector
  
  // Form state
  const [newOrder, setNewOrder] = useState({ client: '', device: '', problem: '' });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ready': return { bg: 'rgba(52, 199, 89, 0.1)', color: 'var(--success)', label: 'Listo' };
      case 'repairing': return { bg: 'rgba(0, 122, 255, 0.1)', color: 'var(--primary)', label: 'En Reparación' };
      case 'received': return { bg: 'rgba(160, 160, 165, 0.1)', color: 'var(--text-muted)', label: 'Recibido' };
      case 'urgent': return { bg: 'rgba(255, 69, 58, 0.1)', color: 'var(--danger)', label: 'Urgente' };
      default: return { bg: 'rgba(255, 159, 10, 0.1)', color: 'var(--warning)', label: 'Pendiente' };
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (newOrder.client && newOrder.device) {
      addOrder(newOrder);
      setShowModal(false);
      setNewOrder({ client: '', device: '', problem: '' });
    }
  };

  const statuses = [
    { id: 'received', label: 'Recibido', icon: Clock, color: 'var(--text-muted)' },
    { id: 'repairing', label: 'En Reparación', icon: RefreshCcw, color: 'var(--primary)' },
    { id: 'ready', label: 'Listo para Entrega', icon: CheckCircle, color: 'var(--success)' },
    { id: 'urgent', label: 'Urgente / Prioridad', icon: AlertCircle, color: 'var(--danger)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Órdenes de Servicio</h1>
          <p style={{ color: 'var(--text-muted)' }}>Control y seguimiento de equipos técnicos.</p>
        </div>
        <button className="primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Nueva Orden
        </button>
      </header>

      {/* Selector de Estado Manual */}
      {showStatusPicker && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(2px)'
        }} onClick={() => setShowStatusPicker(null)}>
          <div className="card animate-fade" style={{ width: '300px', padding: '24px' }} onClick={e => e.stopPropagation()}>
            <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>Cambiar Estado Operativo</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {statuses.map(s => (
                <button 
                  key={s.id}
                  onClick={() => { updateOrderStatus(showStatusPicker, s.id); setShowStatusPicker(null); }}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', 
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                    textAlign: 'left', borderRadius: '12px', color: s.color, fontWeight: 'bold'
                  }}
                >
                  <s.icon size={18} /> {s.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowStatusPicker(null)}
              style={{ width: '100%', marginTop: '16px', background: 'transparent', color: 'var(--text-muted)' }}
            >Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal Nueva Orden */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
          <div className="card animate-fade" style={{ width: '550px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>Nueva Orden de Servicio</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ingresa los datos del equipo y cliente.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>CLIENTE</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                  <select 
                    value={newOrder.client} 
                    onChange={(e) => setNewOrder({...newOrder, client: e.target.value})}
                    style={{ paddingLeft: '44px', cursor: 'pointer' }}
                    required
                  >
                    <option value="">Seleccione el propietario...</option>
                    {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>EQUIPO</label>
                <div style={{ position: 'relative' }}>
                  <Smartphone size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                  <input 
                    type="text" 
                    placeholder="Ej: Portátil Dell Latitude 5420" 
                    value={newOrder.device}
                    onChange={(e) => setNewOrder({...newOrder, device: e.target.value})}
                    style={{ paddingLeft: '44px' }}
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>DIAGNÓSTICO INICIAL / FALLA</label>
                <textarea 
                  placeholder="Describe detalladamente el problema técnico reportedo..." 
                  value={newOrder.problem}
                  onChange={(e) => setNewOrder({...newOrder, problem: e.target.value})}
                  style={{ height: '100px', padding: '16px', resize: 'none', lineHeight: '1.5' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <button type="button" style={{ flex: 1, background: 'var(--bg-dark)' }} onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="primary" style={{ flex: 2 }}>Registrar Ingreso</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ficha Técnica */}
      {selectedOrder && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
          <div className="card animate-fade" style={{ width: '480px', padding: '40px', border: '1px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(0, 122, 255, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Clipboard size={22} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Ficha: {selectedOrder.id}</h3>
              </div>
              <X style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => setSelectedOrder(null)} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px' }}>CLIENTE</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{selectedOrder.client}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px' }}>EQUIPO</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{selectedOrder.device}</p>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: 'var(--danger)' }}>
                  <AlertTriangle size={20} />
                  <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>FALLA REPORTADA</p>
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                  {selectedOrder.problem || "No se especificó una falla detallada."}
                </p>
              </div>
              
              <button className="primary" onClick={() => setSelectedOrder(null)} style={{ width: '100%' }}>
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '20px 24px' }}>Equipo / Registro</th>
              <th style={{ padding: '20px 24px' }}>Propietario</th>
              <th style={{ padding: '20px 24px' }}>Estado Operativo</th>
              <th style={{ padding: '20px 24px' }}>Mantenimiento</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '18px 24px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px' }}>
                        <Smartphone size={20} color="var(--primary)" />
                      </div>
                      <div>
                        <p style={{ fontWeight: '600' }}>{order.device}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{order.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px', fontWeight: '500' }}>{order.client}</td>
                  <td style={{ padding: '18px 24px' }}>
                    <button 
                      onClick={() => setShowStatusPicker(order.id)}
                      style={{ 
                        padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800',
                        background: statusStyle.bg, color: statusStyle.color, border: 'none',
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', 
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusStyle.color }} />
                      {statusStyle.label}
                      <RefreshCcw size={12} />
                    </button>
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      style={{ background: 'rgba(255,255,255,0.04)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                      title="Ver Detalles Técnicos"
                    >
                      <Settings size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
