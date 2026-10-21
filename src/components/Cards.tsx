import Image from "next/image";
import { WEEKDAYS, dateParts, formatTime } from "@/lib/data";

type EventLike = { title: string; date: string; startTime: string; description: string; image: string };
type NightLike = { title: string; weekday: number; startTime: string; description: string; image: string };

export function EventCard({ e }: { e: EventLike }) {
  const d = dateParts(e.date);
  return (
    <article className="date-card">
      <div className="img"><Image src={e.image || "/images/pub.png"} alt="" fill sizes="(max-width:600px) 100vw, 360px" /></div>
      <div className="row">
        <time className="date" dateTime={e.date}><small>{d.dow}</small><b>{d.day}</b><small>{d.month}</small></time>
        <div>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p className="when">From {formatTime(e.startTime.slice(0, 5))}</p>
        </div>
      </div>
    </article>
  );
}

export function NightCard({ n }: { n: NightLike }) {
  return (
    <article className="date-card">
      <div className="img"><Image src={n.image || "/images/bar.png"} alt="" fill sizes="(max-width:600px) 100vw, 360px" /></div>
      <div className="row">
        <div className="date"><small>Every</small><b>{WEEKDAYS[n.weekday].slice(0, 3)}</b><small>{formatTime(n.startTime.slice(0, 5))}</small></div>
        <div>
          <h3>{n.title}</h3>
          <p>{n.description}</p>
          <p className="when">From {formatTime(n.startTime.slice(0, 5))}</p>
        </div>
      </div>
    </article>
  );
}
