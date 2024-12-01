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

    // Récupérer le premier administrateur trouvé avec plus de logs
    console.log("Recherche des administrateurs...");
    const { data: admins, error: adminError } = await supabase
      .from("profiles")
      .select("*")  // Sélectionner tous les champs pour le debug
      .eq("is_admin", true)
      .limit(1);

    console.log("Résultat de la requête admin:", { admins, adminError });

    if (adminError) {
      console.error("Erreur lors de la récupération de l'admin:", adminError);
      throw adminError;
    }

    if (!admins || admins.length === 0) {
      console.error("Aucun admin trouvé dans la base de données");
      console.error("Contenu de la réponse:", admins);
      const error = new Error("Aucun administrateur trouvé");
      throw error;
    }

    const adminId = admins[0].id;
    console.log("Admin trouvé:", admins[0]);

    // Créer la notification
    const { data: notification, error: notificationError } = await supabase
      .from("notifications")
      .insert({
        title: "Nouvelle candidature",
        message: `${application.first_name} ${application.last_name} a postulé pour le poste "${job.title}"`,
        type: "application",
        read: false,
        user_id: adminId,
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