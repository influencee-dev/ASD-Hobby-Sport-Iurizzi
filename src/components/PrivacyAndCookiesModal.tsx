import React, { useState } from "react";
import { Shield, Eye, Trash2, ShieldCheck, Cookie, Lock, FileText } from "lucide-react";

interface PrivacyAndCookiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "privacy" | "cookies";
}

export default function PrivacyAndCookiesModal({ isOpen, onClose, initialTab = "privacy" }: PrivacyAndCookiesModalProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | "cookies">(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 flex flex-col max-h-[90vh] shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-red/5 rounded-full filter blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 border border-red-100 rounded-lg text-brand-red">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-gray-900 leading-tight">
                Centro Privacy & Cookie Policy
              </h3>
              <p className="text-xs text-gray-500 font-mono">Regolamento UE 2016/679 (GDPR)</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Chiudi modal"
            className="text-gray-400 hover:text-gray-900 p-1.5 rounded-lg border border-gray-150 hover:border-gray-300 bg-gray-50 transition-colors duration-200 font-mono text-sm w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 my-4 border-b border-gray-100 pb-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "privacy"
                ? "bg-brand-red text-white shadow-md shadow-red-500/10"
                : "bg-gray-50 text-gray-600 hover:bg-gray-150"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Informativa Privacy</span>
          </button>
          
          <button
            onClick={() => setActiveTab("cookies")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "cookies"
                ? "bg-brand-red text-white shadow-md shadow-red-500/10"
                : "bg-gray-50 text-gray-600 hover:bg-gray-150"
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Cookie Policy</span>
          </button>
        </div>

        {/* Modal Scrollable Content Container */}
        <div className="flex-grow overflow-y-auto pr-2 space-y-6 text-sm text-gray-700 leading-relaxed font-sans text-justify">
          
          {activeTab === "privacy" ? (
            /* PRIVACY POLICY CONTENT */
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 border-l-4 border-l-brand-red">
                <p className="font-semibold text-gray-900 mb-1">Titolare del Trattamento dei Dati</p>
                <p className="text-xs text-gray-650">
                  <strong>A.S.D. HOBBY SPORT ORTA NOVA</strong><br />
                  Sede Legale ed Operativa: Via del Popolo 7 - 71045 Orta Nova (FG)<br />
                  Codice Fiscale: 90034123456<br />
                  Email di contatto: <a href="mailto:info@hobbysportiurizzi.it" className="text-brand-red hover:underline font-mono font-semibold">info@hobbysportiurizzi.it</a>
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-gray-950 text-base flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-brand-red" />
                  <span>1. Tipologie di Dati Raccolti</span>
                </h4>
                <p>
                  Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li><strong>Dati del Genitore/Tutore:</strong> Nome, cognome, indirizzo email, recapito telefonico.</li>
                  <li><strong>Dati dell'Allievo/a (Minore):</strong> Nome, cognome ed età (fondamentali per l'assegnazione corretta ai turni e classi d'età omogenee).</li>
                  <li><strong>Dati di navigazione:</strong> Indirizzo IP, dati statistici d'uso, preferenze sui cookies ed eventuali dati tecnici del browser.</li>
                  <li><strong>Dati del messaggio:</strong> Informative liberamente scritte dall'utente circa patologie, esigenze o domande specifiche.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-gray-950 text-base flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-red" />
                  <span>2. Finalità del Trattamento e Base Giuridica</span>
                </h4>
                <p>
                  Il trattamento dei dati ha le seguenti finalità:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-gray-600">
                  <li>
                    <strong>Richiesta di pre-adesione e settimana di prova gratuita:</strong> Per elaborare la richiesta di preiscrizione, assegnare la fascia oraria di Kick Boxing, Functional Training, Ginnastica Posturale o Avviamento allo sport e contattare telefonicamente o via email la famiglia. La base giuridica è l'esecuzione di misure precontrattuali richiamate dall'interessato.
                  </li>
                  <li>
                    <strong>Adempimenti di legge:</strong> Soddisfare obblighi di natura civilistica, contabile o regolamenti federali (CONI, FPI, Federkombat) connessi alla tutela della salute e all'attività sportiva.
                  </li>
                  <li>
                    <strong>Comunicazioni Informative (Opzionale):</strong> Previo esplicito consenso facoltativo, invio di messaggi via Email o WhatsApp circa gli orari dei corsi, chiusure straordinarie, eventi sociali, attività dell'Associazione.
                  </li>
                </ol>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-gray-950 text-base flex items-center space-x-1.5">
                  <Trash2 className="w-4 h-4 text-brand-red" />
                  <span>3. Periodo di Conservazione</span>
                </h4>
                <p>
                  I Dati sono trattati e conservati per il tempo richiesto dalle finalità per le quali sono stati raccolti:
                </p>
                <p className="text-xs text-gray-600">
                  I dati raccolti per finalità precontrattuali (richieste di contatto e preiscrizione) saranno eliminati o resi anonimi entro <strong>12 mesi</strong> dalla conclusione dell'anno sportivo di riferimento se non seguiti da un'effettiva associazione formale. I dati relativi a obblighi contabili e legali vengono conservati per i tempi previsti dalla legge (es. 10 anni).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-gray-950 text-base flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-brand-red" />
                  <span>4. Diritti dell'Interessato</span>
                </h4>
                <p>
                  Gli utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare. In particolare, hai il diritto di:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li><strong>Revocare il consenso</strong> in ogni momento senza pregiudicare la liceità del trattamento precedente.</li>
                  <li><strong>Accedere ai propri Dati</strong> ed ottenerne una copia.</li>
                  <li><strong>Verificare e chiedere la rettificazione</strong> dei dati inesatti.</li>
                  <li><strong>Ottenere la cancellazione o rimozione</strong> dei propri Dati Personali (diritto all'oblio).</li>
                  <li><strong>Proporre reclamo</strong> all'autorità di controllo della protezione dei dati personali competente (Garante Privacy Italiano).</li>
                </ul>
                <p className="text-xs text-gray-600">
                  Per esercitare tali diritti, è sufficiente scrivere una richiesta a <span className="font-semibold text-brand-red">info@hobbysportiurizzi.it</span>. Risponderemo tempestivamente entro 30 giorni.
                </p>
              </div>
            </div>
          ) : (
            /* COOKIE POLICY CONTENT */
            <div className="space-y-6">
              <p>
                Questo sito utilizza i cookie per migliorare l'esperienza utente, personalizzare la navigazione e analizzare il traffico in modo aggregato. Di seguito ti spieghiamo quali tipologie di cookie utilizziamo e come puoi controllarli.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    <h5 className="font-bold text-gray-900 text-sm">Cookie Tecnici e Necessari (Sempre Attivi)</h5>
                  </div>
                  <p className="text-xs text-gray-600">
                    Sono essenziali per consentire una navigazione fluida sul sito, memorizzare le preferenze dell'utente (come la lingua scelta o l'accettazione/rifiuto della cookie banner stessa) e garantire la sicurezza delle sessioni di compilazione del modulo di pre-adesione. Non possono essere disattivati.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                    <h5 className="font-bold text-gray-900 text-sm">Cookie Statistici ed Analitici</h5>
                  </div>
                  <p className="text-xs text-gray-600">
                    Consentono di raccogliere informazioni statistiche in formato anonimo e aggregato sull'uso del sito da parte dei visitatori (ad esempio quali pagine sono più visitate, durata della permanenza, tassi di clic). Ci aiutano a ottimizzare le prestazioni complessive della piattaforma senza identificare l'utente.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>
                    <h5 className="font-bold text-gray-900 text-sm">Cookie di Marketing e Tracciamento Social</h5>
                  </div>
                  <p className="text-xs text-gray-600">
                    Sono utilizzati per monitorare l'efficacia delle nostre campagne di informazione sui social network, ad esempio misurando quanti utenti atterrano sul modulo partendo da un annuncio promozionale o fornendo tracciamenti integrati per i link di condivisione di mappe o video ufficiali dell'ASD.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-gray-950 text-base">Come gestire o cancellare i Cookie tramite browser</h4>
                <p>
                  Oltre a utilizzare il nostro pannello di scelta rapida dei permessi, puoi limitare, bloccare o cancellare i cookie modificando direttamente le impostazioni del tuo browser:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 font-mono">
                  <li><strong>Google Chrome:</strong> Impostazioni {">"} Privacy e sicurezza {">"} Cookie e altri dati dei siti.</li>
                  <li><strong>Safari (iOS / macOS):</strong> Preferenze {">"} Privacy {">"} Rimuovi tutti i dati del sito web.</li>
                  <li><strong>Mozilla Firefox:</strong> Opzioni {">"} Privacy e sicurezza {">"} Cookie e dati dei siti web.</li>
                  <li><strong>Microsoft Edge:</strong> Impostazioni {">"} Cookie e autorizzazioni sito.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer actions */}
        <div className="pt-4 border-t border-gray-100 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-brand-red hover:bg-brand-red-light text-white font-display text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg transition-transform duration-200 active:scale-95 cursor-pointer shadow-md shadow-brand-red/10 hover:shadow-brand-red/20"
          >
            Ho Capito, Chiudi
          </button>
        </div>

      </div>
    </div>
  );
}
