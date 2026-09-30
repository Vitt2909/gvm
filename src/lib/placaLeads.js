// Envio do formulário da plaquinha para a tabela plaquinha_leads (Supabase).
// Usa a API REST direto, sem o SDK: é um único INSERT e o pacote não compensa.
import { placaSupabase } from "../data/placa.js";

/** Só dígitos, com DDI 55 quando a pessoa digita apenas DDD + número. */
export function normalizeWhatsApp(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11 ? `55${digits}` : digits;
}

export function isValidWhatsApp(value) {
  return /^55\d{10,11}$/.test(normalizeWhatsApp(value));
}

/** De onde a pessoa veio: utm_source, o site que mandou o link ou "direto". */
export function getLeadOrigin() {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
  if (utm) return utm.slice(0, 200);

  try {
    const referrer = document.referrer ? new URL(document.referrer).hostname : "";
    if (referrer && referrer !== window.location.hostname) return referrer.slice(0, 200);
  } catch {
    // referrer malformado: segue como acesso direto
  }
  return "direto";
}

/**
 * Grava o cadastro. Resolve com "created" ou "duplicate" (o mesmo WhatsApp já
 * se cadastrou nesta fase) e rejeita em qualquer outra falha.
 */
export async function submitPlacaLead(lead) {
  const response = await fetch(`${placaSupabase.url}/rest/v1/${placaSupabase.table}`, {
    method: "POST",
    headers: {
      apikey: placaSupabase.publishableKey,
      "Content-Type": "application/json",
      // Sem política de leitura, pedir a linha de volta falharia.
      Prefer: "return=minimal"
    },
    body: JSON.stringify(lead)
  });

  if (response.status === 201) return "created";
  if (response.status === 409) return "duplicate";

  const detail = await response.text().catch(() => "");
  throw new Error(`Supabase respondeu ${response.status}: ${detail.slice(0, 200)}`);
}
