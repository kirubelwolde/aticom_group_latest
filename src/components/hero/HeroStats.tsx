import React from "react";
import { Award, TrendingUp, Users, Globe } from "lucide-react";

export const HeroStats: React.FC = () => {
  const stats = [
    {
      number: "15+",
      label: "Years Experience",
      icon: Award,
      color: "text-aticom-gold",
    },
    {
      number: "500+",
      label: "Hectares Managed",
      icon: TrendingUp,
      color: "text-aticom-gold",
    },
    {
      number: "1000+",
      label: "Clients Served",
      icon: Users,
      color: "text-aticom-gold",
    },
    {
      number: "7",
      label: "Business Sectors",
      icon: Globe,
      color: "text-aticom-gold",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 max-w-5xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="text-center animate-scale-in group rounded-lg"
          style={{ animationDelay: `${0.8 + index * 0.1}s` }}
        >
          <div className="relative mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto flex items-center justify-center mb-3 transition-all duration-300">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-0 transition-all duration-300"></div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white animate-counter">
            {stat.number}
          </div>
          <div className="text-sm text-white/80 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
