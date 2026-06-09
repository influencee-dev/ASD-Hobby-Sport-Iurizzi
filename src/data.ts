import { CardItem, BenefitItem, CourseType, ExperienceLevel } from "./types";

export const INTRO_VALUES: CardItem[] = [
  {
    id: "disciplina",
    title: "Disciplina",
    description: "Insegniamo a rispettare gli orari, le regole, l'istruttore e ad autogestirsi. La disciplina sportiva si riflette nei voti scolastici e nella vita quotidiana.",
    iconName: "Shield"
  },
  {
    id: "rispetto",
    title: "Rispetto",
    description: "Ogni compagno sul tatami è un alleato per crescere. Il rispetto per l'insegnante, l'avversario e se stessi è la colonna portante della nostra associazione.",
    iconName: "Heart"
  },
  {
    id: "autocontrollo",
    title: "Autocontrollo",
    description: "Cavalcare l'energia fisica per trasformarla in forza calma. I bambini imparano a gestire l'ansia e la frustrazione quotidiana mantenendo sempre il controllo.",
    iconName: "Activity"
  }
];

export const COURSES_TARGETS = [
  {
    title: "Piccoli Campioni (5-6 anni)",
    description: "Corsi dedicati all'avviamento allo sport in un clima di gioco e inclusione. Esercizi ludici mirati allo sviluppo coordinativo, equilibrio, senso dello spazio e interazione positiva.",
    features: ["Educazione motoria", "Giochi di coordinazione", "Sviluppo dell'equilibrio", "Zero impatti fisici"]
  },
  {
    title: "Bambini (dai 7 ai 10 anni)",
    description: "La fase ideale per apprendere i primi schemi motori completi. Introduciamo in sicurezza le tecniche di Kick Boxing, unendo ginnastica posturale e coordinamento muscolare per una crescita sana.",
    features: ["Kick Boxing formativa", "Ginnastica posturale", "Disciplina del movimento", "Agilità e riflessi"]
  },
  {
    title: "Ragazzi (dagli 11 ai 16 anni)",
    description: "Allenamenti dinamici per il perfezionamento della Kick Boxing, preparazione atletica e potenziamento. Utilizziamo lo sport per consolidare la sicurezza in se stessi e incanalare positivamente l'energia.",
    features: ["Tecnica Kick Boxing", "Preparazione atletica", "Autostima e rispetto", "Gestione delle emozioni"]
  },
  {
    title: "Adulti (dai 17 anni in su)",
    description: "Sessioni complete per tutti i livelli. Combiniamo la tecnica di Kick Boxing (colpi controllati e sacco) con il Functional Training per il potenziamento complessivo e la Ginnastica Posturale defaticante.",
    features: ["Tecnica & Difesa", "Functional Training", "Tonificazione muscolare", "Ginnastica Posturale"]
  }
];

export const METHOD_STEPS = [
  {
    number: "1",
    title: "Riscaldamento e preparazione atletica",
    description: "Esercizi cardio, coordinazione motoria, potenziamento a corpo libero e stretching. Prepariamo il corpo all'attività in modo sano, sicuro e simmetrico."
  },
  {
    number: "2",
    title: "Tecnica pura di base",
    description: "Apprendimento delle guardie, spostamenti, schivate e colpi di kick boxing focalizzandosi sull'equilibrio perfetto e sulla corretta biomeccanica dei movimenti."
  },
  {
    number: "3",
    title: "Coordinazione, riflessi e sacco",
    description: "Lavoro dinamico con i colpitori insieme ai nostri Maestri e colpi controllati ai sacchi. Sviluppa riflessi fulminei, tempismo, coordinazione e concentrazione."
  },
  {
    number: "4",
    title: "Rispetto rigoroso delle regole",
    description: "Ogni allievo risponde con educazione alle direttive dei Maestri. La palestra è un luogo di crescita in cui non si tollerano aggressività o parole spiacevoli."
  },
  {
    number: "5",
    title: "Autocontrollo emotivo",
    description: "Esercizi per imparare a gestire la fatica, respirare sotto sforzo, a non reagire d'impulso e a riordinare i pensieri nei momenti di stanchezza fisica."
  },
  {
    number: "6",
    title: "Difesa personale e benessere",
    description: "Ginnastica posturale, functional training e kick boxing si uniscono per dare forza, agilità e consapevolezza motoria da usare per il proprio benessere."
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: "sicurezza",
    title: "Migliora sicurezza e autostima",
    description: "Imparare a muoversi nello spazio e a padroneggiare le tecniche di combattimento rende i ragazzi fieri delle proprie abilità e riduce le insicurezze.",
    iconName: "Award"
  },
  {
    id: "energia",
    title: "Aiuta a gestire energia ed emozioni",
    description: "Scarica l'iperattività e lo stress scolastico in palestra. I ragazzi tornano a casa sereni, rilassati e capaci di una migliore concentrazione nello studio.",
    iconName: "Activity"
  },
  {
    id: "coordinazione",
    title: "Sviluppa coordinazione e resistenza",
    description: "Lo sport da combattimento è uno degli allenamenti fisici più completi al mondo. Allena forza, fiato, agilità, riflessi e riflessi posturali.",
    iconName: "Sparkles"
  },
  {
    id: "disciplina",
    title: "Insegna rispetto e disciplina",
    description: "Dall'inchino d'ingresso alla stretta di mano finale con il compagno, l'allievo apprende l'etica sportiva classica che trasforma i ragazzi in cittadini responsabili.",
    iconName: "Shield"
  },
  {
    id: "socialita",
    title: "Favorisce socialità e gruppo",
    description: "Niente barriere o isolamento da schermi digitali: i ragazzi cooperano per migliorarsi a vicenda, creando legami di amicizia solidi e reali.",
    iconName: "Users"
  },
  {
    id: "ambiente",
    title: "Ambiente sano e controllato",
    description: "Istruttori federali qualificati, tesserati e di grande spessore umano vigilano su ogni esercizio in una palestra accogliente e adatta alle famiglie.",
    iconName: "Lock"
  }
];

export const CONTACT_INFO = {
  phone: "+39 366 469 1636",
  whatsapp: "+39 366 469 1636",
  phoneRaw: "+393664691636",
  whatsappRaw: "393664691636",
  address: "Via del Popolo 7, Orta Nova (Fg)",
  email: "info@hobbysportiurizzi.it",
  mapPreviewUrl: "/images/canali-diretti.png",
  orari: {
    feriali: "Lunedì - Sabato: 08:00 - 13:00, 16:30 - 22:00",
    domenica: "Domenica: Chiuso"
  }
};
