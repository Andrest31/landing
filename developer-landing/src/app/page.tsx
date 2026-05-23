import { About } from '@/components/About/About';
import { AiHelper } from '@/components/AiHelper/AiHelper';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { Projects } from '@/components/Projects/Projects';
import { WorkProcess } from '@/components/WorkProcess/WorkProcess';

export default function Home() {
  return (
    <main className="page">
      <Header />
      <Hero />
      <About />
      <WorkProcess />
      <Projects />
      <AiHelper />
      <ContactForm />
      <Footer />
    </main>
  );
}
