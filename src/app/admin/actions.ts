"use server";
import bcrypt from "bcryptjs";
import { del } from "@vercel/blob";
import { asc, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { createSession, destroySession, requireAdmin } from "@/lib/auth";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const bool = (f: FormData, k: string) => f.get(k) === "on";
const num = (f: FormData, k: string) => Number(f.get(k));

function refresh() {
  revalidatePath("/", "layout");
}

// ---------- auth ----------
const attempts = new Map<string, { n: number; until: number }>();

export async function login(_: unknown, f: FormData): Promise<{ error: string } | undefined> {
  const email = str(f, "email").toLowerCase();
  const key = email || "anon";
  const rec = attempts.get(key);
  if (rec && rec.until > Date.now()) return { error: "Too many attempts. Try again in a few minutes." };

  const okEmail = email === (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH ?? "";
  const okPw = hash ? await bcrypt.compare(String(f.get("password") ?? ""), hash) : false;

  if (!okEmail || !okPw || !process.env.SESSION_SECRET) {
    const n = (rec?.n ?? 0) + 1;
    attempts.set(key, { n, until: n >= 5 ? Date.now() + 10 * 60_000 : 0 });
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Incorrect email or password." };
  }
  attempts.delete(key);
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ---------- menu ----------
export async function addCategory(f: FormData) {
  await requireAdmin();
  const name = str(f, "name");
  if (!name) return;
  const cats = await db.select().from(schema.menuCategories);
  await db.insert(schema.menuCategories).values({ name, sort: cats.length });
  refresh();
}

export async function renameCategory(f: FormData) {
  await requireAdmin();
  await db.update(schema.menuCategories).set({ name: str(f, "name") }).where(eq(schema.menuCategories.id, num(f, "id")));
  refresh();
}

export async function deleteCategory(f: FormData) {
  await requireAdmin();
  await db.delete(schema.menuCategories).where(eq(schema.menuCategories.id, num(f, "id")));
  refresh();
}

export async function moveCategory(f: FormData) {
  await requireAdmin();
  const rows = await db.select().from(schema.menuCategories).orderBy(asc(schema.menuCategories.sort), asc(schema.menuCategories.id));
  await swap(rows.map((r) => r.id), num(f, "id"), f.get("dir") === "up" ? -1 : 1, (id, sort) =>
    db.update(schema.menuCategories).set({ sort }).where(eq(schema.menuCategories.id, id)));
  refresh();
}

export async function saveItem(f: FormData) {
  await requireAdmin();
  const data = {
    name: str(f, "name"),
    description: str(f, "description"),
    price: str(f, "price"),
    tag: str(f, "tag"),
    available: bool(f, "available"),
  };
  if (!data.name) return;
  const id = num(f, "id");
  if (id) {
    await db.update(schema.menuItems).set(data).where(eq(schema.menuItems.id, id));
  } else {
    const categoryId = num(f, "categoryId");
    const siblings = await db.select().from(schema.menuItems).where(eq(schema.menuItems.categoryId, categoryId));
    await db.insert(schema.menuItems).values({ ...data, categoryId, sort: siblings.length });
  }
  refresh();
}

export async function deleteItem(f: FormData) {
  await requireAdmin();
  await db.delete(schema.menuItems).where(eq(schema.menuItems.id, num(f, "id")));
  refresh();
}

export async function moveItem(f: FormData) {
  await requireAdmin();
  const rows = await db.select().from(schema.menuItems).where(eq(schema.menuItems.categoryId, num(f, "categoryId")))
    .orderBy(asc(schema.menuItems.sort), asc(schema.menuItems.id));
  await swap(rows.map((r) => r.id), num(f, "id"), f.get("dir") === "up" ? -1 : 1, (id, sort) =>
    db.update(schema.menuItems).set({ sort }).where(eq(schema.menuItems.id, id)));
  refresh();
}

async function swap(ids: number[], id: number, delta: number, write: (id: number, sort: number) => Promise<unknown>) {
  const i = ids.indexOf(id);
  const j = i + delta;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  await Promise.all(ids.map((x, n) => write(x, n)));
}

// ---------- events ----------
const eventSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["music", "event"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}/),
  description: z.string(),
  image: z.string(),
});

