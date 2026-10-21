"use client";
import { upload } from "@vercel/blob/client";
import { useState } from "react";

export function Uploader({ name, accept, initial = "", label = "File" }: { name: string; accept: string; initial?: string; label?: string }) {
  const [url, setUrl] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const blob = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/upload" });
      setUrl(blob.url);
    } catch (x) {
      setErr((x as Error).message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="uploader">
      <span className="lbl">{label}</span>
      <input type="file" accept={accept} onChange={onChange} disabled={busy} />
      <input type="hidden" name={name} value={url} />
      {busy && <small>Uploading…</small>}
      {err && <small className="err">{err}</small>}
      {url && !busy && accept.startsWith("image") && /* eslint-disable-next-line @next/next/no-img-element */ <img src={url} alt="" className="thumb" />}
      {url && !busy && !accept.startsWith("image") && <small>Uploaded ✓</small>}
    </div>
  );
}
