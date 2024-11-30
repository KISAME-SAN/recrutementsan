import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAdmin();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace administrateur",
      });
      navigate("/");
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4">
        <Card className="max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Connexion</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="votre@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">Se connecter</Button>
          </form>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Pas encore de compte?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate("/register")}>
              S'inscrire
            </Button>
          </p>
        </Card>
      </div>
    </>
  );
};

export default Login;