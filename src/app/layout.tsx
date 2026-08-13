import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventos MISAU",
  description: "Eventos do Ministério da Saúde de Moçambique",
  icons: {
    icon: [{ url: "/Emblem_of_Mozambique.svg", type: "image/svg+xml" }],
    apple: [{ url: "/Emblem_of_Mozambique.svg", type: "image/svg+xml" }],
  },
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
