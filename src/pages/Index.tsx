
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Articles from '@/components/Articles';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

const Index = () => {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <LanguageToggle />
      <Header />
      <Hero />
      <About />
      <Services />
      <Articles />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
