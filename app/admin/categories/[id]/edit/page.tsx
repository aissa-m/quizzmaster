import prisma from '@/app/lib/prisma';
import CategoryForm from '../../CategoryForm';
import DeleteCategoryButton from '../../DeleteCategoryButton';

interface PageProps {
  params: {
    id: string;
  };
}


export default async function EditCategoryPage({ params }: PageProps) {
  const id = Number(params.id);
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return (
      <p className="text-center text-red-400 mt-10 text-lg font-semibold">
        ❌ Categoría no encontrada
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-lg text-white space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        ✏️ Editar Categoría
      </h1>

      <CategoryForm initialName={category.name} id={id} />

      <div className="pt-4 border-t border-white/10">
        <DeleteCategoryButton id={id} />
      </div>
    </div>
  );
}
