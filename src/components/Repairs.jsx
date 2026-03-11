import React, { useState } from 'react';
import { 
  Wrench, 
  MessageSquare, 
  Mail, 
  Smartphone,
  ChevronRight,
  Save,
  Clock,
  User,
  X,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Repairs = () => {
  const { orders, updateOrder, customers } = useApp();
  const [selectedRepair, setSelectedRepair] = useState(null);

  const ongoingRepairs = orders.filter(o => o.status === 'repairing' || o.status === 'received' || o.status === 'ready');

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      progress: parseInt(formData.get('progress')),
      notes: formData.get('notes'),
      status: parseInt(formData.get('progress')) === 100 ? 'ready' : 'repairing'
    };
    updateOrder(selectedRepair.id, updates);
    setSelectedRepair(null);
  };

  const getClientData = (clientName) => {
    return customers.find(c => c.name === clientName) || { phone: '', email: '' };
  };

  const sendWhatsApp = (order) => {
    const client = getClientData(order.client);
    const message = `*REPORTE TÉCNICO - SOPORTE-PRO* 🛠️\n\n` +
                   `Hola *${order.client}*,\n\n` +
                   `Le informamos que el mantenimiento de su equipo *${order.device}* ha sido completado con éxito. ✅\n\n` +
                   `*Detalle del trabajo:* \n${order.notes || 'Mantenimiento integral realizado.'}\n\n` +
                   `📍 Puede acercarse a nuestro establecimiento para retirar su equipo.\n\n` +
                   `¡Gracias por confiar en nosotros!`;
                   
    const url = `https://wa.me/${client.phone.replace(/\+/g, '').replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const sendEmail = (order) => {
    const client = getClientData(order.client);
    const subject = `Estado de Reparación: ${order.device}`;
    const body = `Hola ${order.client},\n\nLe informamos que la reparación de su equipo (${order.device}) ha sido completada satisfactoriamente.\n\nDetalles: ${order.notes || 'Mantenimiento integral.'}\n\nPuede pasar a retirarlo en nuestro local.\n\nSOPORTE-PRO`;
    window.open(`mailto:${client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '1.8rem' }}>Módulo de Reparaciones</h1>
        <p style={{ color: 'var(--text-muted)' }}>Gestiona el avance técnico y las notas de cada equipo.</p>
      </header>

      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {ongoingRepairs.map((repair) => (
          <div key={repair.id} className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: repair.status === 'ready' ? '1px solid var(--success)' : '1px solid var(--border)', background: repair.status === 'ready' ? 'rgba(52, 199, 89, 0.02)' : 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ background: repair.status === 'ready' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(0, 122, 255, 0.1)', padding: '10px', borderRadius: '12px', color: repair.status === 'ready' ? 'var(--success)' : 'var(--primary)' }}>
                  <Wrench size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{repair.device}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>ID: {repair.id}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 'bold', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  background: repair.status === 'ready' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: repair.status === 'ready' ? 'var(--success)' : 'var(--text-muted)'
                }}>{repair.status.toUpperCase()}</span>
                <button 
                  onClick={() => setSelectedRepair(repair)}
                  style={{ background: 'transparent', padding: '4px', color: 'var(--text-muted)' }}
                  className="hover-scale"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <User size={16} color="var(--primary)" />
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{repair.client}</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                <span>PROGRESO TÉCNICO</span>
                <span style={{ color: 'var(--text-main)' }}>{repair.progress}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-dark)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${repair.progress}%`, 
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                  transition: 'width 0.8s'
                }} />
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <p style={{ fontWeight: 'bold', fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Notas Técnicas:
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: repair.notes ? 'var(--text-main)' : 'var(--text-muted)' }}>
                {repair.notes || "Sin notas todavía."}
              </p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {repair.status === 'ready' ? (
                <>
                  <button 
                    className="primary" 
                    style={{ flex: 1, minWidth: '120px', padding: '12px', background: '#25D366' }}
                    onClick={() => sendWhatsApp(repair)}
                  >
                    <Smartphone size={18} /> WhatsApp
                  </button>
                  <button 
                    style={{ flex: 1, minWidth: '120px', padding: '12px', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px solid var(--border)' }}
                    onClick={() => sendEmail(repair)}
                  >
                    Email
                  </button>
                </>
              ) : (
                <button 
                  className="primary" 
                  style={{ width: '100%', padding: '14px', borderRadius: '14px' }}
                  onClick={() => setSelectedRepair(repair)}
                >
                  <Edit3 size={18} /> Actualizar Avance
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Actualización - Responsive */}
      {selectedRepair && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(4px)',
          padding: '20px'
        }}>
          <div className="card animate-fade" style={{ width: '100%', maxWidth: '450px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, border: 'none' }}>Actualizar Reparación</h3>
              <button onClick={() => setSelectedRepair(null)} style={{ background: 'transparent', padding: 4 }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>PROGRESO ({selectedRepair.progress}%)</label>
                <input 
                  type="range" 
                  name="progress" 
                  min="0" max="100" 
                  defaultValue={selectedRepair.progress} 
                  style={{ accentColor: 'var(--primary)', height: '10px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>NOTAS TÉCNICAS</label>
                <textarea 
                  name="notes"
                  placeholder="Ej: Se cambió pantalla..."
                  defaultValue={selectedRepair.notes}
                  style={{ height: '100px', resize: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" style={{ flex: 1, background: 'var(--bg-dark)' }} onClick={() => setSelectedRepair(null)}>Cancelar</button>
                <button type="submit" className="primary" style={{ flex: 2 }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Repairs;
