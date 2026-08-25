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
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-[color:var(--border-hair)] bg-[color:var(--color-ink)] md:hidden transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={whatsappBase}
        className="flex items-center justify-center gap-2 py-3.5 text-[color:var(--color-paper)] font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)]"
      >
        <MessageCircle className="size-5 text-[color:var(--color-tape)]" aria-hidden="true" />
        {t("whatsapp")}
      </a>
      <a
        href={`tel:${site.phone.tel}`}
        className="flex items-center justify-center gap-2 border-s border-[color:color-mix(in_srgb,var(--color-paper)_16%,transparent)] py-3.5 text-[color:var(--color-paper)] font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)]"
      >
        <Phone className="size-5 text-[color:var(--color-tape)]" aria-hidden="true" />
        {t("call")}
      </a>
    </div>
  );
}
