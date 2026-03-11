import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import Repairs from './components/Repairs';

function App() {
  // Cargar estado inicial desde localStorage
  const [view, setView] = useState(() => localStorage.getItem('sp_view') || 'landing');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sp_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('sp_page') || 'dashboard');

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('sp_view', view);
  }, [view]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sp_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sp_page', currentPage);
  }, [currentPage]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('app');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    localStorage.removeItem('sp_view');
    localStorage.removeItem('sp_user');
    localStorage.removeItem('sp_page');
  };

  const isLoggedIn = !!user;

  if (view === 'landing') {
    return <Landing onGetStarted={() => setView('login')} isLoggedIn={isLoggedIn} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} onBack={() => setView('landing')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'repairs': return <Repairs />;
      case 'orders': return <Orders />;
      case 'inventory': return <Inventory />;
      case 'customers': return <Customers />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)', color: 'white' }}>
      <Sidebar 
        activePage={currentPage} 
        onPageChange={setCurrentPage} 
        onLogout={handleLogout} 
      />
      <main className="main-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div className="animate-fade">
          {renderPage()}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .app-container { flex-direction: column; }
          .main-content { padding: 1.5rem 1rem 100px !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
