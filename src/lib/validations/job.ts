import * as z from "zod";

export const createJobFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  positions: z.string().min(1, "Le nombre de postes est requis"),
  location: z.string().min(1, "Le lieu de travail est requis"),
  contractType: z.string().min(1, "Le type de contrat est requis"),
  department: z.string().min(1, "Le département est requis"),
  expirationDate: z.string().min(1, "La date d'expiration est requise"),
  diploma: z.string().min(1, "Le diplôme requis est requis"),
  description: z.string().min(1, "La description du poste est requise"),
  technicalSkills: z.string().min(1, "Les compétences techniques sont requises"),
  softSkills: z.string().min(1, "Les compétences comportementales sont requises"),
  tools: z.string().min(1, "Les outils à maîtriser sont requis"),
  experience: z.string().min(1, "L'expérience requise est requise"),
  frenchLevel: z.string().min(1, "Le niveau en français est requis"),
  englishLevel: z.string().min(1, "Le niveau en anglais est requis"),
  wolofLevel: z.string().min(1, "Le niveau en wolof est requis"),
});