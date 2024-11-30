import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Lightbulb, Target, ListChecks } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
            Votre partenaire immobilier de confiance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 fade-in">
            Kisame vous accompagne dans tous vos projets immobiliers avec expertise et professionnalisme
          </p>
          <Button size="lg" className="fade-in" onClick={() => navigate("/contact")}>
            Découvrir nos services
          </Button>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 bg-muted/50 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <Card className="p-6 fade-in hover-scale">
            <div className="flex items-center gap-4 mb-4">
              <Lightbulb className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Notre Vision</h2>
            </div>
            <p className="text-muted-foreground">
              Devenir la référence de l'immobilier en offrant des solutions innovantes et personnalisées pour chaque client.
            </p>
          </Card>
          <Card className="p-6 fade-in hover-scale">
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Notre Mission</h2>
            </div>
            <p className="text-muted-foreground">
              Accompagner nos clients dans la réalisation de leurs projets immobiliers en leur garantissant un service d'excellence.
            </p>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
            Nos Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 fade-in hover-scale">
                <div className="flex items-center gap-4 mb-4">
                  <ListChecks className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    title: "Vente immobilière",
    description: "Nous vous accompagnons dans la vente de votre bien avec une stratégie personnalisée."
  },
  {
    title: "Achat immobilier",
    description: "Trouvez le bien de vos rêves grâce à notre sélection exclusive de propriétés."
  },
  {
    title: "Conseil patrimonial",
    description: "Optimisez votre patrimoine immobilier avec nos experts dédiés."
  }
];

export default Index;