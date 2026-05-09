import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import FAQManager from '../components/FAQManager'
import UnansweredQueries from '../components/UnansweredQueries'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('faqs')

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#3b82f6'
          }}>
            KnowledgeBase Bot Admin
          </h1>
          <button
            onClick={handleSignOut}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 2rem'
      }}>
        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '0.5rem'
        }}>
          <button
            onClick={() => setActiveTab('faqs')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === 'faqs' ? '#3b82f6' : 'transparent',
              color: activeTab === 'faqs' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            FAQs Management
          </button>
          <button
            onClick={() => setActiveTab('unanswered')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === 'unanswered' ? '#3b82f6' : 'transparent',
              color: activeTab === 'unanswered' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            Unanswered Queries
          </button>
        </div>

        {/* Tab Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '2rem'
        }}>
          {activeTab === 'faqs' ? (
            <div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Manage FAQs
              </h2>
              <FAQManager />
            </div>
          ) : (
            <div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Unanswered Queries
              </h2>
              <UnansweredQueries />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
