import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON body payloads
  app.use(express.json());

  // API Routes - IMPORTANT: Declare these before mounting Vite middleware
  app.post("/api/brevo-preiscrizione", (req: express.Request, res: express.Response) => {
    try {
      const {
        parentName,
        childName,
        childAge,
        phone,
        email,
        course,
        experience,
        message,
        privacyAccepted,
        marketingAccepted,
      } = req.body;

      // Server-side validation
      if (!parentName || !childName || !childAge || !phone || !email || !course || !privacyAccepted) {
        return res.status(400).json({
          success: false,
          error: "Tutti i campi obbligatori devono essere compilati e l'informativa sulla privacy deve essere accettata.",
        });
      }

      // Output values to terminal for full live verification
      console.log("-----------------------------------------");
      console.log("ASD Hobby Sport Iurizzi - NUOVA PRE-ISCRIZIONE RICEVUTA:");
      console.log(`Genitore: ${parentName}`);
      console.log(`Bambino/a: ${childName} (${childAge} anni)`);
      console.log(`Contatti: ${phone} | ${email}`);
      console.log(`Corso: ${course} | Livello: ${experience}`);
      console.log(`Messaggio: ${message || "[Nessun messaggio]"}`);
      console.log(`Consenso Marketing: ${marketingAccepted ? "SI" : "NO"}`);
      console.log("-----------------------------------------");

      // Real integration with Brevo API
      const BREVO_API_KEY = process.env.BREVO_API_KEY;
      const BREVO_LIST_ID = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID, 10) : NaN;

      if (!BREVO_API_KEY || isNaN(BREVO_LIST_ID)) {
        console.warn("[Brevo API] Avviso: BREVO_API_KEY o BREVO_LIST_ID non configurati nei Secrets di ambiente. L'invio a Brevo è disabilitato, ma i dati sono stati stampati in console.");
      } else {
        // We will perform a robust multi-stage flow to add/update the contact in Brevo
        (async () => {
          try {
            // Attempt 1: Full structured contact with custom attributes
            console.log(`[Brevo API] Tentativo 1: Invio contatto con attributi personalizzati per ${email} alla lista ${BREVO_LIST_ID}...`);
            let response = await fetch("https://api.brevo.com/v3/contacts", {
              method: "POST",
              headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": BREVO_API_KEY
              },
              body: JSON.stringify({
                email: email,
                attributes: {
                  NOME_GENITORE: parentName,
                  NOME_ALLIEVO: childName,
                  ETA_ALLIEVO: parseInt(childAge, 10),
                  TELEFONO: phone,
                  CORSO: course,
                  LIVELLO: experience,
                  NOTE: message || "",
                  CONSENSO_MARKETING: !!marketingAccepted
                },
                listIds: [BREVO_LIST_ID],
                updateEnabled: true
              })
            });

            if (response.ok) {
              console.log(`[Brevo API] Successo: Contatto ${email} aggiunto/aggiornato con attributi completi in Brevo.`);
              return;
            }

            const errText1 = await response.text();
            console.warn(`[Brevo API] Avviso: Tentativo 1 fallito (attributi custom non configurati?). Errore: ${errText1}`);

            // Attempt 2: Standard/Built-in attributes only (FIRSTNAME, SMS)
            console.log(`[Brevo API] Tentativo 2: Invio contatto con attributi standard (FIRSTNAME, SMS)...`);
            response = await fetch("https://api.brevo.com/v3/contacts", {
              method: "POST",
              headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": BREVO_API_KEY
              },
              body: JSON.stringify({
                email: email,
                attributes: {
                  FIRSTNAME: parentName,
                  SMS: phone
                },
                listIds: [BREVO_LIST_ID],
                updateEnabled: true
              })
            });

            if (response.ok) {
              console.log(`[Brevo API] Successo: Contatto ${email} aggiunto/aggiornato con attributi standard in Brevo.`);
              return;
            }

            const errText2 = await response.text();
            console.warn(`[Brevo API] Avviso: Tentativo 2 fallito. Errore: ${errText2}`);

            // Attempt 3: Minimal fields only (email + listId)
            console.log(`[Brevo API] Tentativo 3: Salvataggio minimale (solo email e ID lista)...`);
            response = await fetch("https://api.brevo.com/v3/contacts", {
              method: "POST",
              headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": BREVO_API_KEY
              },
              body: JSON.stringify({
                email: email,
                listIds: [BREVO_LIST_ID],
                updateEnabled: true
              })
            });

            if (response.ok) {
              console.log(`[Brevo API] Successo: Contatto ${email} salvato con successo (solo campi minimi) in Brevo.`);
              return;
            }

            console.error(`[Brevo API] Errore: Tutti i tentativi di salvare ${email} in Brevo sono falliti. Errore finale:`, await response.text());
          } catch (err) {
            console.error("[Brevo API] Errore eccezionale durante la chiamata API di Brevo:", err);
          }
        })();
      }

      return res.status(200).json({
        success: true,
        message: "Grazie, la tua richiesta è stata registrata. Per completare la preiscrizione puoi contattare direttamente l’associazione.",
      });
    } catch (error) {
      console.error("Errore durante l'elaborazione del lead:", error);
      return res.status(500).json({
        success: false,
        error: "Si è verificato un errore sul server durante l'elaborazione dei dati.",
      });
    }
  });

  // Mount Vite development server or serve static dist folder in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
