import { supabase } from "@/lib/supabase";

export const createApplicationNotification = async (application: {
  first_name: string;
  last_name: string;
  job_id: string;
}) => {
  console.log("Début de la création de notification pour:", application);

  try {
    // Récupérer le titre du poste et le créateur avec plus de détails
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*, created_by")
      .eq("id", application.job_id)
      .single();

    console.log("Données complètes du job récupéré:", job);

    if (jobError) {
      console.error("Erreur lors de la récupération du job:", jobError);
      throw jobError;
    }

    if (!job) {
      const error = new Error("Job non trouvé pour l'id: " + application.job_id);
      console.error(error);
      throw error;
    }

    if (!job.created_by) {
      console.error("Job sans créateur:", job);
      // Au lieu de throw une erreur, on peut créer la notification pour un admin par défaut
      const { data: adminUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("is_admin", true)
        .single();

      if (!adminUser) {
        throw new Error("Aucun administrateur trouvé pour recevoir la notification");
      }
      
      job.created_by = adminUser.id;
      console.log("Utilisation de l'admin par défaut comme créateur:", adminUser.id);
    }

    console.log("Créateur du job (user_id):", job.created_by);

    // Créer la notification pour le créateur de l'offre
    const { data: notification, error: notificationError } = await supabase
      .from("notifications")
      .insert({
        title: "Nouvelle candidature",
        message: `${application.first_name} ${application.last_name} a postulé pour le poste "${job.title}"`,
        read: false,
        user_id: job.created_by
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