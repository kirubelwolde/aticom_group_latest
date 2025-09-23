import React from "react";
import { BusinessSlide } from "./BusinessSlide";

interface HeroBackgroundProps {
  slides: BusinessSlide[];
  currentSlide: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  slides,
  currentSlide,
}) => {
  return (
    <>
      {/* Sliding Image Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/30 to-slate-900/40"></div>
      </div>

      {/* Enhanced Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-aticom-blue/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-0 w-80 h-80 bg-aticom-green/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-64 h-64 bg-aticom-gold/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </>
  );
};
