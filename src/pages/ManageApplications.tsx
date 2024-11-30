import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ManageApplications = () => {
  const navigate = useNavigate();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs-with-applications"],
    queryFn: async () => {
      const { data: jobs, error } = await supabase
        .from("jobs")
        .select(`
          *,
          applications:applications(count)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return jobs;
    },
  });

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
            Gestion des candidatures
          </h1>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre de l'offre</TableHead>
                  <TableHead>Date de publication</TableHead>
                  <TableHead>Nombre de candidatures</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs?.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      {format(new Date(job.created_at), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell>{job.applications[0].count}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/applications/${job.id}`)}
                        title="Voir les candidatures"
                      >
                        <Users className="h-5 w-5 text-primary" />
                      </Button>
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

export default ManageApplications;