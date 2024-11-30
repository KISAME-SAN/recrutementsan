import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Jobs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Offres d'emploi</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <Card key={index} className="p-6 hover-scale">
                <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                <p className="text-muted-foreground mb-4">{job.location}</p>
                <p className="mb-4">{job.shortDescription}</p>
                <Button onClick={() => navigate(`/jobs/${index}`)}>
                  Voir plus
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const jobs = [
  {
    title: "Conseiller Immobilier Senior",
    location: "Paris",
    shortDescription: "Nous recherchons un conseiller immobilier expérimenté pour rejoindre notre équipe dynamique."
  },
  {
    title: "Gestionnaire de Patrimoine",
    location: "Lyon",
    shortDescription: "Poste à pourvoir pour un gestionnaire de patrimoine spécialisé dans l'immobilier de luxe."
  },
  {
    title: "Agent Immobilier Junior",
    location: "Bordeaux",
    shortDescription: "Débutez votre carrière dans l'immobilier au sein d'une entreprise innovante."
  },
  {
    title: "Responsable Marketing Digital",
    location: "Paris",
    shortDescription: "Prenez en charge notre stratégie marketing digital et développez notre présence en ligne."
  }
];

export default Jobs;