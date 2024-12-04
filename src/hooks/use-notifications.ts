import { useEffect, useState } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  application_id: string;
  admin_id: string;
  notification_type: string;
  action_url?: string;
}

// Ce hook est UNIQUEMENT pour les notifications admin
export function useNotifications() {
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  // Requête pour obtenir les notifications admin
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      // Utiliser la vue unread_notifications pour les notifications non lues
      const { data: unreadData, error: unreadError } = await supabase
        .from('unread_notifications')
        .select('*')
        .eq('admin_id', user.id)
        .order('created_at', { ascending: false });

      if (unreadError) throw unreadError;

      // Obtenir aussi les notifications lues récentes (derniers 30 jours)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: readData, error: readError } = await supabase
        .from('notifications')
        .select('*')
        .eq('admin_id', user.id)
        .eq('is_read', true)
        .gte('read_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(50);

      if (readError) throw readError;

      // Combiner et trier les notifications
      const allNotifications = [...(unreadData || []), ...(readData || [])].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      return allNotifications as Notification[];
    },
    staleTime: 30000, // 30 secondes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });

  // Écouter les nouvelles notifications admin en temps réel
  useEffect(() => {
    let channel: any;

    const initializeChannel = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel('admin-notifications')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `admin_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('[Admin Notification] Event:', payload.eventType);
            
            if (payload.eventType === 'INSERT') {
              queryClient.setQueryData(['admin-notifications'], (old: any) => {
                const newNotification = payload.new;
                return [newNotification, ...(old || [])];
              });
              toast(payload.new.message);
            } else if (payload.eventType === 'UPDATE') {
              queryClient.setQueryData(['admin-notifications'], (old: any) => {
                return (old || []).map((n: Notification) =>
                  n.id === payload.new.id ? payload.new : n
                );
              });
            }
          }
        )
        .subscribe();
    };

    initializeChannel();

    return () => {
      if (channel) {
        console.log('Unsubscribing from admin notifications');
        supabase.removeChannel(channel);
      }
    };
  }, [queryClient]);

  // Mettre à jour le compteur de notifications non lues
  useEffect(() => {
    if (notifications) {
      const count = notifications.filter(n => !n.is_read).length;
      setUnreadCount(count);
    }
  }, [notifications]);

  // Marquer une notification comme lue
  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .rpc('mark_notification_as_read', { notification_id: notificationId });

    if (error) {
      toast.error('Erreur lors de la mise à jour de la notification');
      return;
    }

    // Mise à jour optimiste
    queryClient.setQueryData(['admin-notifications'], (old: any) => {
      return (old || []).map((n: Notification) =>
        n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
      );
    });
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .rpc('mark_all_notifications_as_read', { 
        user_uuid: user.id,
        is_admin: true
      });

    if (error) {
      toast.error('Erreur lors de la mise à jour des notifications');
      return;
    }

    // Mise à jour optimiste
    queryClient.setQueryData(['admin-notifications'], (old: any) => {
      return (old || []).map((n: Notification) => ({
        ...n,
        is_read: true,
        read_at: new Date().toISOString()
      }));
    });
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isLoading,
  };
}
