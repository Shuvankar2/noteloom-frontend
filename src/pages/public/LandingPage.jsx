import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import LiquidGlassSVGFilter from "../../components/landing/LiquidGlassPanel";
import LandingNavbar from "../../components/landing/LandingNavbar";
import HeroSection from "../../components/landing/HeroSection";
import TrustBar from "../../components/landing/TrustBar";
import FeaturesSection from "../../components/landing/FeaturesSection";
import ContactSection from "../../components/landing/ContactSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import Footer from "../../components/common/Footer";

const LandingPage = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0a051d] text-white' : 'bg-[#f8fafc] text-gray-900'
    }`}>
      {/* Liquid Glass SVG Filter Definition (referenced by all glass elements) */}
      <LiquidGlassSVGFilter />

      {/* Navbar */}
      <LandingNavbar navigate={navigate} />

      {/* Hero Section */}
      <HeroSection navigate={navigate} />

      {/* Trust Bar */}
      <TrustBar />

      {/* Bento Grid Features Section */}
      <FeaturesSection 
        activeCardIndex={activeCardIndex} 
        setActiveCardIndex={setActiveCardIndex} 
      />

      {/* Contact Section */}
      <ContactSection />

      {/* How it Works Section */}
      <HowItWorksSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;