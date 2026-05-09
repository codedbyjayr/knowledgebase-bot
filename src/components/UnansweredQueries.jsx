import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function UnansweredQueries() {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all unanswered queries
  const fetchQueries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('unanswered_queries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setQueries(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueries()
  }, [])

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this query?')) return

    try {
      const { error } = await supabase
        .from('unanswered_queries')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchQueries()
    } catch (error) {
      alert('Error deleting query: ' + error.message)
    }
  }

  if (loading) return <div>Loading unanswered queries...</div>
  if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>

  return (
    <div>
      {queries.length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
          No unanswered queries yet. All questions have been addressed!
        </p>
      ) : (
        <div>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Total unanswered queries: {queries.length}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {queries.map((query) => (
              <div
                key={query.id}
                style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: '#1f2937',
                    marginBottom: '0.25rem',
                    fontWeight: '500'
                  }}>
                    {query.query_text}
                  </p>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    Asked on {new Date(query.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(query.id)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginLeft: '1rem'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
