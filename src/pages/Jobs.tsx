import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Briefcase, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Job {
  id: string;
  title: string;
  location: string;
  department: string;
  contract_type: string;
  created_at: string;
  expiration_date: string;
}

const Jobs = () => {
  const navigate = useNavigate();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-primary">Offres d'emploi</h1>
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
          <h1 className="text-4xl font-bold mb-8 text-primary">Offres d'emploi</h1>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobs && jobs.length > 0 ? (
              jobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary mb-2 md:mb-0">{job.title}</h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                      {job.contract_type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Publié le: {format(new Date(job.created_at), "d MMMM yyyy", { locale: fr })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Date limite: {format(new Date(job.expiration_date), "d MMMM yyyy", { locale: fr })}</span>
                    </div>
                  </div>

                  <Button onClick={() => navigate(`/jobs/${job.id}`)}>
                    Voir plus
                  </Button>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Aucune offre d'emploi disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;