import Image from "next/image";

/**
 * Portrait d'Ilyass pour la page Parcours.
 * - Si `src` est fourni (voir site.portrait), affiche la photo optimisée.
 * - Sinon, un cadre placeholder élégant aux couleurs de la marque, avec les
 *   initiales et un arc de goniomètre discret (clin d'œil à l'élément
 *   signature). Le client remplace le placeholder en déposant la photo.
 */
export function Portrait({ name, src }: { name: string; src: string | null }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto w-full max-w-[16rem] md:ms-auto md:me-0">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[color:color-mix(in_srgb,var(--color-paper)_22%,transparent)] bg-[color:var(--color-navy)]">
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 768px) 16rem, 16rem"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            {/* arc goniomètre discret */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full text-[color:var(--color-tape)]"
              aria-hidden="true"
            >
              <path
                d="M 30 160 A 100 100 0 0 1 170 120"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="160"
                x2="150"
                y2="70"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
              <circle cx="30" cy="160" r="4" fill="currentColor" fillOpacity="0.5" />
            </svg>
            <span className="font-display text-[length:var(--step-5)] font-extrabold text-[color:color-mix(in_srgb,var(--color-paper)_92%,transparent)]">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
