
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Articles from '@/components/Articles';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-lawyer-black">
      <Header />
      <Hero />
      <Services />
      <About />
      <Articles />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
