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

const NotificationBell = () => {
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    // Rafraîchir toutes les 10 secondes
    refetchInterval: 10000,
    // Rafraîchir quand la fenêtre reprend le focus
    refetchOnWindowFocus: true,
  });

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