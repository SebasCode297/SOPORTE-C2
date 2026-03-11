import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales desde Supabase
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: customersData } = await supabase.from('customers').select('*').order('name');
      const { data: inventoryData } = await supabase.from('inventory').select('*').order('name');
      const { data: inquiriesData } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });

      if (ordersData) setOrders(ordersData);
      if (customersData) setCustomers(customersData);
      if (inventoryData) setInventory(inventoryData);
      if (inquiriesData) setInquiries(inquiriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Suscripción en tiempo real para Consultas (Inquiries)
    const inquiriesSubscription = supabase
      .channel('public:inquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setInquiries(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setInquiries(prev => prev.filter(i => i.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setInquiries(prev => prev.map(i => i.id === payload.new.id ? payload.new : i));
        }
      })
      .subscribe();

    // Suscripción para Órdenes
    const ordersSubscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(inquiriesSubscription);
      supabase.removeChannel(ordersSubscription);
    };
  }, []);

  const addOrder = async (order) => {
    const newOrder = {
      client: order.client,
      device: order.device,
      problem: order.problem,
      status: 'received',
      progress: 0,
      notes: '',
      date: new Date().toISOString().split('T')[0]
    };
    
    const { data, error } = await supabase.from('orders').insert([newOrder]).select();
    if (!error && data) {
      // El estado se actualizará vía suscripción o manualmente aquí para feedback rápido
    }
  };

  const addCustomer = async (customer) => {
    const { data, error } = await supabase.from('customers').insert([customer]).select();
    if (!error && data) {
      setCustomers(prev => [...prev, data[0]]);
    }
  };

  const updateOrder = async (id, updates) => {
    const { error } = await supabase.from('orders').update(updates).eq('id', id);
    if (!error) {
      // El estado se actualizará vía suscripción
    }
  };

  const updateOrderStatus = (id, newStatus) => {
    updateOrder(id, { status: newStatus });
  };

  const addInquiry = async (inquiry) => {
    const newInquiry = {
      name: inquiry.name,
      email: inquiry.email,
      contact: inquiry.contact,
      problem: inquiry.problem,
      date: new Date().toLocaleString()
    };
    await supabase.from('inquiries').insert([newInquiry]);
  };

  const deleteInquiry = async (id) => {
    await supabase.from('inquiries').delete().eq('id', id);
  };

  const updateInventory = async (id, updates) => {
    await supabase.from('inventory').update(updates).eq('id', id);
    setInventory(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  return (
    <AppContext.Provider value={{ 
      orders, addOrder, updateOrder, updateOrderStatus, 
      customers, addCustomer,
      inventory, setInventory: updateInventory,
      inquiries, addInquiry, deleteInquiry,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
