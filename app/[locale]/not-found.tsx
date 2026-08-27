import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-[length:var(--step-2)] tabular-nums text-[color:var(--color-blue)]">
        404
      </p>
      <h1 className="mt-4 text-[length:var(--step-3)] font-bold text-[color:var(--color-ink)]">
        Page introuvable · الصفحة غير موجودة
      </h1>
      <Button asChild variant="ink" size="lg" className="mt-8">
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </div>
  );
}
