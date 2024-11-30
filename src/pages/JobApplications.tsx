import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const JobApplications = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["job-applications", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("job_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
      const { error } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", applicationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications", id] });
      toast.success("Statut mis à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour du statut");
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
          <h1 className="text-3xl font-bold mb-8 text-primary">
            Candidatures
          </h1>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications?.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.last_name}</TableCell>
                    <TableCell>{application.first_name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.phone}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={async () => {
                            const url = await getFileUrl(application.cv_url);
                            window.open(url, "_blank");
                          }}
                          title="Voir le CV"
                        >
                          <FileText className="h-5 w-5 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={async () => {
                            const url = await getFileUrl(application.cover_letter_url);
                            window.open(url, "_blank");
                          }}
                          title="Voir la lettre de motivation"
                        >
                          <FileText className="h-5 w-5 text-blue-600" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={application.status}
                        onValueChange={(value) =>
                          updateStatusMutation.mutate({
                            applicationId: application.id,
                            status: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en attente">En attente</SelectItem>
                          <SelectItem value="en cours d'examination">
                            En cours d'examination
                          </SelectItem>
                          <SelectItem value="accepter">Accepté</SelectItem>
                          <SelectItem value="refuser">Refusé</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedApplication(application)}
                        title="Voir les détails"
                      >
                        <Eye className="h-5 w-5 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog
        open={!!selectedApplication}
        onOpenChange={() => setSelectedApplication(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Candidature de {selectedApplication?.first_name}{" "}
              {selectedApplication?.last_name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Informations personnelles</h3>
              <p>
                <span className="font-medium">Genre:</span>{" "}
                {selectedApplication?.gender}
              </p>
              <p>
                <span className="font-medium">Âge:</span>{" "}
                {selectedApplication?.age} ans
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedApplication?.email}
              </p>
              <p>
                <span className="font-medium">Téléphone:</span>{" "}
                {selectedApplication?.phone}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Formation et expérience</h3>
              <p>
                <span className="font-medium">Diplôme:</span>{" "}
                {selectedApplication?.diploma}
              </p>
              <p>
                <span className="font-medium">Années d'expérience:</span>{" "}
                {selectedApplication?.years_of_experience}
              </p>
              {selectedApplication?.previous_company && (
                <p>
                  <span className="font-medium">Entreprise précédente:</span>{" "}
                  {selectedApplication?.previous_company}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Expérience professionnelle</h3>
            <p className="whitespace-pre-wrap">
              {selectedApplication?.professional_experience}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Compétences</h3>
            <p className="whitespace-pre-wrap">{selectedApplication?.skills}</p>
          </div>

          <div className="mt-4 flex gap-4">
            <Button
              onClick={async () => {
                const url = await getFileUrl(selectedApplication?.cv_url);
                window.open(url, "_blank");
              }}
            >
              Voir le CV
            </Button>
            <Button
              onClick={async () => {
                const url = await getFileUrl(selectedApplication?.cover_letter_url);
                window.open(url, "_blank");
              }}
            >
              Voir la lettre de motivation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobApplications;