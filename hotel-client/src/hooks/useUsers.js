import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    return api
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch(() => setError('Could not load users right now.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let cancelled = false

    api
      .get('/users')
      .then((res) => {
        if (!cancelled) setUsers(res.data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load users right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { users, loading, error, refresh }
}
