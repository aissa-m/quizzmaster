'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface CategoryFormProps {
  initialName?: string
  id?: number
}

export default function CategoryForm({ initialName = '', id }: CategoryFormProps) {
  const [name, setName] = useState(initialName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(
        id
          ? `/api/admin/categories/${id}`
          : '/api/admin/categories',
        {
          method: id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        }
      )
      if (!res.ok) {
        const { error: msg } = await res.json()
        throw new Error(msg || 'Error desconocido')
      }
      router.push('/admin/categories')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border-white/20 w-full px-3 py-2 rounded bg-white/10 focus:bg-white/20 "
          required
        />
      </div>
      {error && <p className="text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
      >
        {id ? 'Actualizar' : 'Crear'} Categoría
      </button>
    </form>
  )
}
