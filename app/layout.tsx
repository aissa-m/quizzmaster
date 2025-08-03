import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuizZone',
  description: 'Plataforma de quizzes educativos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gradient-to-br from-sky-900 to-indigo-950 text-white`}>
        <Providers>
          <NavBar />
          <div className="pt-20 min-h-screen bg-gradient-to-br from-sky-900 to-indigo-950"> {/* deja espacio para el navbar */}
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
