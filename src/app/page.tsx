import LandingLayout from './landing-page-home/components/LandingLayout';
import HeroSection from './landing-page-home/components/HeroSection';
import StatsSection from './landing-page-home/components/StatsSection';
import ClientLogos from './landing-page-home/components/ClientLogos';
import ServicesSection from './landing-page-home/components/ServicesSection';
import AllServicesScrollSection from './landing-page-home/components/AllServicesScrollSection';
import WhyUsSection from './landing-page-home/components/WhyUsSection';
import ProcessSection from './landing-page-home/components/ProcessSection';
import PortfolioSection from './landing-page-home/components/PortfolioSection';
import TestimonialsSection from './landing-page-home/components/TestimonialsSection';
import PricingSection from './landing-page-home/components/PricingSection';
import FaqSection from './landing-page-home/components/FaqSection';
import BlogSection from './landing-page-home/components/BlogSection';
import CtaBanner from './landing-page-home/components/CtaBanner';
import ContactSection from './landing-page-home/components/ContactSection';
import WhatsAppButton from './landing-page-home/components/WhatsAppButton';

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroSection />
      <StatsSection />
      <ClientLogos />
      <ServicesSection />
      <AllServicesScrollSection />
      <WhyUsSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <BlogSection />
      <CtaBanner />
      <ContactSection />
      <WhatsAppButton />
    </LandingLayout>
  );
}