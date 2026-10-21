import { Uploader } from "./Uploader";
import { saveEvent } from "@/app/admin/actions";

type Ev = { id: number; title: string; category: string; date: string; startTime: string; description: string; image: string; published: boolean };

export function EventForm({ ev }: { ev?: Ev }) {
  return (
    <form action={saveEvent} className="adm-card">
      <input type="hidden" name="id" value={ev?.id ?? 0} />
      <label>Title<input type="text" name="title" defaultValue={ev?.title} required /></label>
      <div className="grid">
        <label>Type<select name="category" defaultValue={ev?.category ?? "event"}><option value="event">Event</option><option value="music">Live music</option></select></label>
        <label>Date<input type="date" name="date" defaultValue={ev?.date} required /></label>
        <label>Start time<input type="time" name="startTime" defaultValue={ev?.startTime?.slice(0, 5) ?? "19:00"} required /></label>
      </div>
      <label>Description<textarea name="description" defaultValue={ev?.description} /></label>
      <Uploader name="image" accept="image/*" initial={ev?.image} label="Image (optional)" />
      <label className="check"><input type="checkbox" name="published" defaultChecked={ev?.published ?? true} /> Published (untick to keep as a draft)</label>
      <div className="row-actions"><button className="btn btn-gold">Save event</button></div>
    </form>
  );
}
