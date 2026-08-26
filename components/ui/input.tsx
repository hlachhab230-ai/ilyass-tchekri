import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border border-[color:var(--hairline)] bg-white/60 px-3.5 py-2 text-[length:var(--step-0)] text-[color:var(--color-ink)] transition-colors placeholder:text-[color:color-mix(in_srgb,var(--color-muted)_70%,transparent)] focus-visible:border-[color:var(--color-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-blue)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[color:var(--color-error)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-md border border-[color:var(--hairline)] bg-white/60 px-3.5 py-2.5 text-[length:var(--step-0)] text-[color:var(--color-ink)] transition-colors placeholder:text-[color:color-mix(in_srgb,var(--color-muted)_70%,transparent)] focus-visible:border-[color:var(--color-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-blue)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[color:var(--color-error)]",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
