import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventos MISAU",
  description: "Eventos do Ministério da Saúde de Moçambique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
