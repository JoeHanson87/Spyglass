import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { NightForm } from "@/components/admin/NightForm";
import { db, schema } from "@/db";

export default async function EditNight({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [n] = await db.select().from(schema.specialNights).where(eq(schema.specialNights.id, Number(id)));
  if (!n) notFound();
  return (<><h1>Edit special night</h1><NightForm n={n} /></>);
}
