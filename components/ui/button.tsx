import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[length:var(--step-0)] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-blue)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Accent teal — action primaire
        primary:
          "bg-[color:var(--color-blue)] text-[color:var(--color-ink)] hover:bg-[color:color-mix(in_srgb,var(--color-blue)_88%,black)]",
        // Sombre — sur fond clair
        ink: "bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-blue)]",
        // Contour discret
        outline:
          "border border-[color:var(--hairline)] bg-transparent text-[color:var(--color-ink)] hover:border-[color:var(--color-blue)] hover:text-[color:var(--color-ink)]",
        // Contour clair sur fond sombre
        outlineLight:
          "border border-[color:color-mix(in_srgb,var(--color-paper)_40%,transparent)] bg-transparent text-[color:var(--color-paper)] hover:border-[color:var(--color-blue)]",
        ghost:
          "bg-transparent text-[color:var(--color-ink)] hover:bg-[color:color-mix(in_srgb,var(--color-muted)_14%,transparent)]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3.5",
        lg: "h-13 px-7 text-[length:var(--step-1)]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
