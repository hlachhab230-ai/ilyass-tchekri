import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component mapping. Article prose (content/conseils/*.mdx) is styled
 * here so MDX bodies inherit the site's typographic system without per-file work.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="font-display text-[color:var(--color-ink)] text-[length:var(--step-2)] font-bold tracking-tight mt-12 mb-3"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-display text-[color:var(--color-ink)] text-[length:var(--step-1)] font-bold tracking-tight mt-8 mb-2"
        {...props}
      />
    ),
    p: (props) => (
      <p className="text-[color:var(--color-slate)] leading-relaxed my-4" {...props} />
    ),
    ul: (props) => (
      <ul className="my-4 space-y-2 ps-5 list-disc marker:text-[color:var(--color-tape-ink)]" {...props} />
    ),
    ol: (props) => (
      <ol className="my-4 space-y-2 ps-5 list-decimal marker:text-[color:var(--color-tape-ink)]" {...props} />
    ),
    li: (props) => <li className="text-[color:var(--color-slate)] leading-relaxed" {...props} />,
    strong: (props) => <strong className="text-[color:var(--color-ink)] font-semibold" {...props} />,
    a: (props) => (
      <a
        className="text-[color:var(--color-tape-ink)] underline underline-offset-4 decoration-1 hover:opacity-80"
        {...props}
      />
    ),
    ...components,
  };
}
