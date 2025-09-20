import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-pixel font-bold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-gradient-button text-primary-foreground hover:scale-[1.03] active:scale-95 shadow-[4px_4px_0px_hsl(var(--border))] border-2 border-border",
        destructive: "bg-gradient-heart text-destructive-foreground hover:scale-[1.03] active:scale-95 shadow-[4px_4px_0px_hsl(var(--border))] border-2 border-border",
        outline: "border-2 border-primary bg-background/50 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-[1.03] active:scale-95",
        secondary: "bg-secondary text-secondary-foreground hover:scale-[1.03] active:scale-95 shadow-[4px_4px_0px_hsl(var(--border))] border-2 border-border",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.03] active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:scale-[1.03]",
        pixel: "bg-gradient-button text-primary-foreground hover:scale-[1.03] active:scale-95 shadow-[6px_6px_0px_hsl(var(--border))] border-4 border-border",
        heart: "bg-gradient-heart text-destructive-foreground hover:scale-[1.03] active:scale-95 shadow-[6px_6px_0px_hsl(var(--border))] border-4 border-border",
        sparkle: "bg-gradient-sparkle text-accent-foreground hover:scale-[1.03] active:scale-95 shadow-[6px_6px_0px_hsl(var(--border))] border-4 border-border",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-sm",
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