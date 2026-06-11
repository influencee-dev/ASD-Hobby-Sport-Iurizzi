import type { IncomingMessage, ServerResponse } from "http";

interface VercelRequest extends IncomingMessage {
  body: any;
  query: any;
  cookies: any;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => VercelResponse;
  send: (body: any) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: "Metodo non consentito. Usa POST."
    });
  }

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
    } = req.body || {};

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
    const BREVO_LIST_ID = BREVO_LIST_ID_ENV ? parseInt(BREVO_LIST_ID_ENV, 10) : 1;

    if (!BREVO_API_KEY) {
      console.error("Errore di configurazione: BREVO_API_KEY non è presente nelle variabili d'ambiente.");
      return res.status(500).json({
        success: false,
        error: "Errore di configurazione del server (Brevo API Key mancante).",
      });
    }

    // Helper to clean and format telephone numbers following Brevo's SMS strict validation (starts with + or country code, no spaces/special chars)
    const normalizePhoneForBrevo = (rawPhone: string): string => {
      let cleaned = rawPhone.replace(/[^\d+]/g, ""); // Keep only digits and '+'
      if (cleaned.startsWith("00")) {
        cleaned = "+" + cleaned.slice(2);
      }
      if (!cleaned.startsWith("+")) {
        if (cleaned.startsWith("39") && cleaned.length >= 11) {
          cleaned = "+" + cleaned;
        } else {
          cleaned = "+39" + cleaned;
        }
      }
      return cleaned;
    };

    const normalizedSMS = normalizePhoneForBrevo(phone);

    // Save or update the contact on Brevo using POST https://api.brevo.com/v3/contacts
    const payload = {
      email: email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SMS: normalizedSMS
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true
    };

    console.log("[Brevo API Vercel] Invio richiesta a Brevo:", JSON.stringify(payload));

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
      let errMessage = brevoResponse.statusText || "Errore sconosciuto";
      try {
        const cloneResponse = brevoResponse.clone();
        const errJson = await cloneResponse.json();
        if (errJson && typeof errJson === "object") {
          errMessage = errJson.message || errJson.code || JSON.stringify(errJson);
        }
      } catch (e) {
        try {
          const errText = await brevoResponse.text();
          if (errText) errMessage = errText;
        } catch (e2) {}
      }
      console.error(`[Brevo API Vercel] Fallito con status ${brevoResponse.status}: ${errMessage}`);
      return res.status(brevoResponse.status).json({
        success: false,
        error: `Errore durante il salvataggio su Brevo: ${errMessage}`
      });
    }

    console.log("[Brevo API Vercel] Contatto salvato con successo su Brevo.");

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
    console.error("Errore durante l'elaborazione del lead (Vercel):", error);
    return res.status(500).json({
      success: false,
      error: "Si è verificato un errore sul server durante l'elaborazione dei dati: " + (error.message || ""),
    });
  }
}
