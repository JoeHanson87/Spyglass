import { asc } from "drizzle-orm";
import { db, schema } from "@/db";
import { addCategory, deleteCategory, deleteItem, moveCategory, moveItem, renameCategory, saveItem } from "../../actions";

function Move({ action, id, extra }: { action: (f: FormData) => Promise<void>; id: number; extra?: Record<string, number> }) {
  return (
    <>
      {(["up", "down"] as const).map((d) => (
        <form action={action} key={d}>
          <input type="hidden" name="id" value={id} />
          {extra && Object.entries(extra).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
          <input type="hidden" name="dir" value={d} />
          <button className="btn btn-ghost" aria-label={`Move ${d}`}>{d === "up" ? "↑" : "↓"}</button>
        </form>
      ))}
    </>
  );
}

export default async function MenuAdmin() {
  const cats = await db.select().from(schema.menuCategories).orderBy(asc(schema.menuCategories.sort), asc(schema.menuCategories.id));
  const items = await db.select().from(schema.menuItems).orderBy(asc(schema.menuItems.sort), asc(schema.menuItems.id));
  return (
    <>
      <h1>Sample Menu</h1>
      <p>This is the tabbed sample menu shown on the Menu page. Upload the full PDF under PDF Menus.</p>

      {cats.map((c) => (
        <section key={c.id} className="adm-card" style={{ padding: 18 }}>
          <div className="row-actions" style={{ marginTop: 0 }}>
            <form action={renameCategory} className="row-actions" style={{ margin: 0, flex: 1 }}>
              <input type="hidden" name="id" value={c.id} />
              <input type="text" name="name" defaultValue={c.name} style={{ maxWidth: 260, fontWeight: 700 }} aria-label="Category name" />
              <button className="btn btn-green">Rename</button>
            </form>
            <Move action={moveCategory} id={c.id} />
            <form action={deleteCategory}><input type="hidden" name="id" value={c.id} /><button className="btn btn-danger">Delete category</button></form>
          </div>

          {items.filter((i) => i.categoryId === c.id).map((i) => (
            <div key={i.id} className="adm-card" style={{ background: "#fff" }}>
              <form action={saveItem}>
                <input type="hidden" name="id" value={i.id} />
                <div className="item-form">
                  <label>Name<input type="text" name="name" defaultValue={i.name} required /></label>
                  <label>Description<input type="text" name="description" defaultValue={i.description} /></label>
                  <label>Price<input type="text" name="price" defaultValue={i.price} /></label>
                  <label>Tag<input type="text" name="tag" defaultValue={i.tag} placeholder="v" /></label>
                </div>
                <div className="row-actions">
                  <label className="check"><input type="checkbox" name="available" defaultChecked={i.available} /> Show on site</label>
                  <button className="btn btn-green">Save</button>
                </div>
              </form>
              <div className="row-actions">
                <Move action={moveItem} id={i.id} extra={{ categoryId: c.id }} />
                <form action={deleteItem}><input type="hidden" name="id" value={i.id} /><button className="btn btn-danger">Delete</button></form>
              </div>
            </div>
          ))}

          <form action={saveItem} className="adm-card">
            <strong>Add item to {c.name}</strong>
            <input type="hidden" name="categoryId" value={c.id} />
            <div className="item-form" style={{ marginTop: 8 }}>
              <label>Name<input type="text" name="name" required /></label>
              <label>Description<input type="text" name="description" /></label>
              <label>Price<input type="text" name="price" placeholder="£9.50" /></label>
              <label>Tag<input type="text" name="tag" placeholder="v" /></label>
            </div>
            <input type="hidden" name="available" value="on" />
            <div className="row-actions"><button className="btn btn-gold">Add item</button></div>
          </form>
        </section>
      ))}

      <h2>New category</h2>
      <form action={addCategory} className="row-actions">
        <input type="text" name="name" placeholder="e.g. Sides" required style={{ maxWidth: 260 }} />
        <button className="btn btn-gold">Add category</button>
      </form>
    </>
  );
}
