import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Kisame</div>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" onClick={() => navigate("/jobs")}>Offres d'emploi</Button>
            <Button variant="ghost" onClick={() => navigate("/login")}>Se connecter</Button>
            <Button variant="default" onClick={() => navigate("/register")}>S'inscrire</Button>
          </div>
          <Button variant="outline" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </Button>
        </div>
      </nav>

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
            <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
            <p className="text-muted-foreground">
              Devenir la référence de l'immobilier en offrant des solutions innovantes et personnalisées pour chaque client.
            </p>
          </Card>
          <Card className="p-6 fade-in hover-scale">
            <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
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
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
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