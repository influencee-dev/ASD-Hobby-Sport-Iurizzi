import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, Clock } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function ContactsSection() {
  const waCustomText = encodeURIComponent(
    "Ciao, vorrei ricevere maggiori informazioni sui corsi Hobby Sport a Orta Nova."
  );
  
  const telLink = `tel:${CONTACT_INFO.phoneRaw}`;
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${waCustomText}`;

  return (
    <section id="contatti" className="py-24 bg-white border-t border-gray-150 relative animate-fade-in">
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-brand-red/3 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-brand-red font-mono text-sm uppercase tracking-widest font-bold block">
            • Canali Diretti •
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Vuoi saperne di più?
          </h2>
          <div className="h-1 w-16 bg-brand-red mx-auto rounded"></div>
          <p className="font-sans text-gray-650 text-sm sm:text-base leading-relaxed">
            Siamo sempre a disposizione per rispondere alle tue domande, pianificare una lezione di prova gratuita 
            o mostrarti la nostra palestra. Scegli il canale che preferisci.
          </p>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Directory */}
          <div className="space-y-6">
            
            {/* Phone Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start space-x-4 hover:border-gray-300 transition-colors duration-200 shadow-sm">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-brand-red">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display font-bold text-lg text-gray-950 mb-1">Infoline Telefonica</h4>
                <p className="text-sm text-gray-600 mb-2">Chiamaci per chiarimenti su orari, quote e turni dei corsi.</p>
                <a
                  href={telLink}
                  className="inline-flex items-center space-x-1.5 text-brand-red hover:text-brand-red-dark font-mono text-md font-bold transition-colors duration-200"
                >
                  <span>{CONTACT_INFO.phone}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start space-x-4 hover:border-gray-300 transition-colors duration-200 shadow-sm">
              <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display font-bold text-lg text-gray-950 mb-1">WhatsApp Rapido</h4>
                <p className="text-sm text-gray-600 mb-2">Scrivi in chat per fissare la settimana di prova dei ragazzi.</p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-green-600 hover:text-green-700 font-mono text-md font-bold transition-colors duration-200"
                >
                  <span>{CONTACT_INFO.whatsapp}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Address Location Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start space-x-4 hover:border-gray-300 transition-colors duration-200 shadow-sm">
              <div className="p-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display font-bold text-lg text-gray-950 mb-1">Sede della Palestra</h4>
                <p className="text-sm text-gray-600 mb-2">Vieni a trovarci a Orta Nova!</p>
                <p className="font-mono text-xs text-gray-950 font-bold">{CONTACT_INFO.address}</p>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start space-x-4 hover:border-gray-300 transition-colors duration-200 shadow-sm">
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-600 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display font-bold text-lg text-gray-950 mb-1">Orari di Apertura</h4>
                <div className="text-sm text-gray-600 space-y-1 font-sans">
                  <p><span className="font-semibold text-gray-800">Lunedì – Sabato:</span> 08:00 – 13:00, 16:30 – 22:00</p>
                  <p><span className="font-semibold text-gray-800">Domenica:</span> Chiuso</p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start space-x-4 hover:border-gray-300 transition-colors duration-200 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-200 text-purple-600 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <h4 className="font-display font-bold text-lg text-gray-950 mb-1">Indirizzo Email</h4>
                <p className="text-sm text-gray-600 mb-2">Per contatti formali, convenzioni o invio documentazione medica.</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-mono text-sm text-brand-red hover:text-brand-red-dark font-bold transition-colors duration-200"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

          </div>

          {/* Right Column visual box or Map representation */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-[420px] group">
            <img
              src={CONTACT_INFO.mapPreviewUrl}
              alt="Mappa Palestra Hobby Sport Orta Nova"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              referrerPolicy="no-referrer"
            />
            
            {/* Soft subtle light glass cover from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/95 via-transparent to-transparent"></div>
            
            {/* Overlaid Badge */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 border border-gray-200 p-6 rounded-xl backdrop-blur-md space-y-4 shadow-md">
              <div className="space-y-1">
                <span className="text-xs font-mono text-brand-red uppercase tracking-widest font-bold block">Hobby Sport Orta Nova</span>
                <p className="text-sm text-gray-700 font-semibold font-sans">
                  Palestra attrezzata con sacchi professionali, attrezzatura moderna per Functional Training, pavimentazione antitrauma certificata CONI e ambiente riscaldato.
                </p>
              </div>
              
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-brand-red hover:bg-brand-red-light text-white font-display font-bold uppercase text-xs sm:text-sm tracking-widest py-3 px-4 rounded-lg shadow transition-all duration-300 cursor-pointer"
              >
                Parla con noi ora
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
