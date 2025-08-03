import prisma from "@/app/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      attempts: {
        include: { quiz: true },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-white">👥 Usuarios Registrados</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const totalAttempts = user.attempts.length;
          const avgScore =
            totalAttempts > 0
              ? (
                  user.attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts
                ).toFixed(2)
              : "—";

          const lastAttempt = user.attempts[0]?.createdAt
            ? new Date(user.attempts[0].createdAt).toLocaleString()
            : "—";

          return (
            <div
              key={user.id}
              className="p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white shadow-lg"
            >
              <h2 className="text-lg font-bold mb-1">{user.name}</h2>
              <p className="text-sm text-white/80">{user.email}</p>
              <p className="text-sm mt-2">
                Rol: <span className="font-semibold">{user.role}</span>
              </p>
              <p className="text-sm">
                Intentos: <span className="font-semibold">{totalAttempts}</span>
              </p>
              <p className="text-sm">
                Promedio de puntuación: <span className="font-semibold">{avgScore}</span>
              </p>
              <p className="text-sm">
                Último intento: <span className="font-semibold">{lastAttempt}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
