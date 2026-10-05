import { initialInquiries, initialReservations, initialRooms } from "@/lib/data";
import { DeskBoard } from "@/components/desk-board";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Innkeeper desk" };

export default function DeskPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Private to the house</p>
      <h1 className="mt-3 font-display text-5xl italic">Innkeeper desk</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-ink/75">
        Confirm requested nights, hold a chamber from the public book, and file letters from the
        guest house. Both sides write to the same ledger.
      </p>
      <div className="mt-10">
        <DeskBoard
          initialStays={initialReservations}
          initialRooms={initialRooms.map((room) => ({
            id: room.id,
            name: room.name,
            category: room.category,
            rate: room.rate,
            available: room.available,
          }))}
          initialLetters={initialInquiries}
        />
      </div>
    </main>
  );
}
