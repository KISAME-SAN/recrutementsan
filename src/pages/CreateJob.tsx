import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { createJobFormSchema } from "@/lib/validations/job";
import { useCreateJobForm } from "@/hooks/use-create-job-form";
import { JobFormFields } from "@/components/job-form/JobFormFields";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const CreateJob = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useCreateJobForm();

  const onSubmit = async (values: z.infer<typeof createJobFormSchema>) => {
    setIsSubmitting(true);
    try {
      // Récupérer l'utilisateur connecté
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error("Vous devez être connecté pour créer une offre");
      }

      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      console.log("Création d'une offre par l'utilisateur:", user.id);

      const { error } = await supabase.from("jobs").insert([
        {
          title: values.title,
          positions: parseInt(values.positions),
          location: values.location,
          contract_type: values.contractType,
          department: values.department,
          expiration_date: values.expirationDate,
          diploma: values.diploma,
          description: values.description,
          technical_skills: values.technicalSkills,
          soft_skills: values.softSkills,
          tools: values.tools,
          experience: values.experience,
          french_level: values.frenchLevel,
          english_level: values.englishLevel,
          wolof_level: values.wolofLevel,
          created_by: user.id, // Ajouter l'ID de l'utilisateur connecté
        },
      ]);

      if (error) throw error;
      
      toast.success("L'offre d'emploi a été créée avec succès");
      navigate("/admin");
    } catch (error) {
      console.error("Erreur lors de la création de l'offre:", error);
      toast.error("Une erreur est survenue lors de la création de l'offre");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">
              Créer une offre d'emploi
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <JobFormFields form={form} />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin")}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Création en cours..." : "Créer l'offre"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;