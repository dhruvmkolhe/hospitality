import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/lib/data";
import { usd } from "@/lib/format";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link href={`/rooms/${room.slug}`} className="group block">
      <article className="overflow-hidden rounded-[1.5rem] bg-cream shadow-[0_18px_50px_rgba(28,24,20,0.08)]">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={room.imageUrl}
            alt={room.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
            {room.category}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-3xl">{room.name}</h3>
            <p className="text-sm text-sea">
              {usd(room.rate)}
              <span className="text-ink/50"> / night</span>
            </p>
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/70">{room.description}</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-gold">
            {room.beds} · {room.guests} guests · {room.sizeSqft} sq ft
          </p>
        </div>
      </article>
    </Link>
  );
}
