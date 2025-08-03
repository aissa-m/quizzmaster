import CategoryForm from '@/app/admin/categories/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="max-w-xl mx-auto bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🆕 Crear Categoría
      </h1>
      <CategoryForm />
    </div>
  );
}
