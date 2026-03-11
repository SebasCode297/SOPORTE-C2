import React, { useState, createContext, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Función auxiliar para cargar datos del localStorage
  const loadInitialData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [orders, setOrders] = useState(() => loadInitialData('sp_orders', [
    { id: 'OS-001', client: 'Juan Pérez', device: 'Laptop HP Pavilion', date: '2026-03-08', status: 'ready', problem: 'Cambio de teclado', progress: 100, notes: 'Se instaló teclado original. Teclas funcionando al 100%.' },
    { id: 'OS-002', client: 'María García', device: 'MacBook Air M1', date: '2026-03-09', status: 'repairing', problem: 'No enciende', progress: 40, notes: 'Diagnosticado corto en línea de entrada. Se están pidiendo los integrados.' },
  ]));

  const [customers, setCustomers] = useState(() => loadInitialData('sp_customers', [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@email.com', phone: '+593 98 765 4321', address: 'Av. Amazonas N24', services: 3 },
    { id: 2, name: 'María García', email: 'maria.g@gmail.com', phone: '+593 99 123 4567', address: 'Cumbayá, Sector Sur', services: 1 },
  ]));

  const [inventory, setInventory] = useState(() => loadInitialData('sp_inventory', [
    { id: 'INV-001', name: 'SSD Kingston 480GB', category: 'Almacenamiento', stock: 2, price: 45, status: 'low' },
    { id: 'INV-002', name: 'Pasta Térmica MX-4', category: 'Mantenimiento', stock: 1, price: 12, status: 'critical' },
  ]));

  // Nuevo estado para consultas del chatbot
  const [inquiries, setInquiries] = useState(() => loadInitialData('sp_inquiries', []));

  // Guardar en localStorage cada vez que cambien los datos
  useEffect(() => {
    localStorage.setItem('sp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sp_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('sp_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('sp_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `OS-00${orders.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: 'received',
      progress: 0,
      notes: ''
    };
    setOrders([newOrder, ...orders]);
  };

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(), // ID único basado en tiempo
      services: 1
    };
    setCustomers([newCustomer, ...customers]);
  };

  const updateOrder = (id, updates) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const updateOrderStatus = (id, newStatus) => {
    updateOrder(id, { status: newStatus });
  };

  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: Date.now(),
      date: new Date().toLocaleString(),
      read: false
    };
    setInquiries([newInquiry, ...inquiries]);
  };

  const deleteInquiry = (id) => {
    setInquiries(inquiries.filter(i => i.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      orders, addOrder, updateOrder, updateOrderStatus, 
      customers, addCustomer,
      inventory, setInventory,
      inquiries, addInquiry, deleteInquiry
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
