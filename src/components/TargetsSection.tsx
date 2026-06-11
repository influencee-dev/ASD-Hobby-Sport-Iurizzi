import { CheckCircle } from "lucide-react";
import { COURSES_TARGETS } from "../data";

export default function TargetsSection() {
  return (
    <section id="corsi" className="py-24 bg-[#f4f4f5] border-t border-gray-200 relative">
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-red/3 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-brand-red font-mono text-sm uppercase tracking-widest font-bold block">
              • Offerta Formativa •
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              I corsi per ogni fascia d’età e livello
            </h2>
            <div className="h-1 w-16 bg-brand-red rounded"></div>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-gray-650 text-sm sm:text-base leading-relaxed">
              I nostri corsi sono rivolti a chi desideri praticare kick boxing, functional training, ginnastica posturale ed avviamento allo sport, in un ambiente protetto e professionale. 
              <span className="text-gray-950 font-bold"> Non è richiesta alcuna esperienza fisica o sportiva di partenza.</span>
            </p>
          </div>
        </div>

        {/* Targets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURSES_TARGETS.map((target, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-red/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
            >
              <div>
                {/* Visual Accent Overlay */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-red/10 group-hover:bg-brand-red transition-all duration-300"></div>

                {/* Card Title */}
                <h3 className="font-display font-extrabold text-2xl text-gray-950 mb-4 pl-2 group-hover:text-brand-red transition-colors duration-200">
                  {target.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed pl-2 mb-6">
                  {target.description}
                </p>

                {/* Sub-benefits Bullet List */}
                <div className="border-t border-gray-150 pt-6 pl-2">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-4 font-semibold">
                    COSA COMPRENDE L'ALLENAMENTO:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {target.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2.5 text-sm text-gray-700 font-medium">
                        <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive subtle arrow CTA footer */}
              <div className="mt-8 pt-6 border-t border-gray-150 pl-2 text-right">
                <a
                  href="#preiscrizione"
                  className="font-mono text-xs text-gray-500 hover:text-brand-red transition-colors duration-200 uppercase tracking-widest inline-flex items-center space-x-1"
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      document.getElementById("preiscrizione")?.scrollIntoView({ behavior: "smooth" });
                    } catch (err) {
                      console.warn("scrollIntoView fallito nell'ambiente iframe, fallback locale:", err);
                    }
                  }}
                >
                  <span>Chiedi informazioni</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
