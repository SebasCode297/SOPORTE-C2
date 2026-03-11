import React from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  ClipboardList, 
  Package, 
  Users, 
  LogOut,
  Monitor
} from 'lucide-react';

const Sidebar = ({ activePage, onPageChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'repairs', label: 'Reparaciones', icon: Wrench },
    { id: 'orders', label: 'Órdenes', icon: ClipboardList },
    { id: 'inventory', label: 'Inventario', icon: Package },
    { id: 'customers', label: 'Clientes', icon: Users },
  ];

  return (
    <aside className="main-sidebar">
      <div className="sidebar-logo desktop-only">
        <Monitor size={24} color="var(--primary)" />
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>SOPORTE-C2</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={activePage === item.id ? 'active' : ''}
            title={item.label}
          >
            <item.icon size={20} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn" title="Cerrar Sesión">
          <LogOut size={20} />
          <span className="nav-label">Salir</span>
        </button>
      </div>

      <style>{`
        .main-sidebar {
          width: 260px;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 32px 16px;
          height: 100vh;
          position: sticky;
          top: 0;
          transition: all 0.3s;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 12px 40px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .sidebar-nav button, .logout-btn {
          background: transparent;
          color: var(--text-muted);
          justify-content: flex-start;
          padding: 14px 16px;
          border-radius: 14px;
          width: 100%;
        }

        .sidebar-nav button:hover, .logout-btn:hover {
          background: rgba(255,255,255,0.03);
          color: white;
        }

        .sidebar-nav button.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 8px 20px rgba(0, 122, 255, 0.2);
        }

        .logout-btn {
          margin-top: auto;
          border: 1px solid transparent;
        }

        .logout-btn:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(255, 69, 58, 0.05);
        }

        /* Responsive Sidebar */
        @media (max-width: 1024px) {
          .main-sidebar { width: 80px; padding: 32px 10px; }
          .nav-label { display: none; }
          .sidebar-nav button, .logout-btn { justify-content: center; padding: 16px; }
          .sidebar-logo { justify-content: center; padding-bottom: 30px; }
        }

        @media (max-width: 768px) {
          .main-sidebar {
            width: 100%;
            height: 70px;
            flex-direction: row;
            padding: 0 10px;
            position: fixed;
            bottom: 0;
            top: auto;
            border-right: none;
            border-top: 1px solid var(--border);
            z-index: 2000;
            background: rgba(21, 21, 24, 0.95);
            backdrop-filter: blur(20px);
          }
          .sidebar-logo { display: none; }
          .sidebar-nav { flex-direction: row; justify-content: space-around; padding: 0; margin: 0; }
          .sidebar-nav button { width: auto; height: 100%; border-radius: 0; }
          .sidebar-nav button.active { background: transparent; color: var(--primary); box-shadow: none; border-bottom: 3px solid var(--primary); }
          .sidebar-footer { border-left: 1px solid var(--border); margin-left: 10px; display: flex; align-items: center; }
          .logout-btn { margin-top: 0; height: 100%; padding: 0 15px; border-radius: 0; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
