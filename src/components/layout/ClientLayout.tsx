"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OfflineBanner from "@/components/pwa/OfflineBanner";
import PublicEventStatusBanner from "@/components/event/PublicEventStatusBanner";
import { useOffline } from "@/hooks/useOffline";

const NO_HEADER_FOOTER_ROUTES = ["/Login", "/AdminDashboard", "/register"];

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const offline = useOffline();
  const hideHeaderFooter = NO_HEADER_FOOTER_ROUTES.includes(pathname);

  return (
    <>
      {!hideHeaderFooter && <OfflineBanner />}
      {!hideHeaderFooter && <PublicEventStatusBanner />}
      {!hideHeaderFooter && <Header offline={offline} />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
