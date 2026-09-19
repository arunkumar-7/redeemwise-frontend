import { Navbar } from '../components/sections/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { ActionPreviewSection } from '../components/sections/ActionPreviewSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { CTASection } from '../components/sections/CTASection';
import { Footer } from '../components/sections/Footer';

/** Route target for `/` — composes the completed Phase 1 marketing sections. */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <BenefitsSection />
        <ActionPreviewSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
