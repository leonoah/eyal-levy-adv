
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const PROJECT_ID = 'eyal_levi_adv';

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  project_id: string;
  created_at: string;
  updated_at: string;
}

export const useTestimonials = () => {
  const queryClient = useQueryClient();

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

  const addTestimonialMutation = useMutation({
    mutationFn: async (newTestimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('admin_testimonials')
        .insert({
          ...newTestimonial,
          project_id: PROJECT_ID
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials', PROJECT_ID] });
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Testimonial> & { id: string }) => {
      const { data, error } = await supabase
        .from('admin_testimonials')
        .update(updates)
        .eq('id', id)
        .eq('project_id', PROJECT_ID)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials', PROJECT_ID] });
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('admin_testimonials')
        .delete()
        .eq('id', id)
        .eq('project_id', PROJECT_ID);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials', PROJECT_ID] });
    },
  });

  return {
    testimonials: testimonials || [],
    isLoading,
    error,
    addTestimonial: addTestimonialMutation.mutate,
    updateTestimonial: updateTestimonialMutation.mutate,
    deleteTestimonial: deleteTestimonialMutation.mutate,
  };
};
