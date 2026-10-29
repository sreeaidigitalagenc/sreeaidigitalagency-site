/**
 * Demo mode = the GitHub Pages build (VITE_DEMO=1). No server there, so:
 * settings use the defaults, forms open WhatsApp, admin is hidden.
 */
import { DEFAULT_SITE } from "../../api/lib/site-schema";

export const DEMO = import.meta.env.VITE_DEMO === "1";

/** Path of a file in public/, working under a sub-folder (e.g. user.github.io/repo/). */
export const asset = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, "") + p;

type LeadInput = { name: string; phone: string; email?: string; service: string; message?: string; source?: string };

/** Open WhatsApp with the enquiry details filled in, addressed to the business number. */
export function openWhatsAppLead(input: LeadInput, business = { siteName: DEFAULT_SITE.siteName, whatsapp: DEFAULT_SITE.whatsapp }) {
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
  const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
  const win = window.open(url, "_blank", "noopener");
  if (!win) window.location.href = url;
}

/** Demo replacement for saving a lead: open WhatsApp with the details filled in. */
export async function demoLead(input: LeadInput) {
  openWhatsAppLead(input);
  return { ok: true as const, id: 0 };
}
