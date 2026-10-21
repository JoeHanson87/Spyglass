import { Uploader } from "@/components/admin/Uploader";
import { getAllPdfs } from "@/lib/data";
import { addPdf, deletePdf, makePrimaryPdf } from "../../actions";

export default async function PdfAdmin() {
  const pdfs = await getAllPdfs();
  return (
    <>
      <h1>PDF Menus</h1>
      <p>The <b>primary</b> PDF is the one linked from the &ldquo;Download Full Menu&rdquo; button. PDFs up to 25 MB.</p>
      <form action={addPdf} className="adm-card">
        <label>Label<input type="text" name="label" placeholder="Full Menu" /></label>
        <Uploader name="url" accept="application/pdf" label="PDF file" />
        <div className="row-actions"><button className="btn btn-gold">Save PDF</button></div>
      </form>

      <h2>Uploaded</h2>
      {pdfs.length === 0 && <p>No PDFs yet.</p>}
      {pdfs.map((p) => (
        <div className="adm-card" key={p.id}>
          <strong>{p.label}</strong> {p.isPrimary && <span className="pill">Primary</span>}
          <div className="row-actions">
            <a className="btn btn-ghost" href={p.url} target="_blank" rel="noopener">View</a>
            {!p.isPrimary && <form action={makePrimaryPdf}><input type="hidden" name="id" value={p.id} /><button className="btn btn-green">Make primary</button></form>}
            <form action={deletePdf}><input type="hidden" name="id" value={p.id} /><button className="btn btn-danger">Delete</button></form>
          </div>
        </div>
      ))}
    </>
  );
}
