
import React from "react";

interface SlideIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

export const SlideIndicators: React.FC<SlideIndicatorsProps> = ({
  totalSlides,
  currentSlide,
  onSlideSelect,
}) => {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideSelect(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSlide 
              ? 'bg-white scale-110' 
              : 'bg-white/40 hover:bg-white/60'
          }`}
        />
      ))}
    </div>
  );
};
