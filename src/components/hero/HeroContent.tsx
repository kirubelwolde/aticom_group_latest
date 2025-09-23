import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { ProfessionalButton } from "@/components/ui/professional-button";
import { BusinessSlide } from "./BusinessSlide";
import { HeroStats } from "./HeroStats";

interface HeroContentProps {
  currentBusiness: BusinessSlide;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  currentBusiness,
}) => {
  return (
    <div className="text-center animate-fade-in-up">
      {/* Enhanced Main Headline */}
      <h1
        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up text-shadow-strong"
        style={{ animationDelay: "0.2s" }}
      >
        {currentBusiness.title}
        <span
          className="block mt-2"
          // style={{ animationDelay: "0.4s" }}
        >
          {currentBusiness.subtitle}
        </span>
      </h1>

      {/* Enhanced Subheadline */}
      <p
        className="text-lg md:text-xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        {currentBusiness.description}
      </p>

      {/* Enhanced Statistics Grid */}
      <HeroStats />

      {/* Enhanced CTA Buttons */}
      <div
        className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
        style={{ animationDelay: "1.2s" }}
      >
        <ProfessionalButton
          asChild
          variant="premium"
          size="lg"
          className="hover-scale"
        >
          <Link to={currentBusiness.route}>
            {currentBusiness.buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </ProfessionalButton>
        {/* <ProfessionalButton
          asChild
          variant="glass"
          size="lg"
          className="hover-scale"
        >
          <Link to="/about">
            <Play className="mr-2 h-4 w-4" />
            Watch Our Story
          </Link>
        </ProfessionalButton> */}
      </div>
    </div>
  );
};
