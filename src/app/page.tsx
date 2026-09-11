"use client";

import { eventConfig } from "@/data";
import { useActiveEventStatus } from "@/hooks/useActiveEventStatus";
import HomeHero from "@/components/event/HomeHero";
import EventInfoBanner from "@/components/event/EventInfoBanner";
import AboutEventSection from "@/components/event/AboutEventSection";
import ObjectivesSection from "@/components/event/ObjectivesSection";
import ExpectedResultsSection from "@/components/event/ExpectedResultsSection";
import MethodologySection from "@/components/event/MethodologySection";
import LocationSection from "@/components/event/LocationSection";
import HomeCtaSection from "@/components/event/HomeCtaSection";
import NoActiveEventNotice from "@/components/event/NoActiveEventNotice";
import PageContainer from "@/components/layout/PageContainer";

export default function Home() {
  const { loading, hasActiveEvent, event } = useActiveEventStatus();

  return (
    <>
      <title>{`Eventos MISAU - ${eventConfig.shortTitle}`}</title>
      <meta name="description" content={eventConfig.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
        {loading ? (
          <PageContainer className="py-20 text-center text-gray-600">
            A carregar...
          </PageContainer>
        ) : !hasActiveEvent ? (
          <>
            <PageContainer className="pt-10 pb-6">
              <NoActiveEventNotice />
            </PageContainer>
          </>
        ) : (
          <>
            <HomeHero />
            <EventInfoBanner />
            {event && (
              <PageContainer className="pb-2">
                <p className="text-center text-sm text-gray-600">
                  Evento activo: <span className="font-semibold text-misau-medium">{event.title}</span>
                </p>
              </PageContainer>
            )}
            <AboutEventSection />
            <ObjectivesSection />
            <ExpectedResultsSection />
            <MethodologySection />
            <LocationSection />
            <HomeCtaSection />
          </>
        )}
      </main>
    </>
  );
}
