import React from 'react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    Package,
    LogOut,
    Monitor,
    Wrench
} from 'lucide-react';

const Sidebar = ({ activePage, onPageChange, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'repairs', label: 'Reparaciones', icon: Wrench },
        { id: 'orders', label: 'Órdenes', icon: ClipboardList },
        { id: 'customers', label: 'Clientes', icon: Users },
        { id: 'inventory', label: 'Inventario', icon: Package },
    ];

    return (
        <div style={{
            width: '260px',
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
                <Monitor size={28} color="var(--primary)" />
                <h2 style={{ fontSize: '1.2rem' }}>SOPORTE-PRO</h2>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onPageChange(item.id)}
                            style={{
                                justifyContent: 'flex-start',
                                background: isActive ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                padding: '12px 16px',
                                borderRadius: '12px'
                            }}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <button
                onClick={onLogout}
                style={{
                    justifyContent: 'flex-start',
                    background: 'transparent',
                    color: 'var(--danger)',
                    padding: '12px 16px',
                    marginTop: 'auto'
                }}
            >
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
            </button>
        </div>
    );
};

export default Sidebar;
