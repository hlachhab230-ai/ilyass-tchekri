"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappBase } from "@/lib/site";

/**
 * Barre d'action fixe en bas (mobile uniquement) : WhatsApp + Appeler.
 * Se masque quand le formulaire de réservation (#booking-form) est visible.
 */
export function MobileActionBar() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    // Re-bind à chaque navigation client : le formulaire vit sur certaines
    // pages seulement. On attend un tick pour que le DOM de la nouvelle page
    // soit monté avant d'observer #booking-form.
    setHidden(false);
    const bind = () => {
      const form = document.getElementById("booking-form");
      if (!form) return null;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) setHidden(e.isIntersecting);
        },
        { threshold: 0.15 },
      );
      io.observe(form);
      return io;
    };
    let io = bind();
    const raf = requestAnimationFrame(() => {
      if (!io) io = bind();
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden={hidden}
      // `inert` retire les liens du parcours clavier et du focus quand la barre
      // est masquée : pas de contenu focusable dans un sous-arbre aria-hidden.
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-[color:var(--hairline)] bg-white md:hidden transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={whatsappBase}
        className="flex items-center justify-center gap-2.5 py-3 font-medium text-[color:var(--color-ink)] focus-visible:outline-3 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-ink)]"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-[color:var(--color-lime)]">
          <MessageCircle className="size-4 text-[color:var(--color-ink)]" aria-hidden="true" />
        </span>
        {t("whatsapp")}
      </a>
      <a
        href={`tel:${site.phone.tel}`}
        className="flex items-center justify-center gap-2.5 border-s border-[color:var(--hairline)] py-3 font-medium text-[color:var(--color-ink)] focus-visible:outline-3 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-ink)]"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-[color:var(--color-ice)]">
          <Phone className="size-4 text-[color:var(--color-blue)]" aria-hidden="true" />
        </span>
        {t("call")}
      </a>
    </div>
  );
}
