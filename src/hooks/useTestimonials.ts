
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image_url?: string;
  display_order: number;
  is_active: boolean;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('admin_testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('admin_testimonials')
        .insert([testimonial])
        .select()
        .single();

      if (error) throw error;

      setTestimonials(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    try {
      const { data, error } = await supabase
        .from('admin_testimonials')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial.id === id ? { ...testimonial, ...data } : testimonial
        )
      );
      return data;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    isLoading,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials
  };
};
