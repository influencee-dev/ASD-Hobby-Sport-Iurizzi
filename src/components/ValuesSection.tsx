import { Shield, Heart, Activity } from "lucide-react";
import { INTRO_VALUES } from "../data";

// Type-safe icon mapper
const iconMap: Record<string, any> = {
  Shield: Shield,
  Heart: Heart,
  Activity: Activity
};

export default function ValuesSection() {
  return (
    <section id="intro" className="py-24 bg-white border-t border-gray-100 relative">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-red/3 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-red font-mono text-sm uppercase tracking-widest font-bold">
            • Lo Sport Come Educazione •
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Molto più di una semplice palestra
          </h2>
          <div className="h-1 w-16 bg-brand-red mx-auto rounded"></div>
          <p className="font-sans text-gray-700 leading-relaxed text-base sm:text-lg">
            Allenarsi significa imparare a conoscere il proprio corpo, rispettare le regole, 
            ascoltare gli insegnanti e cooperare attivamente con i compagni. I corsi della 
            <strong className="text-gray-950 font-bold"> A.S.D. Hobby Sport</strong> ad Orta Nova sono mossi dall'obiettivo 
            di guidare gli allievi in un viaggio coordinato di crescita fisica, mentale ed emotiva.
          </p>
        </div>

        {/* 3 Core Values Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INTRO_VALUES.map((value) => {
            const IconComponent = iconMap[value.iconName || "Shield"] || Shield;

            return (
              <div
                key={value.id}
                className="relative group bg-white border border-gray-200 rounded-xl p-8 hover:border-brand-red/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1 block"
              >
                {/* Visual Icon Accent */}
                <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:border-transparent transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-brand-red group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-brand-red transition-colors duration-200">
                  {value.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-gray-600 group-hover:text-gray-750 transition-colors duration-200 leading-relaxed">
                  {value.description}
                </p>

                {/* Micro accent corner border */}
                <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-xl border-t border-r border-transparent group-hover:border-brand-red/45 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Highlight quote at the footer of this section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl max-w-2xl">
            <p className="text-sm font-mono text-gray-600 italic">
              “Lo sport da combattimento, se insegnato con etica, è prima di tutto un percorso di educazione e mutuo soccorso.”
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
