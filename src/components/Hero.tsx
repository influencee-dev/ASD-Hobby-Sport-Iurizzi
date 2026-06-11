import { PhoneCall, CalendarPlus, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollSmoothTo = (href: string) => {
    try {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.warn("scrollIntoView fallito nell'ambiente iframe, fallback locale:", err);
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-gray-50/50 to-[#fafafa]">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-brand-red/3 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Centered Column Container */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Tagline / Micro Badge */}
          <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full w-fit">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red-light"></span>
            </span>
            <span className="text-xs font-mono font-semibold text-brand-red-dark tracking-wider uppercase">
              A.S.D. HOBBY SPORT ORTA NOVA • Preiscrizioni Aperte 2027/2028
            </span>
          </div>

          {/* Main Title Heading */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-gray-900 tracking-tight leading-[1.1]">
              Sport & Kick Boxing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-brand-red to-brand-red-dark">
                a Orta Nova (Fg)
              </span>
            </h1>
            
            <p className="font-sans text-base sm:text-lg text-gray-750 leading-relaxed max-w-2xl mx-auto">
              Istruttori federali qualificati per un movimento completo: <strong className="text-gray-950">Kick Boxing</strong>, <strong className="text-gray-950">Functional Training</strong>, <strong className="text-gray-950">Ginnastica Posturale</strong> e <strong className="text-gray-950">Avviamento allo Sport</strong>. Crescita e benessere guidati dai Maestri <strong className="text-gray-950 font-bold">Nicola e Fabio</strong>.
            </p>
          </div>

          {/* Call to Actions (CTAs) - Fully Centered, Responsive and Identical in Size */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center items-center w-full max-w-md sm:max-w-2xl mx-auto">
            <button
              onClick={() => scrollSmoothTo("#preiscrizione")}
              className="w-full sm:w-80 flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-light text-white font-display text-base font-bold tracking-wide uppercase px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <CalendarPlus className="w-5 h-5 flex-shrink-0" />
              <span>Compila la preiscrizione</span>
            </button>

            <button
              onClick={() => scrollSmoothTo("#contatti")}
              className="w-full sm:w-80 flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 font-display text-base font-bold tracking-wide uppercase px-6 py-4 rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-brand-red flex-shrink-0" />
              <span>Parla con i Maestri</span>
            </button>
          </div>

          {/* Quick Microcopy Slogan Tickers - Centered with text alignment inside */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full">
            <div className="flex items-start space-x-3 bg-white border border-gray-200 shadow-sm p-4 rounded-xl text-left">
              <span className="text-brand-red font-mono text-sm font-bold">“</span>
              <p className="text-sm text-gray-650 leading-snug">
                <span className="font-bold text-gray-800">Autocontrollo reale:</span> Non insegniamo ad attaccare o sopraffare. Insegniamo prima di tutto a controllarsi.
              </p>
            </div>
            <div className="flex items-start space-x-3 bg-white border border-gray-200 shadow-sm p-4 rounded-xl text-left">
              <span className="text-brand-red font-mono text-sm font-bold">“</span>
              <p className="text-sm text-gray-650 leading-snug">
                <span className="font-bold text-gray-800">La forza interiore:</span> La tolleranza e la pazienza sono la vera forza dell'atleta.
              </p>
            </div>
          </div>

          {/* Large and Impressive Visual Card Container placed BELOW block */}
          <div className="relative w-full max-w-5xl mt-8 rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-200 group">
            {/* Aspect logic - wide elegant cinematic view on larger screens */}
            <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.2/1] w-full">
              <img
                src="/images/palestra.png"
                alt="Allenamento ragazzi in palestra a Orta Nova"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay with elegant linear gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Floating Classic Logo stamp in card corner */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur shadow-xl rounded-xl p-2.5 flex items-center space-x-3 max-w-[200px] border border-gray-200 select-none">
              <img
                src="/images/logo.png"
                alt="Hobby Sport Orta Nova emblem"
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-mono font-extrabold text-gray-900 leading-tight">Hobby Sport</span>
                <span className="text-[9px] uppercase font-mono text-gray-500">Orta Nova (Fg)</span>
              </div>
            </div>

            {/* Floating quote pill inside image */}
            <div className="absolute top-4 left-4 bg-white/90 shadow backdrop-blur-md px-3.5 py-1.5 rounded-md border border-gray-200 text-[11px] font-mono tracking-wider text-brand-red-dark font-bold uppercase select-none">
              ⚙️ Valori & Disciplina
            </div>
          </div>

        </div>

        {/* Scroll Indicator Down */}
        <div className="flex justify-center mt-12 lg:mt-20">
          <button
            onClick={() => scrollSmoothTo("#intro")}
            className="flex flex-col items-center space-y-1.5 text-gray-400 hover:text-brand-red transition-colors duration-200 group cursor-pointer"
            aria-label="Scorri verso il basso"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scopri di più</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-gray-400 group-hover:text-brand-red" />
          </button>
        </div>

      </div>
    </section>
  );
}
