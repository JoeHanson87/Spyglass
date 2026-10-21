import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Book a Table", description: "Book a table at Spyglass & Kettle online or by phone." };
export const revalidate = 3600;

export default async function Book() {
  const s = await getSettings();
  const url = `https://book.resdiary.com/widget/Standard/${encodeURIComponent(s.resdiaryId)}/`;
  return (
    <>
      <div className="page-hero"><h1>Book a Table</h1><p>Reserve online in moments, or call us on <a href={`tel:${s.phone.replace(/\s/g, "")}`} style={{ color: "var(--gold)" }}>{s.phone}</a>.</p></div>
      <section className="green booking">
        <Reveal className="resdiary">
          <iframe title="Book a table with ResDiary" loading="lazy" src={url} style={{ border: 0, width: "100%", minHeight: 640 }} />
          <p className="fallback">Booking widget not loading? <a href={url} target="_blank" rel="noopener">Open booking page</a></p>
        </Reveal>
      </section>
    </>
  );
}
