import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'

export function useHotel(id) {
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    return api
      .get(`/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch(() => setError('Could not load this hotel right now.'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    let cancelled = false

    api
      .get(`/hotels/${id}`)
      .then((res) => {
        if (!cancelled) setHotel(res.data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load this hotel right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { hotel, loading, error, refresh }
}
