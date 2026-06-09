import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ValuesSection from "./components/ValuesSection";
import TargetsSection from "./components/TargetsSection";
import MethodSection from "./components/MethodSection";
import PhilosophySection from "./components/PhilosophySection";
import BenefitsSection from "./components/BenefitsSection";
import FormPreiscrizione from "./components/FormPreiscrizione";
import ContactsSection from "./components/ContactsSection";
import Footer from "./components/Footer";
import PrivacyAndCookiesModal from "./components/PrivacyAndCookiesModal";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [privacyTab, setPrivacyTab] = useState<"privacy" | "cookies">("privacy");

  const handleOpenPrivacy = (tab: "privacy" | "cookies") => {
    setPrivacyTab(tab);
    setIsPrivacyOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] antialiased overflow-x-hidden selection:bg-brand-red selection:text-white">
      {/* 1. Header Navigation */}
      <Header />

      {/* Main Structural Elements */}
      <main>
        {/* 2. Hero Section Banner */}
        <Hero />

        {/* 3. Intro core values ("Molto più di un corso") */}
        <ValuesSection />

        {/* 4. Target audicences ("Per chi sono i corsi") */}
        <TargetsSection />

        {/* 5. Pedagogical Methods ("Il metodo") */}
        <MethodSection />

        {/* 6. Important Philosophy statement ("La forza vera") */}
        <PhilosophySection />

        {/* 7. Benefits section ("Perché scegliere noi") */}
        <BenefitsSection />

        {/* 8. Registration Flow lead collector ("Iscriviti o prenota") */}
        <FormPreiscrizione />

        {/* 9. Contacts directory ("Vuoi saperne di più") */}
        <ContactsSection />
      </main>

      {/* 10. Footer Section */}
      <Footer onOpenPrivacy={handleOpenPrivacy} />

      {/* 11. Centralized Privacy Policy & Cookie Policy Centre */}
      <PrivacyAndCookiesModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        initialTab={privacyTab}
      />

      {/* 12. Interactive Cookie Consent & Permissions on load */}
      <CookieConsent onOpenPrivacyModal={handleOpenPrivacy} />
    </div>
  );
}
