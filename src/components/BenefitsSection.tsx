import { Award, Activity, Sparkles, Shield, Users, Lock } from "lucide-react";
import { BENEFITS } from "../data";

// Custom Icon Mapper for benefits list
const iconMap: Record<string, any> = {
  Award: Award,
  Activity: Activity,
  Sparkles: Sparkles,
  Shield: Shield,
  Users: Users,
  Lock: Lock
};

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-150 relative">
      <div className="absolute bottom-12 left-12 w-80 h-80 bg-brand-red/3 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-red font-mono text-sm uppercase tracking-widest font-bold block">
            • Crescita Sana e Sicura •
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Perché scegliere l'A.S.D. Hobby Sport Orta Nova
          </h2>
          <div className="h-1 w-16 bg-brand-red mx-auto rounded"></div>
          <p className="font-sans text-gray-750 text-sm sm:text-base leading-relaxed">
            I nostri allievi e le loro famiglie notano benefici e cambiamenti positivi fin dalle prime settimane. 
            Il nostro approccio integrato favorisce un corretto sviluppo psicomotorio, atletico e caratteriale.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => {
            const IconComponent = iconMap[benefit.iconName] || Shield;

            return (
              <div
                key={benefit.id}
                className="bg-white border border-gray-200 hover:border-brand-red/50 rounded-xl p-6 sm:p-8 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Decorative Icon Holder */}
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 group-hover:border-brand-red-light group-hover:bg-red-50 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-brand-red transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-gray-950 mb-3 group-hover:text-brand-red transition-colors duration-200">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-gray-605 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting microcopy quote block */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-sm font-sans text-gray-500 font-semibold">
            * I corsi sono tenuti in conformità con i regolamenti delle federazioni sportive nazionali ufficiali (CONI/FPI/Federkombat).
          </p>
        </div>

      </div>
    </section>
  );
}
