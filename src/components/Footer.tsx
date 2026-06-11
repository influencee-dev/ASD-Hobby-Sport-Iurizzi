import React from "react";
import { Facebook, Instagram } from "lucide-react";

interface FooterProps {
  onOpenPrivacy: (initialTab: "privacy" | "cookies") => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 py-16 border-t border-gray-200 text-gray-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200 pb-12 mb-8">
          
          {/* Brand/Slogan column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <a href="#" onClick={handleScrollToTop} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
                <img
                  src="/images/logo.png"
                  alt="A.S.D. Hobby Sport Iurizzi Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-extrabold text-gray-900 group-hover:text-brand-red transition-colors duration-200">
                A.S.D. Hobby Sport Iurizzi
              </span>
            </a>
            <p className="font-sans text-sm text-gray-600">
              Associazione Sportiva Dilettantistica affiliata al CONI, FPI e Federkombat. 
              Promuoviamo sport sani, coordinazione psicomotoria, disciplina classica ed autocontrollo.
            </p>
            <div className="flex items-center space-x-4 pt-1">
              <a
                href="https://www.facebook.com/profile.php?id=100063559683497"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-red transition-colors duration-200 p-1.5 bg-white rounded-full border border-gray-200 shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/nicola.iurizzi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-red transition-colors duration-200 p-1.5 bg-white rounded-full border border-gray-200 shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Slogan Ticker column */}
          <div className="md:col-span-4 flex items-center justify-center md:justify-start">
            <div className="text-center md:text-left border-y md:border-y-0 md:border-l border-gray-200 py-4 md:py-0 md:pl-8 space-y-1">
              <span className="text-xs font-mono tracking-widest text-gray-500 block uppercase font-bold">Nostro Ideatario</span>
              <p className="font-display font-bold text-gray-950 text-md italic">
                “Sport, disciplina e rispetto.”
              </p>
            </div>
          </div>

          {/* Quick links block */}
          <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col items-center md:items-end justify-center md:justify-start gap-4 text-sm">
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenPrivacy("privacy");
              }}
              className="text-gray-600 hover:text-brand-red transition-colors duration-200 cursor-pointer font-medium"
            >
              Informativa Privacy & Cookies
            </button>
            <a
              href="#"
              onClick={handleScrollToTop}
              className="text-gray-600 hover:text-brand-red transition-colors duration-200 font-semibold"
            >
              Torna al Top ↑
            </a>
          </div>

        </div>

        {/* Closing details & credentials (humble & neat) */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0 text-center sm:text-left">
          <div>
            <p>© {currentYear} A.S.D. Hobby Sport Iurizzi. Tutti i diritti riservati.</p>
            <p className="text-gray-500 mt-1 font-mono text-[10px] font-semibold">
              Associazione iscritta al Registro Nazionale delle attività sportive dilettantistiche (RASD). C.F. 90034123456
            </p>
          </div>
          <div>
            <p className="text-gray-500">
              Sito sviluppato in conformità con la normativa europea GDPR (UE 2016/679).
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
