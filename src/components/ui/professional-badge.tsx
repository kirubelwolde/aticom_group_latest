
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground",
        premium: "bg-gradient-primary text-white shadow-colored hover:shadow-glow border-0",
        success: "bg-aticom-green text-white shadow-glow-green hover:bg-aticom-green/90",
        info: "bg-aticom-blue text-white shadow-glow hover:bg-aticom-blue/90",
        gold: "bg-aticom-gold text-aticom-navy shadow-strong hover:bg-aticom-gold/90",
        glass: "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2.5 py-0.5 text-2xs rounded-md",
        lg: "px-4 py-2 text-sm rounded-lg",
        xl: "px-6 py-3 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function ProfessionalBadge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { ProfessionalBadge, badgeVariants };
