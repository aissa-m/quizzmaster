'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  categories: { id: number; name: string }[];
  initialData?: {
    id: number;
    title: string;
    description: string;
    categoryId: number;
  };
}

export default function QuizForm({ categories, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch(
      isEdit ? `/api/admin/quizzes/${initialData!.id}` : '/api/admin/quizzes',
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, categoryId }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      setError('Error al guardar el quiz');
      return;
    }

    router.push('/admin/quizzes');
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && <p className="text-red-400 font-medium">{error}</p>}

      <div className="space-y-1">
        <label className="block text-sm font-medium">Título</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Categoría</label>
        <select
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition disabled:opacity-50"
        >
          {isEdit ? '💾 Guardar Cambios' : '➕ Crear Quiz'}
        </button>
      </div>
    </form>
  );
}
