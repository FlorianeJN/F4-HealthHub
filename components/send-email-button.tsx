"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function SendEmailButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "floriane.jnikebie@gmail.com",
          subject: "Bienvenue !",
          html: "<p>Bonjour et bienvenue sur notre plateforme 🚀</p>",
        }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || "Unknown error");
      }

      setMessage("Email envoyé avec succès !");
    } catch (err) {
      setError(`Échec de l'envoi : ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Envoi…" : "Envoyer l'email de bienvenue"}
      </Button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
