import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, ShieldCheck, Settings, ShieldAlert, Check, HelpCircle } from "lucide-react";

interface CookieConsentProps {
  onOpenPrivacyModal: (initialTab: "privacy" | "cookies") => void;
}

interface ConsentSettings {
  necessary: boolean;
  statistics: boolean;
  marketing: boolean;
}

export default function CookieConsent({ onOpenPrivacyModal }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    necessary: true,
    statistics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a selection
    const storedConsent = localStorage.getItem("hobby_sport_cookie_consent");
    if (!storedConsent) {
      // Delay slightly for high-quality psychological feedback and entrance flow
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (updatedSettings: ConsentSettings) => {
    localStorage.setItem("hobby_sport_cookie_consent", JSON.stringify(updatedSettings));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, statistics: true, marketing: true };
    setSettings(allAccepted);
    saveConsent(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const onlyNecessary = { necessary: true, statistics: false, marketing: false };
    setSettings(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const handleCustomSubmit = () => {
    saveConsent(settings);
  };

  const toggleSetting = (key: keyof ConsentSettings) => {
    if (key === "necessary") return; // Necessary cookies cannot be toggled off
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          id="cookie-consent-bar"
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 bg-white/95 border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md font-sans"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            
            {/* Core Info Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-50 border border-red-100 rounded-lg text-brand-red animate-pulse">
                  <Cookie className="w-5 h-5" />
                </div>
                <h4 className="font-display font-black text-gray-900 text-sm sm:text-base leading-tight">
                  Informativa sui Cookie e Gestione Consensi
                </h4>
              </div>

              <div className="text-xs sm:text-sm text-gray-650 leading-relaxed max-w-4xl space-y-2">
                <p>
                  A.S.D. Hobby Sport Orta Nova utilizza cookie sul proprio sito per garantirti una navigazione impeccabile, 
                  fornirti supporto sicuro nell'invio del modulo di preiscrizione ed effettuare statistiche di traffico in forma aggregata. 
                  Cliccando su <strong className="text-gray-900">“Accetta Tutti”</strong> acconsenti all'uso di tutti i cookie. 
                  Puoi gestire o modificare individualmente le autorizzazioni premendo su <strong className="text-gray-900">“Personalizza”</strong>.
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onOpenPrivacyModal("privacy")}
                    className="text-xs text-brand-red hover:text-brand-red-light font-bold underline transition-colors cursor-pointer"
                  >
                    Informativa Privacy Estesa (GDPR)
                  </button>
                  <span className="text-gray-300">•</span>
                  <button
                    onClick={() => onOpenPrivacyModal("cookies")}
                    className="text-xs text-brand-red hover:text-brand-red-light font-bold underline transition-colors cursor-pointer"
                  >
                    Dettaglio dei Cookie impiegati
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-2.5 flex-shrink-0 justify-center">
              <button
                onClick={() => setShowConfig(!showConfig)}
                className={`flex items-center justify-center space-x-1 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  showConfig
                    ? "bg-gray-150 border-gray-300 text-gray-800"
                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                <Settings className={`w-4 h-4 text-gray-500 ${showConfig ? 'rotate-90' : ''} transition-transform duration-300`} />
                <span>{showConfig ? "Chiudi Pannello" : "Personalizza"}</span>
              </button>

              <button
                onClick={handleAcceptNecessary}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-250 font-display text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all active:scale-95 text-center cursor-pointer"
              >
                Solo Necessari
              </button>

              <button
                onClick={handleAcceptAll}
                className="bg-brand-red hover:bg-brand-red-light text-white font-display text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all active:scale-95 shadow-md shadow-brand-red/10 hover:shadow-brand-red/20 text-center cursor-pointer"
              >
                Accetta Tutti
              </button>
            </div>

          </div>

          {/* Granular Preference Customization Drawer */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6 pt-6 border-t border-gray-200 max-w-7xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* 1. Necessary (always active) */}
                  <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl flex items-start justify-between space-x-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                        <h5 className="font-bold text-gray-900 text-xs sm:text-sm">Tecnici & Necessari</h5>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-normal">
                        Essenziali per il salvataggio dei consensi e il corretto funzionamento del modulo di preiscrizione.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold font-mono tracking-wide uppercase bg-green-100 text-green-800 rounded">
                        Sempre Attivo
                      </span>
                    </div>
                  </div>

                  {/* 2. Statistics Cookies */}
                  <div 
                    onClick={() => toggleSetting("statistics")} 
                    className={`p-4 rounded-xl border flex items-start justify-between space-x-4 cursor-pointer transition-all duration-200 ${
                      settings.statistics 
                        ? "bg-blue-50/50 border-blue-200 hover:border-blue-300" 
                        : "bg-gray-50/50 border-gray-150 hover:border-gray-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <Settings className="w-4 h-4 text-blue-600" />
                        <h5 className="font-bold text-gray-900 text-xs sm:text-sm">Analitici & Statistiche</h5>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-normal">
                        Permettono di raccogliere informazioni interamente anonime sul numero di visitatori e orari del sito.
                      </p>
                    </div>
                    <div className="flex-shrink-0 pt-1">
                      <button
                        type="button"
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          settings.statistics ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        aria-label="Statistiche Cookie Toggle"
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            settings.statistics ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* 3. Marketing/Newsletter preferences */}
                  <div 
                    onClick={() => toggleSetting("marketing")}
                    className={`p-4 rounded-xl border flex items-start justify-between space-x-4 cursor-pointer transition-all duration-200 ${
                      settings.marketing 
                        ? "bg-purple-50/50 border-purple-200 hover:border-purple-300" 
                        : "bg-gray-50/50 border-gray-150 hover:border-gray-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <ShieldAlert className="w-4 h-4 text-purple-600" />
                        <h5 className="font-bold text-gray-900 text-xs sm:text-sm">Social & Promozioni</h5>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-normal">
                        Permettono l'invio facoltativo dei contatti salvati a newsletter promozionali e tracciamento inserzioni.
                      </p>
                    </div>
                    <div className="flex-shrink-0 pt-1">
                      <button
                        type="button"
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          settings.marketing ? "bg-purple-600" : "bg-gray-300"
                        }`}
                        aria-label="Marketing Cookie Toggle"
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            settings.marketing ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Confirm config button row */}
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleCustomSubmit}
                    className="bg-gray-900 hover:bg-black text-white font-display text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg transition-transform duration-200 active:scale-95 shadow-md flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Conferma Preferenze Scelte</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
