import { count, gte } from "drizzle-orm";
import Link from "next/link";
import { db, hasDb, schema } from "@/db";

export default async function Dashboard() {
  if (!hasDb) return <p className="err">DATABASE_URL is not set. Connect a database to manage content.</p>;
  const today = new Date().toISOString().slice(0, 10);
  const [[ev], [nights], [items], [pdfs]] = await Promise.all([
    db.select({ n: count() }).from(schema.events).where(gte(schema.events.date, today)),
    db.select({ n: count() }).from(schema.specialNights),
    db.select({ n: count() }).from(schema.menuItems),
    db.select({ n: count() }).from(schema.menuPdfs),
  ]);
  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        <Link href="/admin/events" className="stat"><b>{ev.n}</b>Upcoming events</Link>
        <Link href="/admin/nights" className="stat"><b>{nights.n}</b>Special nights</Link>
        <Link href="/admin/menu" className="stat"><b>{items.n}</b>Menu items</Link>
        <Link href="/admin/pdfs" className="stat"><b>{pdfs.n}</b>PDF menus</Link>
      </div>
      <p style={{ marginTop: 28 }}>Changes appear on the public site as soon as you save.</p>
    </>
  );
}
