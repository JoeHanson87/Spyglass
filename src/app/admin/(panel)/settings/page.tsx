import { getSettings } from "@/lib/data";
import { saveSettings } from "../../actions";

export default async function SettingsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [s, { saved }] = await Promise.all([getSettings(), searchParams]);
  return (
    <>
      <h1>Site Settings</h1>
      {saved && <p className="ok" role="status">Saved.</p>}
      <form action={saveSettings}>
        <div className="adm-card">
          <h2 style={{ marginTop: 0 }}>Announcement banner</h2>
          <label className="check"><input type="checkbox" name="bannerOn" defaultChecked={s.bannerOn === "true"} /> Show banner at the top of every page</label>
          <label>Message<input type="text" name="bannerText" defaultValue={s.bannerText} placeholder="Closed Christmas Day" /></label>
        </div>
        <div className="adm-card">
          <h2 style={{ marginTop: 0 }}>Contact</h2>
          <div className="grid">
            <label>Phone<input type="text" name="phone" defaultValue={s.phone} /></label>
            <label>Email<input type="email" name="email" defaultValue={s.email} /></label>
            <label>Address<input type="text" name="address" defaultValue={s.address} /></label>
            <label>Instagram URL<input type="text" name="instagram" defaultValue={s.instagram} /></label>
            <label>Facebook URL<input type="text" name="facebook" defaultValue={s.facebook} /></label>
            <label>ResDiary ID<input type="text" name="resdiaryId" defaultValue={s.resdiaryId} /></label>
          </div>
        </div>
        <div className="adm-card">
          <h2 style={{ marginTop: 0 }}>Opening hours</h2>
          <label>One per line, as <code>Days|Times</code><textarea name="hours" rows={5} defaultValue={s.hours} /></label>
        </div>
        <div className="adm-card">
          <h2 style={{ marginTop: 0 }}>Menu note</h2>
          <label>Shown under the sample menu<input type="text" name="menuNote" defaultValue={s.menuNote} /></label>
        </div>
        <button className="btn btn-gold">Save settings</button>
      </form>
    </>
  );
}
