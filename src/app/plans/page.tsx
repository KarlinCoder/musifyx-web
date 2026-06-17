import { PricingTable } from "@clerk/nextjs";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes | Musify",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background-dark text-text">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/6">
        <Link href="/" className="font-primary text-2xl font-bold tracking-wide">
          Musify
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-text-muted hover:text-white transition font-secondary"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-full transition font-secondary"
          >
            Crear cuenta
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-primary font-bold mb-3">
            Elige tu plan
          </h1>
          <p className="text-text-muted text-lg font-secondary max-w-xl mx-auto">
            Accede a millones de canciones. Empieza gratis o desbloquea todo con
            Premium.
          </p>
        </div>

        <div className="[&_.clerk-components]:!bg-transparent [&_[data-testid='pricing-table']]:!bg-transparent">
          <PricingTable />
        </div>
      </div>

      <footer className="border-t border-white/6 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © 2026 Musify. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="/" className="hover:text-white transition">
              Inicio
            </Link>
            <a href="#" className="hover:text-white transition">
              Ayuda
            </a>
            <a href="#" className="hover:text-white transition">
              Términos
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
