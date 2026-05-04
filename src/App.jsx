import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HeroContent from "./components/HeroContent";
import Marquee from "./components/Marquee";
import Scaler from "./components/Scaler";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div>
      <Hero />
      <HeroContent />
      <Process />
      <Scaler />
      <Projects />
      <Skills />
      <Marquee />
      <Footer />
    </div>
  );
}
