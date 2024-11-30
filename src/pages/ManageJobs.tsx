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
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Edit, Trash, ToggleLeft, ToggleRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Récupération des offres
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Mutation pour activer/désactiver une offre
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ jobId, isActive }: { jobId: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("jobs")
        .update({ is_active: isActive })
        .eq("id", jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        description: "Le statut de l'offre a été mis à jour",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast({
        variant: "destructive",
        description: "Erreur lors de la mise à jour du statut",
      });
    },
  });

  // Mutation pour supprimer une offre
  const deleteMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        description: "L'offre a été supprimée avec succès",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
      toast({
        variant: "destructive",
        description: "Erreur lors de la suppression de l'offre",
      });
    },
  });

  const handleToggleActive = (jobId: string, currentStatus: boolean) => {
    toggleActiveMutation.mutate({ jobId, isActive: !currentStatus });
  };

  const handleDelete = (jobId: string) => {
    deleteMutation.mutate(jobId);
  };

  const handleEdit = (jobId: string) => {
    navigate(`/admin/edit-job/${jobId}`);
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Gestion des offres d'emploi
            </h1>
            <Button onClick={() => navigate("/admin/create-job")}>
              Créer une nouvelle offre
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre de l'offre</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs && jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      {format(new Date(job.created_at), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell>
                      {job.is_active ? (
                        <span className="text-green-600 font-medium">Actif</span>
                      ) : (
                        <span className="text-gray-500 font-medium">Inactif</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(job.id, job.is_active)}
                          title={job.is_active ? "Désactiver" : "Activer"}
                        >
                          {job.is_active ? (
                            <ToggleRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-gray-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(job.id)}
                          title="Modifier"
                        >
                          <Edit className="h-5 w-5 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(job.id)}
                          title="Supprimer"
                        >
                          <Trash className="h-5 w-5 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageJobs;