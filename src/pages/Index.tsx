
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Articles from '@/components/Articles';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useThemeSettings } from '@/hooks/useThemeSettings';
import { useEffect } from 'react';

const Index = () => {
  const { fetchThemeSettings } = useThemeSettings();

  useEffect(() => {
    fetchThemeSettings();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
     
      <Services />
      <Articles />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
