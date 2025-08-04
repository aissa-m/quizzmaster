// app/admin/categories/[id]/edit/EditPage.tsx
import CategoryForm from '../../CategoryForm';
import DeleteCategoryButton from '../../DeleteCategoryButton';

interface Props {
  id: number;
  name: string;
}

export default function EditPage({ id, name }: Props) {
  return (
    <div className="max-w-xl mx-auto bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-lg text-white space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        ✏️ Editar Categoría
      </h1>

      <CategoryForm initialName={name} id={id} />

      <div className="pt-4 border-t border-white/10">
        <DeleteCategoryButton id={id} />
      </div>
    </div>
  );
}
