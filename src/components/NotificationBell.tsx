import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NotificationBell = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);

  // Charger les notifications initiales
  useEffect(() => {
    const loadNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Erreur lors du chargement des notifications:", error);
        return;
      }

      if (data) {
        setNotifications(data);
      }
    };

    loadNotifications();
  }, []);

  // Configurer l'écoute Realtime
  useEffect(() => {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          console.log('Nouvelle notification reçue:', payload);
          const newNotification = payload.new;
          
          // Ajouter la nouvelle notification à l'état
          setNotifications(currentNotifications => {
            const updatedNotifications = [newNotification, ...currentNotifications].slice(0, 5);
            return updatedNotifications;
          });

          // Afficher un toast pour la nouvelle notification
          toast({
            title: newNotification.title,
            description: newNotification.message,
          });
        }
      )
      .subscribe();

    // Cleanup lors du démontage du composant
    return () => {
      channel.unsubscribe();
    };
  }, [toast]);

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications?.map((notification) => (
          <DropdownMenuItem key={notification.id} className="p-4">
            <div>
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-gray-500">{notification.message}</p>
            </div>
          </DropdownMenuItem>
        ))}
        {(!notifications || notifications.length === 0) && (
          <DropdownMenuItem disabled>
            Aucune notification
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;