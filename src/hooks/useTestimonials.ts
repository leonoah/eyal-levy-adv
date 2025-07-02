
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const PROJECT_ID = 'eyal_levi_adv';

export const useTestimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials', PROJECT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_testimonials')
        .select('*')
        .eq('project_id', PROJECT_ID)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }

      return data || [];
    },
  });

  return {
    testimonials: testimonials || [],
    isLoading,
    error
  };
};
