import Image from "next/image";
import Link from "next/link";
import { getSettings, parseHours } from "@/lib/data";

export async function Footer() {
  const s = await getSettings();
  return (
    <footer className="site-footer">
      <div className="foot">
        <Image src="/brand/logo.png" alt="Spyglass & Kettle" className="foot-logo" width={130} height={130} />
        <div>
          <h4>Spyglass &amp; Kettle</h4>
          <p className="gold">Pub &amp; Restaurant</p>
          <p>{s.address}</p>
          <p><a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
          <p><a href={`mailto:${s.email}`}>{s.email}</a></p>
          <p className="social"><a href={s.instagram}>Instagram</a> &middot; <a href={s.facebook}>Facebook</a></p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="links">
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/whats-on">What&apos;s On</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/book">Book a Table</Link></li>
          </ul>
        </div>
        <div>
          <h4>Opening Hours</h4>
          <ul className="hours">
            {parseHours(s.hours).map((h) => (<li key={h.day}><span>{h.day}</span><span>{h.time}</span></li>))}
          </ul>
        </div>
      </div>
      <p className="legal">
        <span>&copy; {new Date().getFullYear()} Spyglass &amp; Kettle. All rights reserved.</span>
        <span>Good Food | Great Drinks | Warm Welcome <Link href="/admin" aria-label="Owner login">&middot;</Link></span>
      </p>
    </footer>
  );
}
