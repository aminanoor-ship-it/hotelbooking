import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'

export function useMyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    return api
      .get('/bookings/my')
      .then((res) => setBookings(res.data))
      .catch(() => setError('Could not load your bookings right now.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let cancelled = false

    api
      .get('/bookings/my')
      .then((res) => {
        if (!cancelled) setBookings(res.data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load your bookings right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { bookings, loading, error, refresh }
}
