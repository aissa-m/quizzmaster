// app/admin/questions/DeleteButton.tsx
"use client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BotonBorrar({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm("¿Estás seguro de eliminar esta pregunta?");
    if (!ok) return;

    await fetch(`/api/admin/questions/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer px-3 py-1 rounded-xl bg-red-500 hover:bg-red-600 text-white transition text-xs"
    >
      Eliminar
      {/* <Trash /> */}
    </button>
  );
}

