import { and, asc, eq, gte } from "drizzle-orm";
import { db, hasDb, schema } from "@/db";
import { defaultSettings, seedEvents, seedMenu, seedNights } from "./seed-data";

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDb) return fallback;
  try {
    return await run();
  } catch (e) {
    console.error("DB error", e);
    return fallback;
  }
}

const today = () => new Date().toISOString().slice(0, 10);

export type Settings = typeof defaultSettings;

export async function getSettings(): Promise<Settings> {
  return safe(async () => {
    const rows = await db.select().from(schema.settings);
    return { ...defaultSettings, ...Object.fromEntries(rows.map((r) => [r.key, r.value])) };
  }, defaultSettings);
}

export type MenuCategory = { id: number; name: string; items: { id: number; name: string; description: string; price: string; tag: string }[] };

export async function getMenu(): Promise<MenuCategory[]> {
  const fallback: MenuCategory[] = seedMenu.map((c, i) => ({
    id: i,
    name: c.name,
    items: c.items.map(([name, description, price, tag], j) => ({ id: j, name, description, price, tag })),
  }));
  return safe<MenuCategory[]>(async () => {
    const cats = await db.select().from(schema.menuCategories).orderBy(asc(schema.menuCategories.sort), asc(schema.menuCategories.id));
    const items = await db.select().from(schema.menuItems).where(eq(schema.menuItems.available, true)).orderBy(asc(schema.menuItems.sort), asc(schema.menuItems.id));
    return cats.map((c) => ({ id: c.id, name: c.name, items: items.filter((i) => i.categoryId === c.id) })).filter((c) => c.items.length);
  }, fallback);
}

export async function getEvents(opts: { category?: "music" | "event"; limit?: number } = {}) {
  const fallback = seedEvents.map((e, i) => ({ id: i, ...e, published: true }))
    .filter((e) => !opts.category || e.category === opts.category).slice(0, opts.limit);
  return safe(async () => {
    const rows = await db.select().from(schema.events)
      .where(and(eq(schema.events.published, true), gte(schema.events.date, today()), opts.category ? eq(schema.events.category, opts.category) : undefined))
      .orderBy(asc(schema.events.date), asc(schema.events.startTime));
    return opts.limit ? rows.slice(0, opts.limit) : rows;
  }, fallback);
}

export async function getSpecialNights() {
  const fallback = seedNights.map((n, i) => ({ id: i, ...n, active: true }));
  return safe(async () => {
    const rows = await db.select().from(schema.specialNights).where(eq(schema.specialNights.active, true));
    return rows.sort((a, b) => ((a.weekday + 6) % 7) - ((b.weekday + 6) % 7));
  }, fallback);
}

export async function getPrimaryPdf() {
  return safe(async () => {
    const rows = await db.select().from(schema.menuPdfs).orderBy(asc(schema.menuPdfs.id));
    return rows.find((r) => r.isPrimary) ?? rows[rows.length - 1] ?? null;
  }, null);
}

export async function getAllPdfs() {
  return safe(() => db.select().from(schema.menuPdfs).orderBy(asc(schema.menuPdfs.id)), []);
}

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function parseHours(raw: string) {
  return raw.split("\n").map((l) => l.split("|")).filter((p) => p.length === 2).map(([d, t]) => ({ day: d.trim(), time: t.trim() }));
}

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = h % 12 || 12;
  return m ? `${hh}:${String(m).padStart(2, "0")}${suffix}` : `${hh}${suffix}`;
}

export function dateParts(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return {
    dow: d.toLocaleDateString("en-GB", { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
    iso,
  };
}
