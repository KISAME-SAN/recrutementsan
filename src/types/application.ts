import { z } from "zod";

export const applyFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  gender: z.enum(["homme", "femme"]),
  age: z.coerce.number().min(18, "Vous devez avoir au moins 18 ans"),
  professionalExperience: z.string().min(10, "Veuillez décrire votre expérience"),
  skills: z.string().min(10, "Veuillez décrire vos compétences"),
  diploma: z.string().min(2, "Diplôme requis"),
  yearsOfExperience: z.coerce.number().min(0, "Nombre d'années invalide"),
  previousCompany: z.string().optional(),
  cv: z.instanceof(File, { message: "CV requis" }),
  coverLetter: z.instanceof(File, { message: "Lettre de motivation requise" }),
});

export type ApplicationFormData = z.infer<typeof applyFormSchema>;