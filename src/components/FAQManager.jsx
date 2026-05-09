import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function FAQManager() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState(null)
  const [formData, setFormData] = useState({ question: '', answer: '' })

  // Fetch all FAQs
  const fetchFaqs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFaqs(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])


  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      let faqId
      
      if (editingFaq) {
        // Update existing FAQ
        const { error } = await supabase
          .from('faqs')
          .update({
            question: formData.question,
            answer: formData.answer
          })
          .eq('id', editingFaq.id)

        if (error) throw error
        faqId = editingFaq.id
      } else {
        // Create new FAQ
        const { data, error } = await supabase
          .from('faqs')
          .insert([{
            question: formData.question,
            answer: formData.answer
          }])
          .select()

        if (error) throw error
        faqId = data[0].id
      }


      // Reset form and refresh list
      setFormData({ question: '', answer: '' })
      setShowForm(false)
      setEditingFaq(null)
      fetchFaqs()
    } catch (error) {
      alert('Error saving FAQ: ' + error.message)
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchFaqs()
    } catch (error) {
      alert('Error deleting FAQ: ' + error.message)
    }
  }

  // Handle edit
  const handleEdit = (faq) => {
    setEditingFaq(faq)
    setFormData({ question: faq.question, answer: faq.answer })
    setShowForm(true)
  }

  // Cancel form
  const handleCancel = () => {
    setFormData({ question: '', answer: '' })
    setEditingFaq(null)
    setShowForm(false)
  }

  if (loading) return <div>Loading FAQs...</div>
  if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>

  return (
    <div>
      {/* Add/Edit Form */}
      {showForm ? (
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937'
          }}>
            {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Question
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Answer
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {editingFaq ? 'Update FAQ' : 'Add FAQ'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '1rem'
          }}
        >
          + Add New FAQ
        </button>
      )}

      {/* FAQs List */}
      {faqs.length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
          No FAQs yet. Click "Add New FAQ" to create your first one.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              style={{
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ marginBottom: '0.75rem' }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  Q: {faq.question}
                </h4>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.5'
                }}>
                  A: {faq.answer}
                </p>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={() => handleEdit(faq)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
