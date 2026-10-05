import { initialRooms } from "@/lib/data";
import { RoomCard } from "@/components/room-card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rooms" };

export default function RoomsPage() {
  const list = [...initialRooms].sort((a, b) => a.rate - b.rate);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">The chambers</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl italic md:text-6xl">
        Six rooms, each with a different weather.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-ink/70">
        Ocean suites for the long look, chambers for quiet work, a cottage when you need a porch and
        a dog bowl. Rates are nightly, breakfast included.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {list.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
