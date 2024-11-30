import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { ProfessionalInfoFields } from "./ProfessionalInfoFields";
import { DocumentFields } from "./DocumentFields";
import { ApplicationFormData, applyFormSchema } from "@/types/application";

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  isSubmitting: boolean;
}

export const ApplicationForm = ({ onSubmit, isSubmitting }: ApplicationFormProps) => {
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "homme",
      age: 18,
      professionalExperience: "",
      skills: "",
      diploma: "",
      yearsOfExperience: 0,
      previousCompany: "",
    },
  });

  const handleSubmit = async (values: ApplicationFormData) => {
    console.log("Formulaire soumis avec les valeurs:", values);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoFields form={form} />
        <ProfessionalInfoFields form={form} />
        <DocumentFields form={form} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
        </Button>
      </form>
    </Form>
  );
};