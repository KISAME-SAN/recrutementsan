import { supabase } from "@/lib/supabase";

export const createApplicationNotification = async (application: {
  first_name: string;
  last_name: string;
  job_id: string;
}) => {
  // Récupérer le titre du poste
  const { data: job } = await supabase
    .from("jobs")
    .select("title")
    .eq("id", application.job_id)
    .single();

  if (!job) {
    console.error("Job not found");
    return;
  }

  // Créer la notification
  const { error } = await supabase.from("notifications").insert({
    title: "Nouvelle candidature",
    message: `${application.first_name} ${application.last_name} a postulé pour le poste "${job.title}"`,
    type: "application",
    read: false,
  });

  if (error) {
    console.error("Error creating notification:", error);
  }
};