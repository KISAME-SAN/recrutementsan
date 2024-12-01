import { supabase } from "@/lib/supabase";

export const createApplicationNotification = async (application: {
  first_name: string;
  last_name: string;
  job_id: string;
}) => {
  console.log("Début de la création de notification pour:", application);

  try {
    // Récupérer le titre du poste
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("title")
      .eq("id", application.job_id)
      .single();

    if (jobError) {
      console.error("Erreur lors de la récupération du job:", jobError);
      throw jobError;
    }

    if (!job) {
      const error = new Error("Job non trouvé pour l'id: " + application.job_id);
      console.error(error);
      throw error;
    }

    console.log("Job trouvé:", job);

    // Créer directement la notification
    const { data: notification, error: notificationError } = await supabase
      .from("notifications")
      .insert({
        title: "Nouvelle candidature",
        message: `${application.first_name} ${application.last_name} a postulé pour le poste "${job.title}"`,
        read: false
      })
      .select()
      .single();

    if (notificationError) {
      console.error("Erreur lors de la création de la notification:", notificationError);
      throw notificationError;
    }

    console.log("Notification créée avec succès:", notification);
    return notification;
  } catch (error) {
    console.error("Erreur lors de la création de la notification:", error);
    throw error;
  }
};