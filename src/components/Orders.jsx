import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Calendar,
  Smartphone,
  User,
  AlertCircle,
  Clock,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Orders = () => {
  const { orders, customers, addOrder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders.filter(order => 
    order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'received': return { icon: Clock, color: 'var(--text-muted)', label: 'Recibido' };
      case 'repairing': return { icon: Wrench, color: 'var(--warning)', label: 'Reparando' };
      case 'ready': return { icon: CheckCircle2, color: 'var(--success)', label: 'Listo' };
      case 'delivered': return { icon: ArrowRight, color: 'var(--primary)', label: 'Entregado' };
      default: return { icon: AlertCircle, color: 'var(--text-muted)', label: status };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Gestión de Órdenes</h1>
          <p style={{ color: 'var(--text-muted)' }}>Historial completo de servicios y estados.</p>
        </div>
        <button className="primary" onClick={() => setIsModalOpen(true)} style={{ width: '100%', maxWidth: '200px' }}>
          <Plus size={20} /> Nueva Orden
        </button>
      </header>

      {/* Stats Quick View - Responsive */}
      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(255,159,10,0.1)', padding: '10px', borderRadius: '12px', color: 'var(--warning)' }}><Clock size={20} /></div>
          <div><p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Pendientes</p><h3 style={{ margin: 0 }}>{orders.filter(o => o.status !== 'ready' && o.status !== 'delivered').length}</h3></div>
        </div>
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(52,199,89,0.1)', padding: '10px', borderRadius: '12px', color: 'var(--success)' }}><CheckCircle2 size={20} /></div>
          <div><p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Listos</p><h3 style={{ margin: 0 }}>{orders.filter(o => o.status === 'ready').length}</h3></div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Buscar por cliente, equipo o ID..." 
            style={{ paddingLeft: '40px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px 20px' }}>
          <Filter size={18} /> Filtros
        </button>
      </div>

      {/* Orders Table - Scrollable on Mobile */}
      <div className="card" style={{ padding: 0, overflowX: 'auto', borderRadius: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ padding: '20px' }}>ID</th>
              <th style={{ padding: '20px' }}>Cliente</th>
              <th style={{ padding: '20px' }}>Equipo</th>
              <th style={{ padding: '20px' }}>Estado</th>
              <th style={{ padding: '20px' }}>Fecha</th>
              <th style={{ padding: '20px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }} className="hover-row">
                <td style={{ padding: '20px', fontWeight: 'bold' }}>#{order.id.toString().slice(-4)}</td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {order.client.charAt(0)}
                    </div>
                    {order.client}
                  </div>
                </td>
                <td style={{ padding: '20px' }}>{order.device}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    background: order.status === 'ready' ? 'rgba(52,199,89,0.1)' : 'rgba(255,255,255,0.05)',
                    color: order.status === 'ready' ? 'var(--success)' : 'var(--text-muted)',
                    border: '1px solid currentColor'
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{order.date}</td>
                <td style={{ padding: '20px' }}>
                  <button style={{ background: 'transparent', padding: '8px' }}><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Responsive */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(4px)',
          padding: '20px'
        }}>
          <div className="card animate-fade" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 style={{ margin: 0 }}>Nueva Orden</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', padding: 4 }}><X size={24} /></button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.target);
              addOrder({
                client: d.get('client'),
                device: d.get('device'),
                problem: d.get('problem')
              });
              setIsModalOpen(false);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>CLIENTE</label>
                <select name="client" required>
                  <option value="">Seleccionar cliente...</option>
                  {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>EQUIPO / MODELO</label>
                <input type="text" name="device" placeholder="Ej: Acer Nitro 5..." required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>PROBLEMA REPORTADO</label>
                <textarea name="problem" placeholder="Detalles de la falla..." style={{ height: '80px' }} required />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" style={{ flex: 1, background: 'var(--bg-dark)' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="primary" style={{ flex: 2 }}>Registrar Orden</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
