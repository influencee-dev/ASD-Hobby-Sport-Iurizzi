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
  app.post("/api/preiscrizione", async (req: express.Request, res: express.Response) => {
    try {
      const {
        firstName,
        lastName,
        childName,
        childAge,
        phone,
        email,
        course,
        experience,
        message,
        privacyAccepted
      } = req.body;

      // Server-side validation
      if (!firstName || !lastName || !phone || !email || !privacyAccepted) {
        return res.status(400).json({
          success: false,
          error: "Tutti i campi obbligatori (Nome, Cognome, Email, Telefono e Privacy) devono essere compilati.",
        });
      }

      // Read Brevo configurations from environment
      const BREVO_API_KEY = process.env.BREVO_API_KEY;
      const BREVO_LIST_ID_ENV = process.env.BREVO_LIST_ID;
      const BREVO_LIST_ID = BREVO_LIST_ID_ENV ? parseInt(BREVO_LIST_ID_ENV, 10) : 1; // standard list ID or fallback if needed

      if (!BREVO_API_KEY) {
        console.error("Errore di configurazione: BREVO_API_KEY non è presente nelle variabili d'ambiente.");
        return res.status(500).json({
          success: false,
          error: "Errore di configurazione del server (Brevo API Key mancante).",
        });
      }

      // Save or update the contact on Brevo using POST https://api.brevo.com/v3/contacts
      // Payload must contain email, attributes FIRSTNAME, LASTNAME, SMS, listIds and updateEnabled: true
      const payload = {
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          SMS: phone
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true
      };

      console.log("[Brevo API] Invio richiesta a Brevo:", JSON.stringify(payload));

      const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (!brevoResponse.ok) {
        const errText = await brevoResponse.text();
        console.error(`[Brevo API] Fallito con status ${brevoResponse.status}: ${errText}`);
        return res.status(brevoResponse.status).json({
          success: false,
          error: `Errore durante il salvataggio su Brevo: ${errText || brevoResponse.statusText}`
        });
      }

      console.log("[Brevo API] Contatto salvato con successo su Brevo.");

      // Formulate prefilled WhatsApp message
      const parent = `${firstName} ${lastName}`;
      const child = childName || "Non specificato";
      const age = childAge || "Non specificato";
      const phoneNo = phone || "Non specificato";
      const emailAddr = email || "Non specificato";
      const selCourse = course || "Non specificato";
      const prevExp = experience || "Nessuna";
      const noteMsg = (message || "").trim();

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
      const whatsappUrl = `https://wa.me/393664691636?text=${encodeURIComponent(compiledMessage)}`;

      return res.status(200).json({
        success: true,
        whatsappUrl: whatsappUrl
      });
    } catch (error: any) {
      console.error("Errore durante l'elaborazione del lead:", error);
      return res.status(500).json({
        success: false,
        error: "Si è verificato un errore sul server durante l'elaborazione dei dati: " + (error.message || ""),
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
