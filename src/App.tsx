import { PortfolioProvider } from './context/PortfolioContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyEducation } from './components/JourneyEducation';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { DesignShowcase } from './components/DesignShowcase';
import { GitHubActivity } from './components/GitHubActivity';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { EditProjectModal } from './components/EditProjectModal';

function PortfolioApp() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary,#0A0A0A)] text-[var(--color-text-primary,#F5F5F5)] relative selection:bg-white selection:text-black font-sans transition-colors duration-300">
      {/* Sleek Minimal Cursor */}
      <CustomCursor />

      {/* Sticky Responsive Minimal Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Welcome to My Developer Portfolio (Hero with Arch Portrait & Rotating Badge) */}
        <Hero />

        {/* 2. Who is Sameer? (About narrative & Arch code visual) */}
        <About />

        {/* 3. My Background (Education & Work Experience) */}
        <JourneyEducation />

        {/* 4. Technical Stack */}
        <Skills />

        {/* 5. My Work (Flagship Arch Cards) + Quote Banner + More of My Work */}
        <Projects />

        {/* 6. Custom Designs & Motion Showcase */}
        <DesignShowcase />

        {/* 7. Open Source Repositories */}
        <GitHubActivity />

        {/* 7. Reach Out to Me (Address, Email, Phone + "Let's collaborate" CTA) */}
        <Contact />
      </main>

      {/* 8. Minimalist Footer */}
      <Footer />

      {/* Administrative Control Layer - Exclusive to the Portfolio Owner */}
      <AdminBar />
      <AdminLoginModal />
      <AdminCMSModal />
      <EditProjectModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
