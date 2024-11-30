import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 px-4">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" />
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
  );
};

export default Login;