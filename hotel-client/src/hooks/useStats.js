import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'

export function useStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    return api
      .get('/stats')
      .then((res) => setStats(res.data))
      .catch(() => setError('Could not load statistics right now.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let cancelled = false

    api
      .get('/stats')
      .then((res) => {
        if (!cancelled) setStats(res.data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load statistics right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { stats, loading, error, refresh }
}
