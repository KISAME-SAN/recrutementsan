import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Clock, 
  GraduationCap, 
  Languages, 
  Target, 
  Users,
  Building
} from "lucide-react";

const JobDetails = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-4">Conseiller Immobilier Senior</h1>
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
                  <span>Bac +3 minimum</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="fr" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fr">Français</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="wo">Wolof</TabsTrigger>
              </TabsList>
              <TabsContent value="fr" className="space-y-6">
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
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Profil recherché
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>5 ans d'expérience minimum dans l'immobilier de luxe</li>
                    <li>Excellentes capacités de négociation et de communication</li>
                    <li>Maîtrise des outils digitaux et des réseaux sociaux</li>
                    <li>Grande disponibilité et flexibilité horaire</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Compétences linguistiques
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Français : Natif ou C2</li>
                    <li>Anglais : B2 minimum</li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="en" className="space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Job Description
                  </h2>
                  <p className="text-muted-foreground">
                    As a Senior Real Estate Advisor, you will be responsible for managing and 
                    developing a portfolio of high-end properties. You will assist our clients 
                    in their acquisition or sale projects, providing them with expert knowledge 
                    of the Parisian real estate market.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Required Profile
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Minimum 5 years experience in luxury real estate</li>
                    <li>Excellent negotiation and communication skills</li>
                    <li>Proficiency in digital tools and social networks</li>
                    <li>High availability and schedule flexibility</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Language Skills
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>French: Native or C2</li>
                    <li>English: B2 minimum</li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="wo" className="space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Tëralinu Liggéey bi
                  </h2>
                  <p className="text-muted-foreground">
                    Ni Conseiller Immobilier Senior, dinga saytu ak yokk portefeuille bu am 
                    këri yu baax. Dinga ànd ak sunu clients yi ci seeni projets jënd walla 
                    jaay, di leen jox xam-xam bu mat ci marché immobilier bu Paris.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Profil bi ñuy seet
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>5 at minimum ci immobilier bu rafet</li>
                    <li>Meñ négociation ak communication bu baax</li>
                    <li>Xam digital tools ak réseaux sociaux yi</li>
                    <li>Am disponibilité ak flexibilité ci waxtu yi</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Xam-xam ci làkk yi
                  </h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Français : Làkk dégg walla C2</li>
                    <li>Anglais : B2 minimum</li>
                  </ul>
                </section>
              </TabsContent>
            </Tabs>

            <Button size="lg" className="w-full md:w-auto">
              Postuler maintenant
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default JobDetails;