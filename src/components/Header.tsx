"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/whats-on", label: "What's On" },
  { href: "/about", label: "About" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Spyglass & Kettle home">
        <Image src="/brand/logo.png" alt="Spyglass & Kettle Pub & Restaurant" width={152} height={152} priority />
      </Link>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav id="nav" aria-label="Main" className={open ? "open" : ""}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={path === l.href ? "active" : ""}>{l.label}</Link>
        ))}
        <Link className="btn btn-outline" href="/book">Book a Table</Link>
      </nav>
    </header>
  );
}
