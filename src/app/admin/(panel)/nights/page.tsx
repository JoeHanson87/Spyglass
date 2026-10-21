import Link from "next/link";
import { db, schema } from "@/db";
import { WEEKDAYS, formatTime } from "@/lib/data";
import { deleteNight } from "../../actions";

export default async function NightsAdmin() {
  const rows = (await db.select().from(schema.specialNights)).sort((a, b) => ((a.weekday + 6) % 7) - ((b.weekday + 6) % 7));
  return (
    <>
      <h1>Special Nights</h1>
      <Link className="btn btn-gold" href="/admin/nights/new">+ New special night</Link>
      <table style={{ marginTop: 20 }}>
        <thead><tr><th>Day</th><th>Title</th><th>Status</th><th /></tr></thead>
        <tbody>
          {rows.map((n) => (
            <tr key={n.id}>
              <td>{WEEKDAYS[n.weekday]} {formatTime(n.startTime.slice(0, 5))}</td>
              <td>{n.title}</td>
              <td>{n.active ? <span className="pill">Live</span> : <span className="pill off">Hidden</span>}</td>
              <td><div className="row-actions" style={{ margin: 0 }}>
                <Link className="btn btn-ghost" href={`/admin/nights/${n.id}`}>Edit</Link>
                <form action={deleteNight}><input type="hidden" name="id" value={n.id} /><button className="btn btn-danger">Delete</button></form>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
