import { useState } from "react";
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

// Type pour une offre d'emploi
interface Job {
  id: string;
  title: string;
  createdAt: Date;
  isActive: boolean;
}

const ManageJobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Données temporaires pour démonstration
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Conseiller Immobilier Senior",
      createdAt: new Date("2024-03-15"),
      isActive: true,
    },
    {
      id: "2",
      title: "Développeur Full Stack",
      createdAt: new Date("2024-03-10"),
      isActive: false,
    },
  ]);

  const handleToggleActive = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
    toast({
      description: "Le statut de l'offre a été mis à jour",
    });
  };

  const handleDelete = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      description: "L'offre a été supprimée avec succès",
    });
  };

  const handleEdit = (jobId: string) => {
    navigate(`/admin/edit-job/${jobId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des offres d'emploi</h1>
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
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      {format(job.createdAt, "d MMMM yyyy", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      {job.isActive ? (
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
                          onClick={() => handleToggleActive(job.id)}
                          title={job.isActive ? "Désactiver" : "Activer"}
                        >
                          {job.isActive ? (
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