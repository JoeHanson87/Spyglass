import type { Metadata } from "next";
import Link from "next/link";
import { EventCard, NightCard } from "@/components/Cards";
import { Reveal, Stagger } from "@/components/Reveal";
import { getEvents, getSpecialNights } from "@/lib/data";

export const metadata: Metadata = { title: "What's On", description: "Live music, events and weekly special nights at Spyglass & Kettle." };
export const revalidate = 3600;

const filters = [
  { key: "all", label: "Everything" },
  { key: "music", label: "Live Music" },
  { key: "event", label: "Events" },
  { key: "nights", label: "Weekly Nights" },
];

export default async function WhatsOn({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { show = "all" } = await searchParams;
  const showEvents = show !== "nights";
  const showNights = show === "all" || show === "nights";
  const [events, nights] = await Promise.all([
    showEvents ? getEvents({ category: show === "music" || show === "event" ? show : undefined }) : Promise.resolve([]),
    showNights ? getSpecialNights() : Promise.resolve([]),
  ]);

  return (
    <>
      <div className="page-hero"><h1>What&apos;s On</h1><p>Live music, seasonal celebrations and weekly favourites.</p></div>
      <section className="ivory">
        <div className="filters">
          {filters.map((f) => (
            <Link key={f.key} href={f.key === "all" ? "/whats-on" : `/whats-on?show=${f.key}`} className={show === f.key ? "on" : ""} scroll={false}>{f.label}</Link>
          ))}
        </div>

        {showEvents && (
          <>
            <Reveal><h2 className="center" style={{ marginTop: 56 }}>Upcoming</h2></Reveal>
            {events.length ? <Stagger className="date-grid">{events.map((e) => <EventCard key={e.id} e={e} />)}</Stagger> : <p className="empty">Nothing booked in just yet. Check back soon!</p>}
          </>
        )}
        {showNights && (
          <>
            <Reveal><h2 className="center" style={{ marginTop: 72 }}>Every Week</h2></Reveal>
            <Stagger className="date-grid">{nights.map((n) => <NightCard key={n.id} n={n} />)}</Stagger>
          </>
        )}
      </section>
    </>
  );
}
