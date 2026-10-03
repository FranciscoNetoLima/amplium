import { useEffect } from 'react';
import { initializeInteractions } from './interactions.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Solutions from './components/Solutions.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useEffect(() => initializeInteractions(), []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Solutions />
        <Process />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
