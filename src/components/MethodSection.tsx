import { METHOD_STEPS } from "../data";

export default function MethodSection() {
  return (
    <section id="metodo" className="py-24 bg-white border-t border-gray-150 relative">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-red/3 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-red font-mono text-sm uppercase tracking-widest font-bold text-center block">
            • Metodologia Didattica •
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Allenamento, tecnica e valori
          </h2>
          <div className="h-1 w-16 bg-brand-red mx-auto rounded"></div>
          <p className="font-sans text-gray-700 leading-relaxed text-base sm:text-lg">
            Ogni singola lezione combina coordinazione motoria, tecnica di combattimento, calisthenics a corpo libero 
            e focus-training. <strong className="text-gray-950 font-bold">L’obiettivo non è alimentare la carica aggressiva</strong>, ma canalizzarlo per 
            scolpire un profondo autocontrollo, il rispetto dell'avente diritto e la fiducia interiore.
          </p>
        </div>

        {/* Vertical Visual Flow list of steps */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical joining line for desktop */}
          <div className="hidden md:block absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200"></div>

          <div className="space-y-10">
            {METHOD_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8 group"
              >
                {/* Number Badge with line connection point */}
                <div className="relative flex-shrink-0 z-10">
                  <div className="w-16 h-16 bg-white border-2 border-gray-200 group-hover:border-brand-red text-gray-900 flex items-center justify-center rounded-full font-display font-extrabold text-xl shadow transition-all duration-300">
                    <span className="text-brand-red font-extrabold font-display">{step.number}</span>
                  </div>
                </div>

                {/* Text Block Content */}
                <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-6 md:p-8 flex-grow shadow-sm hover:border-brand-red/40 hover:bg-white transition-all duration-300">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-gray-950 mb-2 group-hover:text-brand-red transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Microcopy Slogan Footer */}
        <div className="mt-16 text-center">
          <span className="font-mono text-xs sm:text-sm text-gray-500 uppercase tracking-widest block font-semibold">
            “La forza vera è sapersi fermare.”
          </span>
        </div>

      </div>
    </section>
  );
}
