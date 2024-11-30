import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { Eye, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

const JobApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepter":
        return "bg-green-100 text-green-600";
      case "refuser":
        return "bg-red-100 text-red-600";
      case "en cours d'examination":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/application/${application.id}`)}
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
    </>
  );
};

export default JobApplications;