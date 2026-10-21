"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MenuCategory } from "@/lib/data";

export function MenuTabs({ menu, note }: { menu: MenuCategory[]; note: string }) {
  const [active, setActive] = useState(0);
  const cat = menu[active];
  if (!cat) return null;
  return (
    <>
      <div className="tabs" role="tablist">
        {menu.map((c, i) => (
          <button key={c.id} role="tab" aria-selected={i === active} onClick={() => setActive(i)}>
            {c.name}
            {i === active && <motion.span layoutId="tab-underline" className="underline" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
          </button>
        ))}
      </div>
      <div className="menu-card">
        <AnimatePresence mode="wait">
          <motion.ul
            key={cat.id}
            className="panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            {cat.items.map((it, i) => (
              <motion.li key={it.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <b>{it.name}{it.tag && <span className="tag">{it.tag}</span>}</b>
                <span className="price">{it.price}</span>
                <em>{it.description}</em>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
        {note && <p className="note">{note}</p>}
      </div>
    </>
  );
}
