import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
            <p className="text-sm">
            Copyright &copy; {new Date().getFullYear()} MISAU. Todos os direitos reservados.
            </p>
            <Link
             href="https://misau.gov.mz" className="text-blue-400 hover:underline mt-2 block">
            Política de Privacidade
            </Link>
        </div>
        </footer>
    );
}