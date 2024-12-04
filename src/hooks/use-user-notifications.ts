import { useEffect, useState } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  application_id: string;
  user_id: string;
}

// Ce hook est UNIQUEMENT pour les notifications utilisateur
export function useUserNotifications() {
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  // Requête pour obtenir les notifications utilisateur
  const { data: notifications = [] } = useQuery({
    queryKey: ['user-notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      // Obtenir les notifications non lues
      const { data: unreadData, error: unreadError } = await supabase
        .from('unread_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (unreadError) throw unreadError;

      // Obtenir les notifications lues récentes (30 derniers jours)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: readData, error: readError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', true)
        .gte('read_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(50);

      if (readError) throw readError;

      // Combiner et trier
      const allNotifications = [...(unreadData || []), ...(readData || [])].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      return allNotifications as Notification[];
    },
  });

  // Une seule souscription aux notifications utilisateur
  useEffect(() => {
    let channel: any;

    const initializeChannel = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel('user-notifications')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('[User Notification] Event:', payload.eventType);
            
            if (payload.eventType === 'INSERT') {
              queryClient.setQueryData(['user-notifications'], (old: any) => {
                const newNotification = payload.new;
                return [newNotification, ...(old || [])];
              });
              toast(payload.new.message);
            } else if (payload.eventType === 'UPDATE') {
              queryClient.setQueryData(['user-notifications'], (old: any) => {
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
        console.log('Unsubscribing from user notifications');
        supabase.removeChannel(channel);
      }
    };
  }, [queryClient]);

  // Mettre à jour le compteur
  useEffect(() => {
    if (notifications) {
      const count = notifications.filter(n => !n.is_read).length;
      setUnreadCount(count);
    }
  }, [notifications]);

  // Marquer comme lu
  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .rpc('mark_notification_as_read', { notification_id: notificationId });

    if (error) {
      toast.error('Erreur lors de la mise à jour de la notification');
      return;
    }

    // Mise à jour optimiste
    queryClient.setQueryData(['user-notifications'], (old: any) => {
      return (old || []).map((n: Notification) =>
        n.id === notificationId ? { ...n, is_read: true } : n
      );
    });
  };

  // Tout marquer comme lu
  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .rpc('mark_all_notifications_as_read', { 
        user_uuid: user.id,
        is_admin: false
      });

    if (error) {
      toast.error('Erreur lors de la mise à jour des notifications');
      return;
    }

    // Mise à jour optimiste
    queryClient.setQueryData(['user-notifications'], (old: any) => {
      return (old || []).map((n: Notification) => ({
        ...n,
        is_read: true
      }));
    });
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
