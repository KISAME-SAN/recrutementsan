import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
          Kisame
        </div>
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
  );
};

export default Navbar;