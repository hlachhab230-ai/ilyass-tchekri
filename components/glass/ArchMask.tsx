import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ARCH = "200px 200px 24px 24px";

/**
 * Masque en arche (#5). Portrait détouré en arche, posé sur un halo radial bleu.
 * Jamais de photo rectangulaire brute. Si `src` est null, placeholder élégant
 * (initiales) — le client dépose la vraie photo ensuite.
 */
export function ArchMask({
  src,
  alt,
  initials,
  className,
  children,
}: {
  src?: string | null;
  alt: string;
  initials?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative isolate", className)}>
      {/* halo lumineux */}
      <div
        aria-hidden="true"
        className="halo absolute -inset-6 -z-10 blur-2xl"
        style={{ borderRadius: ARCH }}
      />
      <div
        className="relative aspect-[3/4] overflow-hidden bg-[color:var(--color-ice)]"
        style={{ borderRadius: ARCH }}
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes="(max-width:768px) 80vw, 420px" className="object-cover" />
        ) : (
          <div
            className="grid h-full w-full place-items-center bg-gradient-to-b from-[color:color-mix(in_srgb,var(--color-aqua)_30%,white)] to-[color:color-mix(in_srgb,var(--color-blue)_28%,white)]"
            aria-label={alt}
            role="img"
          >
            <span className="font-display text-[length:var(--hero)] text-white/85">
              {initials ?? ""}
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
