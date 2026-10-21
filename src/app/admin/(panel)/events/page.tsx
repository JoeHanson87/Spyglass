import { desc } from "drizzle-orm";
import Link from "next/link";
import { db, schema } from "@/db";
import { formatTime } from "@/lib/data";
import { deleteEvent } from "../../actions";

export default async function EventsAdmin() {
  const rows = await db.select().from(schema.events).orderBy(desc(schema.events.date));
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <h1>Events &amp; Live Music</h1>
      <Link className="btn btn-gold" href="/admin/events/new">+ New event</Link>
      <table style={{ marginTop: 20 }}>
        <thead><tr><th>Date</th><th>Title</th><th>Type</th><th>Status</th><th /></tr></thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id}>
              <td>{e.date} {formatTime(e.startTime.slice(0, 5))}</td>
              <td>{e.title}</td>
              <td>{e.category === "music" ? "Live music" : "Event"}</td>
              <td>{e.date < today ? <span className="pill off">Past</span> : e.published ? <span className="pill">Live</span> : <span className="pill off">Draft</span>}</td>
              <td><div className="row-actions" style={{ margin: 0 }}>
                <Link className="btn btn-ghost" href={`/admin/events/${e.id}`}>Edit</Link>
                <form action={deleteEvent}><input type="hidden" name="id" value={e.id} /><button className="btn btn-danger">Delete</button></form>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p>No events yet.</p>}
    </>
  );
}
