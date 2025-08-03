'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from "lucide-react";

interface DeleteCategoryButtonProps {
    id: number;
}

export default function DeleteCategoryButton({ id }: DeleteCategoryButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!confirm('¿Seguro que deseas borrar esta categoría?')) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error borrando categoría');
            router.push('/admin/categories');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            {error && <p className="text-red-400 mb-2">{error}</p>}
            <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow backdrop-blur-md transition text-sm font-medium disabled:opacity-50"
            >
                <Trash2 className="w-4 h-4" />
                <span>Borrar</span>
            </button>

        </div>
    );
}
