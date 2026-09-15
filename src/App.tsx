import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyEducation } from './components/JourneyEducation';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GitHubActivity } from './components/GitHubActivity';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] relative selection:bg-white selection:text-black font-sans">
      {/* Sleek Minimal Cursor */}
      <CustomCursor />

      {/* Sticky Responsive Minimal Navbar */}
      <Navbar />

      {/* Main Content Sections (Matching Canva template structure & flow) */}
      <main>
        {/* 1. Welcome to My Developer Portfolio (Hero with Arch Portrait & Rotating Badge) */}
        <Hero />

        {/* 2. Who is Sameer? (About narrative & Arch code visual) */}
        <About />

        {/* 3. My Background (Education & Work Experience) */}
        <JourneyEducation />

        {/* 4. Technical Stack */}
        <Skills />

        {/* 5. My Work (3 Arch-Topped Cards) + Quote Banner + More of My Work */}
        <Projects />

        {/* 6. Open Source Repositories */}
        <GitHubActivity />

        {/* 7. Reach Out to Me (Address, Email, Phone + "Let's collaborate" CTA) */}
        <Contact />
      </main>

      {/* 8. Minimalist Footer */}
      <Footer />
    </div>
  );
}
