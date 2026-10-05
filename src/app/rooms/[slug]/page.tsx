import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialRooms } from "@/lib/data";
import { BookingForm } from "@/components/booking-form";
import { usd } from "@/lib/format";
import type { Metadata } from "next";

export function generateStaticParams() {
  return initialRooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = initialRooms.find((r) => r.slug === slug);
  return { title: room?.name ?? "Room" };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = initialRooms.find((r) => r.slug === slug);
  if (!room) notFound();

  return (
    <main>
      <section className="relative isolate h-[70vh] min-h-[420px] overflow-hidden bg-sea-deep">
        <Image src={room.imageUrl} alt={room.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-deep via-sea-deep/20 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-12">
          <div className="text-cream">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{room.category}</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl">{room.name}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-cream/70">
              {usd(room.rate)} / night · {room.beds} · sleeps {room.guests} · {room.sizeSqft} sq ft
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-lg leading-8 text-ink/80">{room.longDescription}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {room.amenities.map((item) => (
              <li key={item} className="rounded-full bg-sand px-4 py-2 text-xs uppercase tracking-[0.14em]">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {room.gallery.slice(1).map((src) => (
              <div key={src} className="relative h-56 overflow-hidden rounded-[1.5rem]">
                <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          {!room.available ? (
            <p className="mt-8 rounded-2xl bg-sand px-5 py-4 text-sm">
              This chamber is held from the book. Choose another room, or write the innkeeper.
            </p>
          ) : null}
          <Link href="/rooms" className="mt-8 inline-block text-xs uppercase tracking-[0.18em] text-sea">
            All rooms
          </Link>
        </div>
        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-gold">Hold these nights</p>
          <BookingForm rooms={initialRooms} defaultRoomId={room.id} />
        </div>
      </section>
    </main>
  );
}
