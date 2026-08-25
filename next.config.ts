import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const withMDX = createMDX({
  // Use the default MDX compiler. Keep it simple: no remark/rehype plugins
  // unless a real need appears (perf + build reliability).
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // Allow .mdx files to be treated as pages/content.
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(withMDX(nextConfig));
