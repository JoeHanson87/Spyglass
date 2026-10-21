import type { Metadata } from "next";
import Image from "next/image";
import { Parallax } from "@/components/Parallax";
import { Reveal, Stagger } from "@/components/Reveal";

export const metadata: Metadata = { title: "About", description: "The story of Spyglass & Kettle, plus sport, games and private hire." };

const extras = [
  { t: "Sport on Screen", p: "Premier League, rugby and cricket in a relaxed setting.", img: "/images/whatson.png" },
  { t: "Games & Darts", p: "Board games, darts and pub classics for all ages.", img: "/images/quiz.png" },
  { t: "Private Hire", p: "Birthdays, wakes and parties in our dining room.", img: "/images/dining.png" },
];

export default function About() {
  return (
    <>
      <div className="page-hero"><h1>Our Story</h1><p>A true local, with a warm welcome for everyone.</p></div>
      <section className="ivory split">
        <Reveal className="split-text">
          <p className="eyebrow dark">Traditional Hospitality</p>
          <h2>Spyglass &amp; Kettle</h2>
          <span className="divider" />
          <p>We&apos;re a traditional pub and restaurant in the heart of Kent, serving great food, quality drinks and a warm welcome to all. Whether it&apos;s a relaxed lunch, a hearty dinner or a pint at the bar, you&apos;ll find friendly faces and a true local atmosphere.</p>
          <p>Our menus lean on classic British favourites and fresh, locally sourced ingredients, and our bar champions Kent breweries and artisan spirits.</p>
        </Reveal>
        <Parallax src="/images/pub.png" alt="The pub entrance" />
      </section>
      <section className="green">
        <Reveal><p className="eyebrow c">More fun</p><h2 className="center">Entertainment</h2></Reveal>
        <Stagger className="cards">
          {extras.map((x) => (
            <article className="card" key={x.t}>
              <div className="img"><Image src={x.img} alt="" fill sizes="360px" /></div>
              <div className="body"><h3>{x.t}</h3><p>{x.p}</p></div>
            </article>
          ))}
        </Stagger>
      </section>
    </>
  );
}
