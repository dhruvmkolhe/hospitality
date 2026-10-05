"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Room } from "@/lib/data";
import { nightsBetween, usd } from "@/lib/format";
import { createReservation } from "@/lib/store";

type Props = {
  rooms: Pick<Room, "id" | "name" | "rate" | "guests" | "available">[];
  defaultRoomId?: number;
};

export function BookingForm({ rooms, defaultRoomId }: Props) {
  const router = useRouter();
  const openRooms = rooms.filter((room) => room.available);
  const [roomId, setRoomId] = useState(String(defaultRoomId ?? openRooms[0]?.id ?? ""));
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const selected = openRooms.find((room) => String(room.id) === roomId);
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const total = useMemo(() => {
    if (!selected || nights <= 0) return 0;
    return selected.rate * nights;
  }, [nights, selected]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      if (!roomId || !guestName.trim() || !email.trim() || !phone.trim() || !checkIn || !checkOut || !guests) {
        setError("Please complete every line of the stay card.");
        setPending(false);
        return;
      }

      const res = createReservation({
        roomId: Number(roomId),
        guestName,
        email,
        phone,
        checkIn,
        checkOut,
        guests,
        notes,
      });

      if (res.error) {
        setError(res.error);
        setPending(false);
        return;
      }

      router.push(`/find?code=${res.reservation?.confirmationCode}`);
    } catch {
      setError("The desk is busy. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (openRooms.length === 0) {
    return (
      <p className="rounded-3xl bg-cream p-8 text-sm leading-7 text-ink/70">
        Every room is spoken for just now. Write the innkeeper from the desk, or look again next week.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] bg-cream p-6 shadow-[0_20px_50px_rgba(28,24,20,0.08)] md:p-8">
      <label className="grid gap-2 text-sm">
        Room
        <select
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          className="rounded-2xl border border-sand bg-paper px-4 py-3"
          required
        >
          {openRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} · {usd(room.rate)}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Name
          <input
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            className="rounded-2xl border border-sand bg-paper px-4 py-3"
            required
            suppressHydrationWarning
          />
        </label>
        <label className="grid gap-2 text-sm">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-2xl border border-sand bg-paper px-4 py-3"
            required
            suppressHydrationWarning
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        Telephone
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="rounded-2xl border border-sand bg-paper px-4 py-3"
          required
          suppressHydrationWarning
        />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm">
          Arrive
          <input
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="rounded-2xl border border-sand bg-paper px-4 py-3"
            required
            suppressHydrationWarning
          />
        </label>
        <label className="grid gap-2 text-sm">
          Depart
          <input
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="rounded-2xl border border-sand bg-paper px-4 py-3"
            required
            suppressHydrationWarning
          />
        </label>
        <label className="grid gap-2 text-sm">
          Guests
          <input
            type="number"
            min={1}
            max={selected?.guests ?? 4}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className="rounded-2xl border border-sand bg-paper px-4 py-3"
            required
            suppressHydrationWarning
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        Notes for the house
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          className="rounded-2xl border border-sand bg-paper px-4 py-3"
          placeholder="Anniversaries, late ferries, a spaniel..."
        />
      </label>
      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-sm text-ink/70">
          {nights > 0 && selected ? (
            <>
              {nights} night{nights === 1 ? "" : "s"} · {usd(total)}
            </>
          ) : (
            "Choose dates to see the fare."
          )}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-sea px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream disabled:opacity-60"
        >
          {pending ? "Holding the room…" : "Request stay"}
        </button>
      </div>
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
    </form>
  );
}
