import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import "../admin.css";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="adm">
      <div className="adm-bar">
        <strong>Spyglass &amp; Kettle</strong>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/menu">Menu</Link>
          <Link href="/admin/pdfs">PDF Menus</Link>
          <Link href="/admin/events">Events</Link>
          <Link href="/admin/nights">Special Nights</Link>
          <Link href="/admin/settings">Settings</Link>
          <Link href="/" target="_blank">View site ↗</Link>
        </nav>
        <form action={logout}><button className="link">Log out</button></form>
      </div>
      <div className="adm-main">{children}</div>
    </div>
  );
}
