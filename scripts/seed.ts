import "dotenv/config";
import { db, schema } from "../src/db";
import { defaultSettings, seedEvents, seedMenu, seedNights } from "../src/lib/seed-data";

async function main() {
  const existing = await db.select().from(schema.menuCategories).limit(1);
  if (existing.length) {
    console.log("Database already seeded, skipping.");
    return;
  }
  for (const [ci, cat] of seedMenu.entries()) {
    const [row] = await db.insert(schema.menuCategories).values({ name: cat.name, sort: ci }).returning();
    await db.insert(schema.menuItems).values(
      cat.items.map(([name, description, price, tag], i) => ({ categoryId: row.id, name, description, price, tag, sort: i })),
    );
  }
  await db.insert(schema.events).values(seedEvents);
  await db.insert(schema.specialNights).values(seedNights);
  await db.insert(schema.settings).values(Object.entries(defaultSettings).map(([key, value]) => ({ key, value })));
  console.log("Seeded.");
}

main().catch((e) => { console.error(e); process.exit(1); });
