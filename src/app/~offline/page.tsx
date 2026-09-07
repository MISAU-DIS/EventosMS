import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-misau-50 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-misau-medium mb-2">
        Modo offline
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-misau-dark mb-3">
        Sem ligação à internet
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        Esta página ainda não está disponível offline. Volte às secções que já
        visitou com internet ou tente novamente quando estiver online.
      </p>
      <Link
        href="/"
        className="bg-misau-gold hover:bg-misau-medium text-white px-6 py-3 rounded-full font-semibold transition-colors"
      >
        Ir para o início
      </Link>
    </main>
  );
}
