import { useState, useEffect } from 'react';

function Chatbot({ faqs = [], initialMessage = '' }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle initial message when component mounts or initialMessage changes
  useEffect(() => {
    if (initialMessage === 'ask-questions') {
      setChatHistory([{
        type: 'bot',
        content: 'Hi! I\'m SagotBuddy 👋 What questions can I help you with today? Feel free to ask me anything about our services, features, or how to use this system.'
      }]);
    } else if (initialMessage === 'quick-start') {
      setChatHistory([{
        type: 'bot',
        content: '🚀 Quick Start Guide:\n\n1. Type your question in the chat box below\n2. Press Enter or click Send\n3. I\'ll find the best answer from our knowledge base\n\nTry asking:\n• "What is SagotBuddy?"\n• "How do I use the chatbot?"\n• "What are your business hours?"\n\nI\'m here to help!'
      }]);
    }
  }, [initialMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.PROD 
        ? '/.netlify/functions/chat'
        : 'http://localhost:3001/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, faqs })
      });

      const data = await response.json();
      
      if (response.ok) {
        setChatHistory(prev => [...prev, { type: 'bot', content: data.response }]);
      } else {
        setChatHistory(prev => [...prev, { 
          type: 'bot', 
          content: 'I\'m having trouble connecting to my AI service. Please try again later.' 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        content: 'I\'m having trouble connecting. Please check your connection and try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '400px' }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        marginBottom: '1rem',
        maxHeight: '500px'
      }}>
        {chatHistory.length === 0 ? (
          <div style={{ 
            color: 'var(--text-secondary)', 
            textAlign: 'center',
            padding: '3rem 0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Hi! I'm SagotBuddy 👋
            </p>
            <p style={{ fontSize: '0.95rem' }}>
              I'm your friendly AI assistant here to help you find answers quickly. 
              Ask me anything about our knowledge base, and I'll do my best to help!
            </p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} style={{
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              {msg.type === 'bot' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>
                  💡
                </div>
              )}
              <div style={{
                maxWidth: '70%',
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: msg.type === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: msg.type === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)',
                boxShadow: msg.type === 'user' ? '0 4px 12px rgba(0, 212, 255, 0.2)' : 'none'
              }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.content}</p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  fontSize: '0.75rem', 
                  opacity: 0.6 
                }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.type === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>
                  👤
                </div>
              )}
            </div>
          ))
        )}
        {loading && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              animation: 'pulse 2s infinite'
            }}>
              💡
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-tertiary)'
            }}>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <span style={{ animation: 'bounce 1.4s infinite' }}>●</span>
                <span style={{ animation: 'bounce 1.4s infinite 0.2s' }}>●</span>
                <span style={{ animation: 'bounce 1.4s infinite 0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        gap: '0.75rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            outline: 'none',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={loading || !message.trim() ? '' : 'btn-primary'}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading || !message.trim() ? 'var(--bg-tertiary)' : '',
            color: loading || !message.trim() ? 'var(--text-secondary)' : '',
            border: 'none',
            borderRadius: '8px',
            cursor: loading || !message.trim() ? 'not-allowed' : 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? 'Sending...' : 'Send'} 
          {!loading && <span>→</span>}
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default Chatbot;
