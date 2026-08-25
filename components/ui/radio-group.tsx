"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * Option radio « carte » : toute la surface est cliquable et sélectionnable au
 * clavier. L'item Radix reçoit le label via aria-label côté appelant.
 */
const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
  }
>(({ className, label, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    aria-label={label}
    className={cn(
      "flex items-center gap-3 rounded-md border border-[color:var(--border-hair)] bg-white/60 px-3.5 py-3 text-start text-[length:var(--step-0)] text-[color:var(--color-ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)] data-[state=checked]:border-[color:var(--color-tape)] data-[state=checked]:bg-[color:color-mix(in_srgb,var(--color-tape)_10%,transparent)]",
      className,
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className="grid size-4 shrink-0 place-items-center rounded-full border border-[color:var(--color-slate)]"
    >
      <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-[color:var(--color-tape)]" />
    </span>
    <span>{label}</span>
  </RadioGroupPrimitive.Item>
));
RadioCard.displayName = "RadioCard";

export { RadioGroup, RadioCard };
