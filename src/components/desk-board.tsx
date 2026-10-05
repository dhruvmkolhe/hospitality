"use client";

import { useEffect, useState } from "react";
import { prettyDate, prettyStamp, usd } from "@/lib/format";
import {
  getReservations,
  getRooms,
  getInquiries,
  updateReservationStatus,
  setRoomAvailability,
  updateInquiryStatus,
} from "@/lib/store";
import type { Reservation, Room, Inquiry } from "@/lib/data";

export function DeskBoard({
  initialStays,
  initialRooms,
  initialLetters,
}: {
  initialStays: Reservation[];
  initialRooms: Pick<Room, "id" | "name" | "category" | "rate" | "available">[];
  initialLetters: Inquiry[];
}) {
  const [tab, setTab] = useState<"stays" | "rooms" | "letters">("stays");
  const [stays, setStays] = useState<Reservation[]>(initialStays);
  const [rooms, setRooms] = useState<Pick<Room, "id" | "name" | "category" | "rate" | "available">[]>(initialRooms);
  const [letters, setLetters] = useState<Inquiry[]>(initialLetters);

  useEffect(() => {
    setStays(getReservations());
    setRooms(getRooms());
    setLetters(getInquiries());
  }, []);

  function handleStayStatus(stayId: number, status: string) {
    const updated = updateReservationStatus(stayId, status);
    setStays(updated);
  }

  function handleRoomToggle(roomId: number, currentAvailable: boolean) {
    const updated = setRoomAvailability(roomId, !currentAvailable);
    setRooms(updated);
  }

  function handleLetterStatus(letterId: number, status: string) {
    const updated = updateInquiryStatus(letterId, status);
    setLetters(updated);
  }

  const pendingCount = stays.filter((stay) => stay.status === "pending").length;
  const openLetters = letters.filter((letter) => letter.status === "open").length;
  const openRooms = rooms.filter((room) => room.available).length;

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Pending stays" value={String(pendingCount)} />
        <Stat label="Rooms on the book" value={`${openRooms}/${rooms.length}`} />
        <Stat label="Open letters" value={String(openLetters)} />
      </section>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["stays", "The book"],
            ["rooms", "Chambers"],
            ["letters", "Letters"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.16em] transition ${
              tab === id ? "bg-sea text-cream" : "bg-cream text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "stays" ? (
        <div className="overflow-hidden rounded-[1.75rem] bg-cream">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/70 text-[11px] uppercase tracking-[0.16em] text-ink/60">
              <tr>
                <th className="px-4 py-3">Stay</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Fare</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {stays.map((stay) => (
                <tr key={stay.id} className="border-t border-sand align-top">
                  <td className="px-4 py-4">
                    <p className="font-medium">{stay.guestName}</p>
                    <p className="text-ink/60">{stay.roomName}</p>
                    <p className="text-[11px] tracking-[0.12em] text-gold">{stay.confirmationCode}</p>
                  </td>
                  <td className="px-4 py-4">
                    {prettyDate(stay.checkIn)} — {prettyDate(stay.checkOut)}
                    <p className="text-ink/60">{stay.guests} guests</p>
                  </td>
                  <td className="px-4 py-4">{usd(stay.total)}</td>
                  <td className="px-4 py-4 capitalize">{stay.status}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {stay.status === "pending" ? (
                        <button
                          type="button"
                          onClick={() => handleStayStatus(stay.id, "confirmed")}
                          className="rounded-full bg-sea px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-cream"
                        >
                          Confirm
                        </button>
                      ) : null}
                      {stay.status !== "cancelled" && stay.status !== "completed" ? (
                        <button
                          type="button"
                          onClick={() => handleStayStatus(stay.id, "cancelled")}
                          className="rounded-full border border-ink/15 px-3 py-1 text-[11px] uppercase tracking-[0.12em]"
                        >
                          Cancel
                        </button>
                      ) : null}
                      {stay.status === "confirmed" ? (
                        <button
                          type="button"
                          onClick={() => handleStayStatus(stay.id, "completed")}
                          className="rounded-full border border-ink/15 px-3 py-1 text-[11px] uppercase tracking-[0.12em]"
                        >
                          Check out
                        </button>
                      ) : null}
                    </div>
                    {stay.notes ? <p className="mt-2 max-w-xs text-xs italic text-ink/60">{stay.notes}</p> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {tab === "rooms" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {rooms.map((room) => (
            <article key={room.id} className="flex items-center justify-between rounded-[1.5rem] bg-cream p-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{room.category}</p>
                <h3 className="font-display text-2xl">{room.name}</h3>
                <p className="text-sm text-ink/60">{usd(room.rate)} / night</p>
              </div>
              <button
                type="button"
                onClick={() => handleRoomToggle(room.id, room.available)}
                className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition ${
                  room.available ? "bg-sea text-cream" : "bg-sand text-ink"
                }`}
              >
                {room.available ? "On the book" : "Held"}
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "letters" ? (
        <div className="grid gap-4">
          {letters.map((letter) => (
            <article key={letter.id} className="rounded-[1.5rem] bg-cream p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{letter.topic}</p>
                  <h3 className="font-display text-2xl">{letter.name}</h3>
                  <p className="text-sm text-ink/60">
                    {letter.email} · {prettyStamp(letter.createdAt)}
                  </p>
                </div>
                {letter.status === "open" ? (
                  <button
                    type="button"
                    onClick={() => handleLetterStatus(letter.id, "closed")}
                    className="rounded-full bg-sea px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-cream"
                  >
                    File away
                  </button>
                ) : (
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink/50">Filed</span>
                )}
              </div>
              <p className="mt-4 text-sm leading-7 text-ink/80">{letter.message}</p>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-cream p-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{label}</p>
      <p className="mt-2 font-display text-4xl">{value}</p>
    </div>
  );
}
