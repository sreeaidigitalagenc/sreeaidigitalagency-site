/**
 * Demo mode = the GitHub Pages build (VITE_DEMO=1). No server there, so:
 * settings use the defaults, forms open WhatsApp, admin is hidden.
 */
import { DEFAULT_SITE } from "../../api/lib/site-schema";

export const DEMO = import.meta.env.VITE_DEMO === "1";

/** Path of a file in public/, working under a sub-folder (e.g. user.github.io/repo/). */
export const asset = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, "") + p;

type LeadInput = { name: string; phone: string; email?: string; service: string; message?: string; source?: string };

type Business = { siteName: string; whatsapp: string };

/** wa.me link with the enquiry details filled in, addressed to the business number. */
export function whatsAppLeadUrl(input: LeadInput, business: Business = DEFAULT_SITE) {
  const note = input.message && !/^Chatbot: |Call-back requested/.test(input.message) ? input.message : "";
  const text = [
    `Hi ${business.siteName}, I have a new enquiry:`,
    `Name: ${input.name}`,
    `Mobile: +91 ${input.phone}`,
    `Service: ${input.service}`,
    input.email ? `Email: ${input.email}` : "",
    note ? `Message: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Open WhatsApp with the enquiry. Call it straight from a click so the browser allows the new tab. */
export function openWhatsAppLead(input: LeadInput, business: Business = DEFAULT_SITE) {
  const url = whatsAppLeadUrl(input, business);
  try {
    const win = window.open(url, "_blank", "noopener");
    if (!win) window.location.href = url;
  } catch {
    /* blocked: the success screen still shows a WhatsApp button */
  }
}

/** Demo replacement for saving a lead (no server). Website forms open WhatsApp themselves. */
export async function demoLead(input: LeadInput) {
  if (input.source === "chatbot") openWhatsAppLead(input);
  return { ok: true as const, id: 0 };
}
