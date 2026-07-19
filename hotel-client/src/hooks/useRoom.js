import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'

export function useRoom(id) {
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setLoading(true)
    setError('')
    return api
      .get(`/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch(() => setError('Could not load this room right now.'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    let cancelled = false

    api
      .get(`/rooms/${id}`)
      .then((res) => {
        if (!cancelled) setRoom(res.data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load this room right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { room, loading, error, refresh }
}
