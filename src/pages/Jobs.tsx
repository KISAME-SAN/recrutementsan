import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Briefcase, Clock } from "lucide-react";

const Jobs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-primary">Offres d'emploi</h1>
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 className="text-2xl font-bold text-primary mb-2 md:mb-0">Conseiller Immobilier Senior</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                  CDI
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>Département Commercial</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Publié le: 15 Mars 2024</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Date limite: 15 Avril 2024</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Nous recherchons un conseiller immobilier expérimenté pour rejoindre notre équipe dynamique. 
                Le candidat idéal aura une excellente connaissance du marché immobilier parisien et une 
                capacité démontrée à développer et maintenir des relations clients durables.
              </p>

              <Button 
                onClick={() => navigate("/jobs/conseiller-senior")} 
                className="w-full md:w-auto"
              >
                Voir plus
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;