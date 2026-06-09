import { ShieldAlert, Fingerprint } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section id="valori" className="py-28 bg-[#f8fafc] relative border-t border-b border-gray-150 overflow-hidden">
      {/* Radiant Glowing Red accent orb inside light slate background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/3 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Shield Indicator Accent */}
        <div className="mx-auto w-16 h-16 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mb-8">
          <ShieldAlert className="w-8 h-8 text-brand-red animate-pulse" />
        </div>

        {/* Section Main Title */}
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto mb-8">
          “La forza vera è sapersi controllare”
        </h2>

        {/* Divider line */}
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-brand-red to-transparent mx-auto mb-8"></div>

        {/* Detailed Philosophy Paragraph block */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="font-sans text-lg sm:text-xl text-gray-800 leading-relaxed font-semibold">
            Alla <strong className="text-gray-950 font-bold">Hobby Sport Orta Nova</strong> lo sport non viene mai 
            insegnato o vissuto come uno strumento di aggressione o esibizione. 
            La palestra, la kick boxing e l'allenamento motorio diventano strumenti ad elevato valore pedagogico.
          </p>

          <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed">
            I ragazzi imparano che la violenza non è mai la risposta ad alcun conflitto. 
            La forza fisica deve e può essere coltivata esclusivamente per costruire una solida auto-difesa, 
            per imparare a gestire le avversità fisiche e verbali del mondo esterno, e per maturare un sincero rispetto 
            delle differenze.
          </p>
        </div>

        {/* Highlight quote ticker elements */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow">
            <Fingerprint className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-display font-bold text-base text-gray-950 mb-1">
                La forza è responsabilità
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Chi conosce i colpi sa esattamente quanto possono fare del male. Per questo gli allievi acquisiscono la pazienza e l'obbligo civile di non colpire mai fuori dal ring.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow">
            <Fingerprint className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-display font-bold text-base text-gray-950 mb-1">
                Il ring è rispetto reciproco
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ogni sparring e allenamento è protetto, guidato e si apre e chiude con una stretta di mano sincera e grata. Non ci sono nemici, ci sono solo compagni.
              </p>
            </div>
          </div>
        </div>

        {/* Key microcopy label */}
        <p className="mt-12 text-xs font-mono tracking-widest text-brand-red-dark font-bold uppercase">
          🛡️ “COSTRUIAMO PERSONE SICURE E RISPETTOSE DI SE STESSI.”
        </p>

      </div>
    </section>
  );
}