export async function saveEvent(f: FormData) {
  await requireAdmin();
  const parsed = eventSchema.safeParse({
    title: str(f, "title"), category: str(f, "category"), date: str(f, "date"),
    startTime: str(f, "startTime"), description: str(f, "description"), image: str(f, "image"),
  });
  if (!parsed.success) return;
  const data = { ...parsed.data, published: bool(f, "published") };
  const id = num(f, "id");
  if (id) await db.update(schema.events).set(data).where(eq(schema.events.id, id));
  else await db.insert(schema.events).values(data);
  refresh();
  redirect("/admin/events");
}

export async function deleteEvent(f: FormData) {
  await requireAdmin();
  await db.delete(schema.events).where(eq(schema.events.id, num(f, "id")));
  refresh();
}

// ---------- special nights ----------
export async function saveNight(f: FormData) {
  await requireAdmin();
  const data = {
    title: str(f, "title"),
    weekday: Math.min(6, Math.max(0, num(f, "weekday"))),
    startTime: str(f, "startTime") || "19:00",
    description: str(f, "description"),
    image: str(f, "image"),
    active: bool(f, "active"),
  };
  if (!data.title) return;
  const id = num(f, "id");
  if (id) await db.update(schema.specialNights).set(data).where(eq(schema.specialNights.id, id));
  else await db.insert(schema.specialNights).values(data);
  refresh();
  redirect("/admin/nights");
}

export async function deleteNight(f: FormData) {
  await requireAdmin();
  await db.delete(schema.specialNights).where(eq(schema.specialNights.id, num(f, "id")));
  refresh();
}

// ---------- PDFs ----------
export async function addPdf(f: FormData) {
  await requireAdmin();
  const url = str(f, "url");
  const label = str(f, "label") || "Full Menu";
  if (!url) return;
  const existing = await db.select().from(schema.menuPdfs);
  await db.insert(schema.menuPdfs).values({ label, url, isPrimary: existing.length === 0 });
  refresh();
}

export async function makePrimaryPdf(f: FormData) {
  await requireAdmin();
  const id = num(f, "id");
  await db.update(schema.menuPdfs).set({ isPrimary: false }).where(ne(schema.menuPdfs.id, id));
  await db.update(schema.menuPdfs).set({ isPrimary: true }).where(eq(schema.menuPdfs.id, id));
  refresh();
}

export async function deletePdf(f: FormData) {
  await requireAdmin();
  const id = num(f, "id");
  const [row] = await db.select().from(schema.menuPdfs).where(eq(schema.menuPdfs.id, id));
  if (!row) return;
  await db.delete(schema.menuPdfs).where(eq(schema.menuPdfs.id, id));
  try { await del(row.url); } catch {}
  if (row.isPrimary) {
    const [next] = await db.select().from(schema.menuPdfs).orderBy(asc(schema.menuPdfs.id)).limit(1);
    if (next) await db.update(schema.menuPdfs).set({ isPrimary: true }).where(eq(schema.menuPdfs.id, next.id));
  }
  refresh();
}

// ---------- settings ----------
const settingKeys = ["phone", "email", "address", "instagram", "facebook", "resdiaryId", "bannerText", "hours", "menuNote"];

export async function saveSettings(f: FormData) {
  await requireAdmin();
  const entries = settingKeys.map((k) => [k, str(f, k)] as const);
  entries.push(["bannerOn", bool(f, "bannerOn") ? "true" : "false"]);
  for (const [key, value] of entries) {
    await db.insert(schema.settings).values({ key, value }).onConflictDoUpdate({ target: schema.settings.key, set: { value } });
  }
  refresh();
  redirect("/admin/settings?saved=1");
}
