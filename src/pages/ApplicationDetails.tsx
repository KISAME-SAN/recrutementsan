import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const ApplicationDetails = () => {
  const { id } = useParams();

  const { data: application, isLoading } = useQuery({
    queryKey: ["application-details", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const getFileUrl = async (path: string) => {
    const { data } = await supabase.storage.from("documents").getPublicUrl(path);
    return data.publicUrl;
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* En-tête */}
              <div className="bg-primary p-6 text-white">
                <h1 className="text-3xl font-bold">
                  {application?.first_name} {application?.last_name}
                </h1>
                <p className="mt-2 text-primary-foreground/80">{application?.email}</p>
              </div>

              {/* Informations personnelles */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">
                      Informations personnelles
                    </h2>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Téléphone:</span>{" "}
                        {application?.phone}
                      </p>
                      <p>
                        <span className="font-medium">Genre:</span>{" "}
                        {application?.gender}
                      </p>
                      <p>
                        <span className="font-medium">Âge:</span>{" "}
                        {application?.age} ans
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">
                      Formation et expérience
                    </h2>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Diplôme:</span>{" "}
                        {application?.diploma}
                      </p>
                      <p>
                        <span className="font-medium">Années d'expérience:</span>{" "}
                        {application?.years_of_experience}
                      </p>
                      {application?.previous_company && (
                        <p>
                          <span className="font-medium">
                            Entreprise précédente:
                          </span>{" "}
                          {application?.previous_company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expérience et compétences */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-primary">
                    Expérience professionnelle
                  </h2>
                  <p className="whitespace-pre-wrap">
                    {application?.professional_experience}
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-primary">
                    Compétences
                  </h2>
                  <p className="whitespace-pre-wrap">{application?.skills}</p>
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-primary">Documents</h2>
                  <div className="flex gap-4">
                    <Button
                      onClick={async () => {
                        const url = await getFileUrl(application?.cv_url);
                        window.open(url, "_blank");
                      }}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-5 w-5" />
                      Voir le CV
                    </Button>
                    <Button
                      onClick={async () => {
                        const url = await getFileUrl(
                          application?.cover_letter_url
                        );
                        window.open(url, "_blank");
                      }}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-5 w-5" />
                      Voir la lettre de motivation
                    </Button>
                  </div>
                </div>

                {/* Statut */}
                <div className="pt-4 border-t">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                       style={{
                         backgroundColor: 
                           application?.status === "accepter" ? "rgb(34 197 94 / 0.1)" :
                           application?.status === "refuser" ? "rgb(239 68 68 / 0.1)" :
                           "rgb(234 179 8 / 0.1)",
                         color:
                           application?.status === "accepter" ? "rgb(34 197 94)" :
                           application?.status === "refuser" ? "rgb(239 68 68)" :
                           "rgb(234 179 8)"
                       }}>
                    {application?.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationDetails;