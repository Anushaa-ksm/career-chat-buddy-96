import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-pixel font-bold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-gradient-button text-primary-foreground hover:scale-105 active:scale-95 shadow-lg border-2 border-primary",
        destructive: "bg-gradient-heart text-destructive-foreground hover:scale-105 active:scale-95 shadow-lg border-2 border-destructive",
        outline: "border-2 border-primary bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95",
        secondary: "bg-secondary text-secondary-foreground hover:scale-105 active:scale-95 shadow-lg border-2 border-secondary",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
        pixel: "bg-gradient-button text-primary-foreground hover:scale-110 active:scale-90 shadow-xl border-4 border-primary pixel-pulse",
        heart: "bg-gradient-heart text-destructive-foreground hover:scale-110 active:scale-90 shadow-xl border-4 border-destructive heart-beat",
        sparkle: "bg-gradient-sparkle text-accent-foreground hover:scale-110 active:scale-90 shadow-xl border-4 border-accent sparkle-animation",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
