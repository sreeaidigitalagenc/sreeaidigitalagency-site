import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "../lib/api";
import { DEMO, demoLead } from "../lib/demo";

/**
 * Saves a lead to the admin database. Website form enquiries also go to WhatsApp (opened by the form),
 * so if the server can't be reached the form still succeeds; chatbot leads report the error.
 */
export function useCreateLead() {
  type Input = Parameters<typeof client.leads.create>[0];
  return useMutation({
    ...orpc.leads.create.mutationOptions(),
    mutationFn: async (input: Input) => {
      if (DEMO) return demoLead(input);
      try {
        return await client.leads.create(input);
      } catch (err) {
        if (input.source === "chatbot") throw err;
        console.warn("Lead not saved to the database; it was sent on WhatsApp.", err);
        return { ok: true as const, id: 0 };
      }
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
