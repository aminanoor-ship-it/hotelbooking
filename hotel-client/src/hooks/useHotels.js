import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'

export function useHotels(params) {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const paramsKey = JSON.stringify(params || {})

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    return api
      .get('/hotels', { params: JSON.parse(paramsKey) })
      .then((res) => setHotels(res.data))
      .catch(() => setError('Could not load hotels right now.'))
      .finally(() => setLoading(false))
  }, [paramsKey])

  useEffect(() => {
    let cancelled = false

    api
      .get('/hotels', { params: JSON.parse(paramsKey) })
      .then((res) => {
        if (!cancelled) setHotels(res.data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load hotels right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [paramsKey])

  return { hotels, loading, error, refresh }
}
