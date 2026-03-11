import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Smartphone, User, MessageCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Chatbot = () => {
  const { addInquiry } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Welcome, 2: Name, 3: Email, 4: Problem, 5: Contact, 6: Success
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! Bienvenido a SOPORTE-PRO. 👋 ¿Cómo podemos ayudarte hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [tempData, setTempData] = useState({ name: '', email: '', problem: '', contact: '' });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const handleOption = (name, techNumber) => {
    addMessage('user', name);
    if (techNumber) {
      window.open(`https://wa.me/${techNumber.replace(/\+/g, '').replace(/\s+/g, '')}?text=Hola%20${name},%20necesito%20asistencia%20técnica.`, '_blank');
      addMessage('bot', `Excelente, te estoy comunicando con ${name}.`);
    } else {
      setStep(2);
      addMessage('bot', 'Para ayudarte mejor, ¿podrías decirnos tu nombre?');
    }
  };

  const finalizeInquiry = (finalData) => {
    addInquiry(finalData);
    setStep(6);
    setTimeout(() => {
      addMessage('bot', '¡Información recibida! 🚀 Un técnico revisará tu caso y te contactará pronto. ¡Gracias!');
      setTimeout(() => {
        setStep(1);
        setTempData({ name: '', email: '', problem: '', contact: '' });
      }, 5000);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue;
    addMessage('user', text);
    setInputValue('');

    if (step === 2) {
      setTempData({ ...tempData, name: text });
      setStep(3);
      setTimeout(() => addMessage('bot', `Mucho gusto ${text.split(' ')[0]}. Ahora, por favor déjanos tu correo electrónico:`), 500);
    } else if (step === 3) {
      setTempData({ ...tempData, email: text });
      setStep(4);
      setTimeout(() => addMessage('bot', 'Cuéntanos brevemente el problema de tu equipo:'), 500);
    } else if (step === 4) {
      setTempData({ ...tempData, problem: text });
      setStep(5);
      setTimeout(() => addMessage('bot', 'Finalmente, déjanos tu número de WhatsApp para contactarte:'), 500);
    } else if (step === 5) {
      finalizeInquiry({ ...tempData, contact: text });
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000 }}>
      {/* Botón Flotante */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            width: '60px', height: '60px', borderRadius: '18px', 
            background: 'var(--primary)',
            boxShadow: '0 8px 24px rgba(0, 122, 255, 0.4)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', transition: 'all 0.3s'
          }}
          className="hover-scale"
        >
          <MessageCircle size={28} color="white" />
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="card animate-fade" style={{ 
          width: '350px', height: '480px', display: 'flex', flexDirection: 'column', 
          padding: 0, overflow: 'hidden', border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)', background: '#0d0d0d', borderRadius: '20px'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px 20px', 
            borderBottom: '1px solid var(--border)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'rgba(255,255,255,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', background: '#34c759', borderRadius: '50%' }} />
              <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>SOPORTE</h4>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', padding: '4px', opacity: 0.5 }}>
              <X size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef}
            style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ 
                alignSelf: m.role === 'bot' ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                background: m.role === 'bot' ? 'rgba(255,255,255,0.05)' : 'var(--primary)',
                padding: '12px 14px',
                borderRadius: '14px',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                color: 'white',
                border: m.role === 'bot' ? '1px solid var(--border)' : 'none'
              }}>
                {m.text}
              </div>
            ))}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button 
                    onClick={() => handleOption('Sebastián', '+593 99 297 7321')}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}
                  >
                    Sebastián
                  </button>
                  <button 
                    onClick={() => handleOption('Carlos', '+593 99 898 2716')}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}
                  >
                    Carlos
                  </button>
                </div>
                <button 
                  onClick={() => handleOption('Reportar Falla', null)}
                  className="primary"
                  style={{ padding: '12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem' }}
                >
                  📝 Reportar Falla Técnica
                </button>
              </div>
            )}
          </div>

          {/* Input Area */}
          {[2, 3, 4, 5].includes(step) && (
            <form 
              onSubmit={handleSubmit}
              style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px' }}
            >
              <input 
                type={step === 3 ? "email" : "text"}
                placeholder={step === 2 ? "Nombre..." : step === 3 ? "Tu correo..." : step === 4 ? "Problema..." : "WhatsApp..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ height: '40px', borderRadius: '10px', paddingLeft: '12px', fontSize: '0.85rem', background: '#141414' }}
                autoFocus
              />
              <button type="submit" className="primary" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
