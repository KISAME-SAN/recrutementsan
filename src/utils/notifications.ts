import { supabase } from "@/lib/supabase";

export const createApplicationNotification = async (application: {
  first_name: string;
  last_name: string;
  job_id: string;
}) => {
  const { data: job } = await supabase
    .from("jobs")
    .select("title")
    .eq("id", application.job_id)
    .single();

  if (!job) return;

  await supabase.from("notifications").insert({
    title: "Nouvelle candidature",
    message: `${application.first_name} ${application.last_name} a postulé pour le poste "${job.title}"`,
    type: "application",
    read: false,
  });
};