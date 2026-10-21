import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSettings } from "@/lib/data";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {s.bannerOn === "true" && s.bannerText && <div className="banner" role="status">{s.bannerText}</div>}
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
