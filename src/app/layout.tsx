import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import WarmOfflineCache from "@/components/pwa/WarmOfflineCache";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventos MISAU",
  description: "Eventos do Ministério da Saúde de Moçambique",
  applicationName: "LI CCS — MISAU",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LI CCS",
  },
  icons: {
    icon: [{ url: "/Emblem_of_Mozambique.svg", type: "image/svg+xml" }],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c59b27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased overflow-x-hidden">
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
