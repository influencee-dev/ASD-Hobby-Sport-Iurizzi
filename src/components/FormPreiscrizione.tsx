import React, { useState } from "react";
import { Send, Phone, MessageSquare, CheckCircle, AlertOctagon, RefreshCw } from "lucide-react";
import { CourseType, ExperienceLevel, LeadFormData } from "../types";
import { CONTACT_INFO } from "../data";

export default function FormPreiscrizione() {
  const [formData, setFormData] = useState<LeadFormData>({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    course: CourseType.KICK_BOXING,
    experience: ExperienceLevel.NONE,
    message: "",
    privacyAccepted: false,
    marketingAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedWaLink, setSubmittedWaLink] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validations
    if (!formData.parentName.trim()) {
      showError("Il nome del genitore è obbligatorio.");
      return;
    }
    if (!formData.childName.trim()) {
      showError("Il nome dell'allievo/a è obbligatorio.");
      return;
    }
    if (!formData.childAge.trim() || isNaN(Number(formData.childAge))) {
      showError("Inserisci un'eta numerica valida per l'allievo/a.");
      return;
    }
    if (!formData.phone.trim()) {
      showError("Il numero di telefono è obbligatorio.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      showError("Compila un indirizzo email valido.");
      return;
    }
    if (!formData.privacyAccepted) {
      showError("È necessario accettare il trattamento dei dati personali.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      /**
       * Qui colleghiamo l'API Brevo passando l'intero pacchetto del modulo pre-iscrizione.
       * Il backend prenderà in carico l'inserimento/aggiornamento sicuro del contatto.
       */
      const response = await fetch("/api/brevo-preiscrizione", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      let result: any = null;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const textResponse = await response.text();
        console.error("Risposta non JSON ricevuta dal server:", textResponse);
        throw new Error(`Il server ha risposto con formato non caricabile (Status: ${response.status}). Per chiarimenti immediati, puoi contattarci su WhatsApp.`);
      }

      if (response.ok && result && result.success) {
        // Build dynamic WhatsApp prefilled message containing custom user inputs
        const parent = formData.parentName || "Non specificato";
        const child = formData.childName || "Non specificato";
        const age = formData.childAge || "Non specificato";
        const phoneNo = formData.phone || "Non specificato";
        const emailAddr = formData.email || "Non specificato";
        const selCourse = formData.course || "Non specificato";
        const prevExp = formData.experience || "Nessuna";
        const noteMsg = (formData.message || "").trim();

        const messageLines = [
          `*ASD HOBBY SPORT ORTA NOVA - RICHIESTA PREISCRIZIONE*`,
          `-----------------------------------------`,
          `👨‍👩‍👦 *Genitore/Tutore:* ${parent}`,
          `👦 *Allievo/a:* ${child}`,
          `🎂 *Età:* ${age} anni`,
          `📞 *Telefono:* ${phoneNo}`,
          `✉️ *Email:* ${emailAddr}`,
          `🥋 *Corso richiesto:* ${selCourse}`,
          `💪 *Esperienza sportiva:* ${prevExp}`,
          noteMsg ? `💬 *Messaggio/Note:* ${noteMsg}` : "",
          `-----------------------------------------`,
          `_Inviato dal sito web Hobby Sport Orta Nova_`
        ];
        
        const compiledMessage = messageLines.filter(line => line !== "").join("\n");
        const dynamicWaLink = `https://wa.me/393664691636?text=${encodeURIComponent(compiledMessage)}`;
        
        setSubmittedWaLink(dynamicWaLink);
        setStatus("success");
      } else {
        showError((result && result.error) || "Si è verificato un errore durante l'invio. Riprova.");
      }
    } catch (err: any) {
      console.error("Errore di connessione o elaborazione al server:", err);
      showError(err.message || "Connessione di rete non riuscita. Verifica la connessione e riprova.");
    } finally {
      setLoading(false);
    }
  };

  const showError = (msg: any) => {
    let finalMsg = "";
    if (typeof msg === "string") {
      finalMsg = msg;
    } else if (msg && typeof msg === "object") {
      // Safely extract from nested structures, e.g., { message: "..." }, { error: "..." }, { code: ..., message: ... }
      if (typeof msg.message === "string") {
        finalMsg = msg.message;
      } else if (typeof msg.error === "string") {
        finalMsg = msg.error;
      } else if (msg.error && typeof msg.error === "object" && typeof msg.error.message === "string") {
        finalMsg = msg.error.message;
      } else {
        finalMsg = JSON.stringify(msg);
      }
    } else {
      finalMsg = String(msg || "Errore imprevisto");
    }

    setErrorMessage(finalMsg);
    setStatus("error");
    // Scroll slightly to let the error box catch attention
    try {
      document.getElementById("error-zone")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (scrollError) {
      console.warn("Element scrollIntoView error ignored in sandboxed iframe environment:", scrollError);
    }
  };

  const handleReset = () => {
    setFormData({
      parentName: "",
      childName: "",
      childAge: "",
      phone: "",
      email: "",
      course: CourseType.KICK_BOXING,
      experience: ExperienceLevel.NONE,
      message: "",
      privacyAccepted: false,
      marketingAccepted: false,
    });
    setSubmittedWaLink("");
    setStatus("idle");
    setErrorMessage("");
  };

  // Pre-compiled WhatsApp message encoding
  const waCustomText = encodeURIComponent(
    `Ciao, ho compilato il modulo di preiscrizione per i corsi Hobby Sport a Orta Nova e vorrei ricevere maggiori informazioni.`
  );
  
  // Custom links using raw Italian ASD placeholders
  const telLink = `tel:${CONTACT_INFO.phoneRaw}`;
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${waCustomText}`;

  return (
    <section id="preiscrizione" className="py-24 bg-[#f4f4f5] relative border-t border-gray-250/20">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-red/3 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-red font-mono text-sm uppercase tracking-widest font-bold block">
            • Modulo di Pre-Adesione •
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Inizia il tuo percorso con noi
          </h2>
          <div className="h-1 w-16 bg-brand-red mx-auto rounded"></div>
          <p className="font-sans text-gray-650 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Seleziona il corso desiderato e riserva subito una lezione o settimana di prova gratuita senza alcun impegno. Bastano pochi istanti per fare il primo passo!
          </p>
        </div>

        {/* Error notification zone */}
        <div id="error-zone">
          {status === "error" && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-900 rounded-lg flex items-start space-x-3 text-sm animate-shake">
              <AlertOctagon className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <span className="font-bold underline uppercase">Errore di compilazione:</span>
                {" "}{errorMessage}
              </div>
            </div>
          )}
        </div>

        {/* Main interactive state card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/3 rounded-full filter blur-2xl pointer-events-none"></div>

          {status === "success" ? (
            /* Success screen state */
            <div className="text-center py-8 space-y-8 animate-fade-in">
              <div className="mx-auto w-20 h-20 bg-green-50 border-2 border-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-950">
                  Preiscrizione Inviata!
                </h3>
                <p className="font-sans text-base text-gray-650 max-w-xl mx-auto leading-relaxed">
                  Grazie, la tua richiesta è stata registrata con successo nel nostro database. 
                  Un coordinatore della A.S.D. ti contatterà al più presto. 
                  <span className="text-brand-red font-semibold block mt-3">
                    Per accelerare l'assegnazione del gruppo o chiedere chiarimenti immediati, puoi contattarci ora:
                  </span>
                </p>
              </div>

              {/* Action Contact buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
                <a
                  href={submittedWaLink || waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-550 text-white font-display font-bold uppercase text-sm tracking-wide py-3.5 px-6 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contatta via WhatsApp</span>
                </a>

                <a
                  href={telLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold uppercase text-sm tracking-wide py-3.5 px-6 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chiama subito</span>
                </a>
              </div>

              {/* Reset form back to interactive entry */}
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-gray-950 transition-colors duration-200 uppercase font-mono mt-8 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Compila un altro modulo</span>
              </button>
            </div>
          ) : (
            /* Interactive Entry Form state */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parent's Full Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="parentName" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Nome e cognome del Genitore / Tutore <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Es. Mario Rossi"
                    className="bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base font-sans transition-all duration-200"
                  />
                </div>

                {/* Kid's Full Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="childName" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Nome e cognome del ragazzo/a <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    required
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Es. Luca Rossi"
                    className="bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base font-sans transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kid's Age */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="childAge" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Età del ragazzo/a <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    required
                    min="4"
                    max="18"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Es. 10"
                    className="bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base font-sans transition-all duration-200"
                  />
                </div>

                {/* Telephone */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Numero di Telefono <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Es. +39 333 1234567"
                    className="bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base font-sans transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Indirizzo Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Es. genitore@email.it"
                    className="bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base font-sans transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Select */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="course" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Corso di interesse <span className="text-brand-red">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 text-sm sm:text-base font-sans transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value={CourseType.KICK_BOXING}>Kick Boxing</option>
                      <option value={CourseType.FUNCTIONAL_TRAINING}>Functional Training</option>
                      <option value={CourseType.GINNASTICA_POSTURALE}>Ginnastica Posturale</option>
                      <option value={CourseType.AVVIAMENTO_ALLO_SPORT}>Avviamento allo Sport</option>
                      <option value={CourseType.UNSURE}>Non so ancora, vorrei informazioni</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Experience Select */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="experience" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                    Esperienza sportiva precedente <span className="text-brand-red">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 text-sm sm:text-base font-sans transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value={ExperienceLevel.NONE}>Nessuna</option>
                      <option value={ExperienceLevel.BASE}>Base (Principiante assoluto)</option>
                      <option value={ExperienceLevel.INTERMEDIATE}>Intermedia / Avanzata (Ha già praticato)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Text Message */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="font-mono text-xs text-gray-750 uppercase tracking-wider font-bold">
                  Messaggio libero (Domande, esigenze particolari o curiosità)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Inserisci qui eventuali desideri, esigenze specifiche, patologie o domande particolari..."
                  className="bg-white border border-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none rounded-lg p-3 text-gray-900 placeholder-gray-400 text-sm sm:text-base font-sans transition-all duration-200 resize-none"
                ></textarea>
              </div>

              {/* Checkboxes Wrapper */}
              <div className="space-y-4 pt-2">
                {/* Privacy Checkbox (Mandatory) */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacyAccepted"
                      name="privacyAccepted"
                      type="checkbox"
                      required
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className="focus:ring-brand-red h-4.5 w-4.5 text-brand-red border-gray-300 rounded bg-white cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacyAccepted" className="font-sans text-gray-600 cursor-pointer select-none">
                      Acconsento al trattamento dei dati personali per essere ricontattato in merito alla preiscrizione. <span className="text-brand-red font-bold">*</span>
                    </label>
                  </div>
                </div>

                {/* Marketing Checkbox (Optional) */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketingAccepted"
                      name="marketingAccepted"
                      type="checkbox"
                      checked={formData.marketingAccepted}
                      onChange={handleChange}
                      className="focus:ring-brand-red h-4.5 w-4.5 text-brand-red border-gray-300 rounded bg-white cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketingAccepted" className="font-sans text-gray-600 cursor-pointer select-none">
                      Acconsento a ricevere comunicazioni informative ed editoriali sui corsi e sulle attività dell'associazione (Newsletter via Email/WhatsApp).
                    </label>
                  </div>
                </div>
              </div>

              {/* Form submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2.5 bg-brand-red hover:bg-brand-red-light disabled:bg-gray-150 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-display font-extrabold text-base tracking-widest uppercase py-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Elaborazione richiesta...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-gray-100" />
                      <span>Invia preiscrizione</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
