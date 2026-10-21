import type { Metadata } from "next";
import { MenuTabs } from "@/components/MenuTabs";
import { Reveal } from "@/components/Reveal";
import { getMenu, getPrimaryPdf, getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Menu", description: "Browse a sample of our seasonal menu or download the full menu." };
export const revalidate = 3600;

export default async function MenuPage() {
  const [menu, pdf, s] = await Promise.all([getMenu(), getPrimaryPdf(), getSettings()]);
  return (
    <>
      <div className="page-hero"><h1>The Menu</h1><p>Classic British favourites, made with fresh, local ingredients.</p></div>
      <section className="ivory menu-sec">
        <Reveal><p className="eyebrow dark c">Sample menu</p></Reveal>
        <MenuTabs menu={menu} note={s.menuNote} />
        {pdf && (
          <Reveal className="menu-actions">
            <p className="note" style={{ margin: 0 }}>Want to see everything we serve?</p>
            <a className="btn btn-green" href={pdf.url} target="_blank" rel="noopener">Download Full Menu (PDF)</a>
          </Reveal>
        )}
      </section>
    </>
  );
}
