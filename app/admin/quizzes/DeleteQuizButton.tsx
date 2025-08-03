'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface Props {
  id: number
}

export default function DeleteQuizButton({ id }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDelete = () => {
    const confirmed = confirm('¿Estás seguro de que quieres borrar este quiz?')
    if (!confirmed) return

    startTransition(async () => {
      const res = await fetch(`/api/admin/quizzes/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        setError('Error al eliminar el quiz')
        return
      }

      router.refresh()
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow backdrop-blur-md transition text-sm font-medium"
    >
     <Trash2 className="w-4 h-4" /> 
      Borrar
    </button>
  )
}
