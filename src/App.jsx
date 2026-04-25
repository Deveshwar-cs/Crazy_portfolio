import Footer from "./components/Footer";
import GridSection from "./components/GridSection";
import Hero from "./components/Hero";
import HeroContent from "./components/HeroContent";
import Horizontal from "./components/HorizontalProjects";
import Marquee from "./components/Marquee";
import Scaler from "./components/Scaler";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div>
      <Hero />
      <HeroContent />
      <Skills />
      <Scaler />
      <Horizontal />
      <GridSection />
      <Marquee />
      <Footer />
    </div>
  );
}
