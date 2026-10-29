import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "../lib/api";
import { DEMO, demoLead, openWhatsAppLead } from "../lib/demo";
import { useSite } from "./site";

/** Saves a lead. Website form enquiries also open WhatsApp with the details (chatbot leads stay in the chat). */
export function useCreateLead() {
  const site = useSite();
  type Input = Parameters<typeof client.leads.create>[0];
  return useMutation({
    ...orpc.leads.create.mutationOptions(),
    mutationFn: async (input: Input) => {
      const res = DEMO ? await demoLead(input) : await client.leads.create(input);
      if (!DEMO && input.source !== "chatbot") openWhatsAppLead(input, site);
      return res;
    },
  });
}

export function useLeads() {
  return useQuery(orpc.leads.list.queryOptions());
}

export function useSetLeadStatus() {
  const qc = useQueryClient();
  return useMutation(
    orpc.leads.setStatus.mutationOptions({ onSuccess: () => qc.invalidateQueries({ queryKey: orpc.leads.list.key() }) }),
  );
}

export function useRemoveLead() {
  const qc = useQueryClient();
  return useMutation(
    orpc.leads.remove.mutationOptions({ onSuccess: () => qc.invalidateQueries({ queryKey: orpc.leads.list.key() }) }),
  );
}
