import { FilePlus, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-primary">Panneau d'administration</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Carte Créer une offre */}
            <Card 
              className="p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/admin/create-job")}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FilePlus className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Créer une offre d'emploi</h2>
                <p className="text-muted-foreground">
                  Publiez une nouvelle offre d'emploi et gérez les détails du poste
                </p>
              </div>
            </Card>

            {/* Carte Gestion des offres */}
            <Card 
              className="p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/admin/manage-jobs")}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <List className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Gestion des offres</h2>
                <p className="text-muted-foreground">
                  Consultez, modifiez ou supprimez les offres d'emploi existantes
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;