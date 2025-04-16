import { z } from "zod";

export const PartnerSchema = z.object({
  nom: z.string(),
  numero_civique: z.number(),
  rue: z.string(),
  ville: z.string(),
  province: z.string(),
  code_postal: z.string(),
  telephone: z.number(),
  courriel: z.string().email(),
  id: z.number(),
});

export type Partner = z.infer<typeof PartnerSchema>;

export const DummyDataSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export const EmployeeSchema = z.object({
  id: z.number(),
  nom: z.string(),
  prenom: z.string(),
  telephone: z.number(),
  email: z.string().email(),
  statut: z.string(),
});

export type Employee = z.infer<typeof EmployeeSchema>;

export type DummyData = z.infer<typeof DummyDataSchema>;

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});
