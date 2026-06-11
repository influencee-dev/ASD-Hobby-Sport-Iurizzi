import React, { useState, useEffect } from "react";
import { Menu, X, Shield, Phone } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Corsi", href: "#corsi" },
    { name: "Metodo", href: "#metodo" },
    { name: "Valori", href: "#valori" },
    { name: "Preiscrizione", href: "#preiscrizione" },
    { name: "Contatti", href: "#contatti" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    try {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.warn("scrollIntoView fallito nell'ambiente iframe, fallback locale:", err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-md py-2"
          : "bg-[#fafafa]/90 backdrop-blur-sm border-b border-gray-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Company Name */}
          <a
            href="#"
            className="flex items-center space-x-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden shadow-sm border border-gray-200 group-hover:border-brand-red transition-all duration-300">
              <img
                src="/images/logo.png"
                alt="Logo Hobby Sport Iurizzi"
                className="object-contain w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight text-gray-950 group-hover:text-brand-red transition-colors duration-200 uppercase tracking-wider">
                Hobby Sport Iurizzi
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                A.S.D. Sport & Kick Boxing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="font-sans text-sm font-semibold text-gray-600 hover:text-brand-red transition-colors duration-200 py-2 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Header CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#preiscrizione"
              onClick={(e) => handleScrollTo(e, "#preiscrizione")}
              className="bg-brand-red hover:bg-brand-red-light text-white font-display text-sm font-bold tracking-wide uppercase px-5 py-2.5 rounded-md shadow transition-all duration-305 hover:scale-[1.03] active:scale-[0.98]"
            >
              Preiscriviti Ora
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red text-base w-11 h-11"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Apri menu principale</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 max-h-screen py-4 block" : "opacity-0 max-h-0 hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="block px-4 py-3 rounded-md text-base font-semibold text-gray-700 hover:text-brand-red hover:bg-gray-50 transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-150 px-4">
            <a
              href="#preiscrizione"
              onClick={(e) => handleScrollTo(e, "#preiscrizione")}
              className="w-full text-center block bg-brand-red hover:bg-brand-red-light text-white font-display font-bold uppercase tracking-wider py-3.5 rounded-md shadow transition-all duration-200"
            >
              Preiscriviti Ora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
