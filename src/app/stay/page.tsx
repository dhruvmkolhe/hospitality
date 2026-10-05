import { initialRooms } from "@/lib/data";
import { BookingForm } from "@/components/booking-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book a stay" };

export default function StayPage() {
  const list = [...initialRooms].sort((a, b) => a.rate - b.rate);

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Guest house</p>
        <h1 className="mt-3 font-display text-5xl italic md:text-6xl">Ask for the nights you need.</h1>
        <p className="mt-5 text-base leading-8 text-ink/75">
          Stays begin as a request. The innkeeper confirms from the desk, usually before supper. A
          confirmation code is written into the book and sent back to you here.
        </p>
        <ul className="mt-8 space-y-3 text-sm leading-7 text-ink/70">
          <li>Breakfast is included, served in the dining room until 10:30.</li>
          <li>Check-in from 3 p.m. · Check-out by 11.</li>
          <li>The last ferry is at dusk; write us if you will be later.</li>
        </ul>
      </div>
      <BookingForm rooms={list} />
    </main>
  );
}
