import { useState, useEffect } from 'react'
import api from '../services/api'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await api.get(url)
        setData(response.data)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        setError(err.message || 'Erro ao carregar dados')
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchData()
    }
  }, [url])

  return { data, loading, error }
}
