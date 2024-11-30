import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useCreateJobForm } from "@/hooks/use-create-job-form";
import { JobFormFields } from "@/components/job-form/JobFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Navbar from "@/components/Navbar";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useCreateJobForm();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        positions: job.positions.toString(),
        location: job.location,
        contractType: job.contract_type,
        department: job.department,
        expirationDate: job.expiration_date,
        diploma: job.diploma,
        description: job.description,
        technicalSkills: job.technical_skills,
        softSkills: job.soft_skills,
        tools: job.tools,
        experience: job.experience,
        frenchLevel: job.french_level,
        englishLevel: job.english_level,
        wolofLevel: job.wolof_level,
      });
    }
  }, [job]);

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({
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
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("L'offre a été modifiée avec succès");
      navigate("/admin/manage-jobs");
    } catch (error) {
      console.error("Erreur lors de la modification de l'offre:", error);
      toast.error("Une erreur est survenue lors de la modification de l'offre");
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Offre non trouvée
              </h1>
              <Button
                onClick={() => navigate("/admin/manage-jobs")}
                className="mt-4"
              >
                Retour à la liste
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">
              Modifier l'offre d'emploi
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <JobFormFields form={form} />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/manage-jobs")}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    Enregistrer les modifications
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

export default EditJob;