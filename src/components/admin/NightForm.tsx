import { saveNight } from "@/app/admin/actions";
import { WEEKDAYS } from "@/lib/data";
import { Uploader } from "./Uploader";

type Night = { id: number; title: string; weekday: number; startTime: string; description: string; image: string; active: boolean };

export function NightForm({ n }: { n?: Night }) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <form action={saveNight} className="adm-card">
      <input type="hidden" name="id" value={n?.id ?? 0} />
      <label>Title<input type="text" name="title" defaultValue={n?.title} required /></label>
      <div className="grid">
        <label>Day<select name="weekday" defaultValue={n?.weekday ?? 4}>{order.map((d) => <option key={d} value={d}>{WEEKDAYS[d]}</option>)}</select></label>
        <label>Start time<input type="time" name="startTime" defaultValue={n?.startTime?.slice(0, 5) ?? "19:00"} required /></label>
      </div>
      <label>Description<textarea name="description" defaultValue={n?.description} /></label>
      <Uploader name="image" accept="image/*" initial={n?.image} label="Image (optional)" />
      <label className="check"><input type="checkbox" name="active" defaultChecked={n?.active ?? true} /> Active (shown on the site)</label>
      <div className="row-actions"><button className="btn btn-gold">Save</button></div>
    </form>
  );
}
