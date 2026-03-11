import React, { useState } from 'react';
import {
    Package,
    Plus,
    Search,
    X,
    Database,
    Tag,
    Layers,
    DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Inventory = () => {
    const { inventory, setInventory } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', category: 'Almacenamiento', stock: '', price: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        const item = {
            ...newItem,
            id: `INV-00${inventory.length + 1}`,
            status: parseInt(newItem.stock) < 3 ? 'low' : 'normal',
            price: parseFloat(newItem.price)
        };
        setInventory([item, ...inventory]);
        setShowModal(false);
        setNewItem({ name: '', category: 'Almacenamiento', stock: '', price: '' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem' }}>Inventario de Repuestos</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gestión de stock técnico y suministros.</p>
                </div>
                <button className="primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} />
                    Agregar Producto
                </button>
            </header>

            {/* Modal Nuevo Producto (REDISEÑADO) */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
                }}>
                    <div className="card animate-fade" style={{ width: '450px', padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem' }}>Ingreso de Suministros</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Actualiza el catálogo de repuestos.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <Tag size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                <input
                                    type="text" placeholder="Nombre (ej: Disco SSD 500GB)"
                                    value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    style={{ paddingLeft: '44px' }}
                                    required
                                />
                            </div>

                            <div style={{ position: 'relative' }}>
                                <Layers size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)', zIndex: 1 }} />
                                <select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    style={{ paddingLeft: '44px', cursor: 'pointer' }}
                                >
                                    <option>Almacenamiento</option>
                                    <option>Memorias RAM</option>
                                    <option>Mantenimiento (Pastas, limpieza)</option>
                                    <option>Accesorios y Periféricos</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Database size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                    <input
                                        type="number" placeholder="Cant."
                                        value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                                        style={{ paddingLeft: '44px' }}
                                        required
                                    />
                                </div>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <DollarSign size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--primary)' }} />
                                    <input
                                        type="number" step="0.01" placeholder="P. Unit"
                                        value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                        style={{ paddingLeft: '44px' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <button type="button" style={{ flex: 1, background: 'var(--bg-dark)' }} onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="primary" style={{ flex: 2 }}>Guardar en Stock</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '20px 24px' }}>Producto / Categoría</th>
                            <th style={{ padding: '20px 24px' }}>Stock Disponible</th>
                            <th style={{ padding: '20px 24px' }}>Precio Base</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '18px 24px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px' }}>
                                            <Package size={20} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600' }}>{item.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                                        background: parseInt(item.stock) < 3 ? 'rgba(255, 69, 58, 0.1)' : 'rgba(255,255,255,0.05)',
                                        color: parseInt(item.stock) < 3 ? 'var(--danger)' : 'var(--text-main)'
                                    }}>
                                        {item.stock} unidades
                                    </span>
                                </td>
                                <td style={{ padding: '18px 24px', fontWeight: '600', color: 'var(--primary)' }}>
                                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
