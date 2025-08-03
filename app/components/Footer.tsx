export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-sky-950/80 border-t border-white/10 text-sm text-white/60">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-white">QuizZone</h4>
          <p className="text-xs mt-2 text-white/50">
            Plataforma educativa para aprender y divertirte con quizzes interactivos.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Navegación</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="/quizzes" className="hover:underline">Quizzes</a></li>
            <li><a href="#como-funciona" className="hover:underline">¿Cómo funciona?</a></li>
            <li><a href="#contact" className="hover:underline">Contacto</a></li>
            <li><a href="/profile" className="hover:underline">Perfil</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Síguenos</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
          </ul>
          <p className="mt-4 text-xs text-white/50">
            © {new Date().getFullYear()} QuizZone · <a href="#" className="hover:underline">Política de privacidad</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
