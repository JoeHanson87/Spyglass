import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { db, schema } from "@/db";

export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [ev] = await db.select().from(schema.events).where(eq(schema.events.id, Number(id)));
  if (!ev) notFound();
  return (<><h1>Edit event</h1><EventForm ev={ev} /></>);
}
