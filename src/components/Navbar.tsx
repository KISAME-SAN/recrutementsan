import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-primary">
              KISAME
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a
                href="/jobs"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Offres d'emploi
              </a>
              {isAdmin && (
                <a
                  href="/admin"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Panneau d'administration
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && <NotificationBell />}
            {user ? (
              <Button
                variant="ghost"
                className="gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Connexion</span>
                </Button>
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={() => navigate("/register")}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Inscription</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;