import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import SignIn from './pages/SignIn'
import AdminDashboard from './pages/AdminDashboard'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        Loading...
      </div>
    )
  }

  // Check if admin routes should be enabled
  const adminEnabled = import.meta.env.VITE_ENABLE_ADMIN !== 'false';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {adminEnabled && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute session={session}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </>
        )}
        {/* Fallback for production - redirect admin routes to home */}
        {!adminEnabled && (
          <>
            <Route path="/signin" element={<Navigate to="/" />} />
            <Route path="/admin" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
