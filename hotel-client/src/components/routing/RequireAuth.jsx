import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export default function RequireAuth({ children, message = 'Please login to continue' }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" state={{ message, from: location.pathname }} replace />
  }

  return children
}
