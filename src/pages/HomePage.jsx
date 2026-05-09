import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Chatbot from '../components/Chatbot';

function HomePage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  useEffect(() => {
    fetchFAQs();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Gradient Background Effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              💡
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--text-primary)'
            }}>
              KnowledgeBase Bot
            </h1>
          </div>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Home
            </a>
            <a 
              href="#faqs" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              FAQs
            </a>
            <a 
              href="#chat" 
              onClick={(e) => {
                e.preventDefault();
                setShowChat(true);
                setTimeout(() => {
                  document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Chat
            </a>
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          Your Smart<br />
          Knowledge Assistant
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Get instant answers powered by AI. Our intelligent knowledge base learns from your FAQs 
          to provide accurate, helpful responses to your customers 24/7.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
          <button 
            onClick={() => setShowChat(!showChat)}
            className="btn-primary"
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            Start Chatting →
          </button>
          <button 
            onClick={() => {
              const faqSection = document.getElementById('faq-section');
              if (faqSection) faqSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary" 
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            Browse FAQs
          </button>
        </div>

        {/* Chat Preview */}
        <div id="chat-section" style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-color)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Window Controls */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }} />
          </div>

          {showChat ? (
            <div style={{
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              padding: '1.5rem',
              minHeight: '400px'
            }}>
              <Chatbot faqs={faqs} initialMessage={initialMessage} />
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '2rem',
              minHeight: '400px'
            }}>
              {/* Sidebar */}
              <div style={{
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    💡
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>KB Bot</span>
                  <span style={{
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>AI</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Menu</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div 
                      onClick={() => {
                        setShowChat(true);
                        setInitialMessage('ask-questions');
                      }}
                      style={{ 
                        padding: '0.5rem', 
                        color: 'var(--text-primary)', 
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'var(--bg-primary)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      💬 Ask Questions
                    </div>
                    <div 
                      onClick={() => {
                        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{ 
                        padding: '0.5rem', 
                        color: 'var(--text-secondary)', 
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--bg-primary)';
                        e.target.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      📚 Browse FAQs
                    </div>
                    <div 
                      onClick={() => {
                        setShowChat(true);
                        setInitialMessage('quick-start');
                      }}
                      style={{ 
                        padding: '0.5rem', 
                        color: 'var(--text-secondary)', 
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--bg-primary)';
                        e.target.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      ⚡ Quick Start
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Chat Area */}
              <div style={{
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>
                  Start a Conversation
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem'
                }}>
                  Click "Get Started" to begin chatting with our AI assistant
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  width: '100%',
                  maxWidth: '500px'
                }}>
                  {['💡', '🚀', '📚', '⚡'].map((emoji, index) => (
                    <div key={index} style={{
                      background: 'var(--bg-secondary)',
                      padding: '2rem',
                      borderRadius: '12px',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}>
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FAQ Section */}
      <section id="faq-section" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Frequently Asked Questions
        </h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading FAQs...
          </div>
        ) : faqs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            padding: '3rem',
            background: 'var(--bg-secondary)',
            borderRadius: '12px'
          }}>
            <p style={{ fontSize: '1.2rem' }}>No FAQs available yet.</p>
            <p>Start chatting with SagotBuddy to get instant answers!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {faqs.map((faq) => (
              <div key={faq.id} style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--accent-primary)' }}>Q:</span>
                  {faq.question}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>A:</span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about-section" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          About KnowledgeBase Bot
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Feature Cards */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Instant Responses
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Get immediate answers to your questions powered by Google's advanced Gemini AI technology.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Smart Knowledge Base
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Our AI learns from your FAQs to provide accurate, contextual responses tailored to your needs.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Secure & Private
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Your conversations are secure and we prioritize your privacy with enterprise-grade security.
            </p>
          </div>
        </div>

        {/* About Content */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '3rem',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.1rem',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            KnowledgeBase Bot is your intelligent assistant designed to streamline customer support 
            and information access. Powered by cutting-edge AI technology, SagotBuddy understands 
            your questions and provides accurate, helpful responses instantly.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: 'var(--accent-primary)' 
              }}>
                24/7
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>Available</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: 'var(--accent-primary)' 
              }}>
                60+
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>Queries/Min</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: 'var(--accent-primary)' 
              }}>
                100%
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>Free</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
