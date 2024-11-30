import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Clock, 
  GraduationCap,
  Target,
  Users,
  Building,
  CheckCircle2,
  Laptop2,
  Brain,
  BookOpen
} from "lucide-react";

const JobDetails = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-primary">Conseiller Immobilier Senior</h1>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                  2 postes disponibles
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>CDI</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>Commercial</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Publié: 15 Mars 2024</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Expire: 15 Avril 2024</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>Bac +3 en Commerce/Immobilier</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Description du poste
                </h2>
                <p className="text-muted-foreground">
                  En tant que Conseiller Immobilier Senior, vous serez responsable de la gestion 
                  et du développement d'un portefeuille de biens immobiliers haut de gamme. Vous 
                  accompagnerez nos clients dans leurs projets d'acquisition ou de vente, en 
                  leur apportant une expertise pointue du marché immobilier parisien.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Développement et gestion d'un portefeuille clients premium</li>
                  <li>Prospection active et qualification des opportunités</li>
                  <li>Estimation et valorisation des biens immobiliers</li>
                  <li>Négociation et accompagnement jusqu'à la signature</li>
                  <li>Veille concurrentielle et analyse du marché local</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Compétences techniques requises
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Maîtrise des techniques de prospection et de négociation</li>
                  <li>Connaissance approfondie du marché immobilier parisien</li>
                  <li>Expertise en évaluation immobilière</li>
                  <li>Compréhension des aspects juridiques de l'immobilier</li>
                  <li>Maîtrise du droit immobilier et des contrats de vente</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Compétences comportementales
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Excellence relationnelle et sens du service client</li>
                  <li>Capacité d'écoute et d'analyse des besoins</li>
                  <li>Rigueur et organisation dans le suivi des dossiers</li>
                  <li>Autonomie et esprit d'initiative</li>
                  <li>Résilience et gestion du stress</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Laptop2 className="h-5 w-5" />
                  Outils à maîtriser
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Suite Microsoft Office (Excel, Word, PowerPoint)</li>
                  <li>CRM immobilier</li>
                  <li>Outils de signature électronique</li>
                  <li>Logiciels d'estimation immobilière</li>
                  <li>Réseaux sociaux professionnels</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Formation et expérience
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Bac +3 minimum en Commerce, Immobilier ou équivalent</li>
                  <li>5 ans d'expérience minimum dans l'immobilier de luxe</li>
                  <li>Carte professionnelle T requise</li>
                  <li>Formation continue en droit immobilier appréciée</li>
                </ul>
              </section>
            </div>

            <div className="mt-8">
              <Button size="lg" className="w-full md:w-auto">
                Postuler maintenant
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default JobDetails;