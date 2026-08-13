"use client";

import { eventConfig } from "@/data";
import HomeHero from "@/components/event/HomeHero";
import EventInfoBanner from "@/components/event/EventInfoBanner";
import AboutEventSection from "@/components/event/AboutEventSection";
import ObjectivesSection from "@/components/event/ObjectivesSection";
import ExpectedResultsSection from "@/components/event/ExpectedResultsSection";
import MethodologySection from "@/components/event/MethodologySection";
import LocationSection from "@/components/event/LocationSection";
import HomeCtaSection from "@/components/event/HomeCtaSection";

export default function Home() {
  return (
    <>
      <title>Eventos MISAU - {eventConfig.shortTitle}</title>
      <meta name="description" content={eventConfig.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
        <HomeHero />
        <EventInfoBanner />
        <AboutEventSection />
        <ObjectivesSection />
        <ExpectedResultsSection />
        <MethodologySection />
        <LocationSection />
        <HomeCtaSection />
      </main>
    </>
  );
}
