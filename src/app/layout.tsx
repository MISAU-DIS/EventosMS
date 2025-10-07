"use client";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import { usePathname } from 'next/navigation';
import { Toaster } from "react-hot-toast";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  const pathname = usePathname();
  const noHeaderFooterRoutes = ['/Login', '/AdminDashboard', '/register'];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {!hideHeaderFooter && <Header />}
        {children}
        <Toaster position="top-right" />
        {!hideHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
