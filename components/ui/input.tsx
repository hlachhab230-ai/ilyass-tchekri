import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border border-[color:var(--border-hair)] bg-white/60 px-3.5 py-2 text-[length:var(--step-0)] text-[color:var(--color-ink)] transition-colors placeholder:text-[color:color-mix(in_srgb,var(--color-slate)_70%,transparent)] focus-visible:border-[color:var(--color-tape)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[color:var(--color-ember)]",
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
        "flex min-h-24 w-full rounded-md border border-[color:var(--border-hair)] bg-white/60 px-3.5 py-2.5 text-[length:var(--step-0)] text-[color:var(--color-ink)] transition-colors placeholder:text-[color:color-mix(in_srgb,var(--color-slate)_70%,transparent)] focus-visible:border-[color:var(--color-tape)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[color:var(--color-ember)]",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
