import { supabase } from "@/lib/supabase";

// Créer une notification pour l'admin quand un utilisateur postule
export const createApplicationNotification = async (application: {
  first_name: string;
  last_name: string;
  job_id: string;
  application_id: string;
}) => {
  console.log("Début de la création de notification pour:", application);

  try {
    // Récupérer le titre du poste et le créateur avec plus de détails
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*, created_by, title")
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

    // Utiliser un titre par défaut si le job n'a pas de titre
    const jobTitle = job.title || "Poste non spécifié";

    // Récupérer l'admin (créateur du job ou admin par défaut)
    let adminId = job.created_by;
    if (!adminId) {
      console.log("Recherche d'un admin par défaut...");
      const { data: adminUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("is_admin", true)
        .single();

      if (!adminUser) {
        throw new Error("Aucun administrateur trouvé pour recevoir la notification");
      }
      
      adminId = adminUser.id;
      console.log("Utilisation de l'admin par défaut:", adminId);
    }

    // Créer la notification pour l'admin
    const adminNotificationData = {
      message: `${application.first_name} ${application.last_name} a postulé pour le poste "${jobTitle}"`,
      is_read: false,
      admin_id: adminId,
      application_id: application.application_id,
      type: "admin_new_application",
      status: "en attente"
    };

    const { error: adminNotificationError } = await supabase
      .from("notifications")
      .insert([adminNotificationData]);

    if (adminNotificationError) {
      console.error("Erreur lors de la création de la notification admin:", adminNotificationError);
      throw adminNotificationError;
    }

    console.log("Notification admin créée avec succès");
  } catch (error) {
    console.error("Erreur lors de la création de la notification:", error);
    throw error;
  }
};

interface CreateNotificationParams {
  message: string;
  userId?: string;
  adminId?: string;
  applicationId: string;
  notificationType: string;
}

export async function createNotification({
  message,
  userId,
  adminId,
  applicationId,
  notificationType
}: CreateNotificationParams) {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert([
        {
          message,
          user_id: userId,
          admin_id: adminId,
          application_id: applicationId,
          notification_type: notificationType,
          is_read: false
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
    throw error;
  }
}

// Nouvelle fonction pour créer une notification de changement de statut
export async function createStatusChangeNotification(
  applicationId: string,
  userId: string,
  newStatus: string
) {
  try {
    console.log(`Création d'une notification de changement de statut pour l'utilisateur ${userId}`, {
      applicationId,
      newStatus
    });

    // Récupérer la dernière notification pour cette candidature
    const { data: lastNotification } = await supabase
      .from('notifications')
      .select('*')
      .eq('application_id', applicationId)
      .eq('user_id', userId)
      .eq('notification_type', 'status_change')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Si une notification existe déjà avec le même statut, ne pas en créer une nouvelle
    if (lastNotification?.message?.includes(newStatus)) {
      console.log('Une notification pour ce statut existe déjà');
      return;
    }

    const statusMessages: { [key: string]: string } = {
      'pending': 'Votre candidature est en attente d\'examen',
      'reviewing': 'Votre candidature est en cours d\'examen',
      'accepted': 'Félicitations ! Votre candidature a été acceptée',
      'rejected': 'Votre candidature n\'a malheureusement pas été retenue',
      'archived': 'Votre candidature a été archivée',
      'en cours d\'examination': 'Votre candidature est en cours d\'examen',
      'accepter': 'Félicitations ! Votre candidature a été acceptée',
      'refuser': 'Votre candidature n\'a malheureusement pas été retenue'
    };

    const message = statusMessages[newStatus] || `Le statut de votre candidature a été mis à jour: ${newStatus}`;

    // Créer la nouvelle notification
    await createNotification({
      message,
      userId,
      applicationId,
      notificationType: 'status_change'
    });

    console.log('Notification de changement de statut créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la notification de changement de statut:', error);
    throw error;
  }
}

// Créer une notification pour l'utilisateur quand le statut de sa candidature change
export const createStatusChangeNotificationOld = async (
  applicationId: string,
  newStatus: string,
  userId: string
) => {
  try {
    // Vérifier s'il existe déjà une notification similaire non lue
    const { data: existingNotifications } = await supabase
      .from("notifications")
      .select("*")
      .eq("application_id", applicationId)
      .eq("user_id", userId)
      .eq("is_read", false)
      .eq("type", "user_status_change")
      .single();

    if (existingNotifications) {
      console.log("Une notification non lue existe déjà pour cette mise à jour");
      return;
    }

    // Récupérer les détails de la candidature
    const { data: application, error: applicationError } = await supabase
      .from("applications")
      .select("*, jobs(title)")
      .eq("id", applicationId)
      .single();

    if (applicationError) throw applicationError;

    const jobTitle = application.jobs?.title || "Poste non spécifié";
    const statusMessage = {
      "accepté": "a été acceptée",
      "refusé": "a été refusée",
      "en attente": "est en cours d'examen",
      "en cours": "est en cours de traitement"
    }[newStatus] || "a été mise à jour";

    // Créer la notification pour l'utilisateur
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([{
        message: `Votre candidature pour "${jobTitle}" ${statusMessage}`,
        user_id: userId,
        application_id: applicationId,
        is_read: false,
        type: "user_status_change",
        status: newStatus
      }]);

    if (notificationError) throw notificationError;

    console.log("Notification de changement de statut créée avec succès");
  } catch (error) {
    console.error("Erreur lors de la création de la notification de statut:", error);
    throw error;
  }
};