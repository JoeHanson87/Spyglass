import Image from "next/image";
import Link from "next/link";
import { EventCard, NightCard } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Parallax } from "@/components/Parallax";
import { Reveal, Stagger } from "@/components/Reveal";
import { getEvents, getSpecialNights } from "@/lib/data";

export const revalidate = 3600;

const drinks = [
  { img: "/images/bar.png", alt: "The bar", t: "Draught & Cask", p: "Local ales from Kent breweries, crisp lagers and a rotating guest cask." },
  { img: "/images/whatson.png", alt: "Dining room", t: "Gins & Spirits", p: "A fine range of artisan gins, small-batch whiskies and spiced rums." },
  { img: "/images/food.png", alt: "Steak with a glass of red wine", t: "Wines & Cocktails", p: "Hand-picked wines by the glass and classic cocktails, shaken properly." },
];

export default async function Home() {
  const [events, nights] = await Promise.all([getEvents({ limit: 3 }), getSpecialNights()]);
  return (
    <>
      <Hero />

      <section className="ivory split" id="welcome">
        <Reveal className="split-text">
          <p className="eyebrow dark">Traditional Hospitality</p>
          <h2>A Warm Welcome<br />in the Heart of Kent</h2>
          <span className="divider" />
          <p><strong>Spyglass &amp; Kettle</strong> is a traditional pub and restaurant serving great food, quality drinks and a warm welcome to all. Whether you&apos;re joining us for a relaxed lunch, a hearty dinner or just a drink at the bar, you&apos;ll find a charming setting, friendly faces and a true local atmosphere.</p>
          <Link className="btn btn-green" href="/about">Our Story</Link>
        </Reveal>
        <Parallax src="/images/pub.png" alt="The Spyglass & Kettle pub entrance with hanging baskets" />
      </section>

      <section className="green" id="drinks">
        <Reveal><p className="eyebrow c">Relax &middot; Enjoy &middot; Feel at Home</p><h2 className="center">Great Drinks at the Bar</h2></Reveal>
        <Stagger className="cards">
          {drinks.map((d) => (
            <article className="card" key={d.t}>
              <div className="img"><Image src={d.img} alt={d.alt} fill sizes="360px" /></div>
              <div className="body"><h3>{d.t}</h3><p>{d.p}</p></div>
            </article>
          ))}
        </Stagger>
      </section>

      <section className="ivory split rev" id="food">
        <Parallax src="/images/dining.png" alt="Our dining room" />
        <Reveal className="split-text">
          <p className="eyebrow dark">Seasonal Menus</p>
          <h2>Delicious Food<br />Great Company</h2>
          <span className="divider" />
          <p><strong>Our menus</strong> are inspired by classic British favourites, using fresh, locally sourced ingredients. From hearty pub dishes to seasonal specials, there&apos;s something for everyone to enjoy.</p>
          <Link className="btn btn-green" href="/menu">Explore Our Menu</Link>
        </Reveal>
      </section>

      <section className="paper">
        <Reveal><p className="eyebrow dark c">Coming up</p><h2 className="center">What&apos;s On</h2></Reveal>
        {events.length ? (
          <Stagger className="date-grid">{events.map((e) => <EventCard key={e.id} e={e} />)}</Stagger>
        ) : <p className="empty">New events announced soon.</p>}
        <Reveal className="more"><Link className="btn btn-green" href="/whats-on">See Everything</Link></Reveal>
      </section>

      <section className="green" id="special-nights">
        <Reveal><p className="eyebrow c">Every week</p><h2 className="center">Special Nights</h2></Reveal>
        <Stagger className="date-grid">{nights.map((n) => <NightCard key={n.id} n={n} />)}</Stagger>
      </section>

      <section className="ivory center">
        <Reveal>
          <p className="eyebrow dark c">Reserve your table</p>
          <h2>Join Us Tonight</h2>
          <span className="divider c" />
          <div className="cta" style={{ justifyContent: "center" }}><Link className="btn btn-green" href="/book">Book a Table</Link></div>
        </Reveal>
      </section>
    </>
  );
}
