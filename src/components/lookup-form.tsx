"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { prettyDate, usd } from "@/lib/format";
import { getReservations } from "@/lib/store";
import type { Reservation } from "@/lib/data";

export function LookupForm({ initialQuery = "" }: { initialQuery?: string }) {
  const searchParams = useSearchParams();
  const paramQuery = searchParams.get("code") || searchParams.get("email") || initialQuery;

  const [query, setQuery] = useState(paramQuery);
  const [stays, setStays] = useState<Reservation[] | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function search(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setPending(true);
    setError("");
    try {
      const results = getReservations(trimmed);
      if (results.length === 0) {
        setStays([]);
      } else {
        setStays(results);
      }
    } catch {
      setError("The ledger could not be opened.");
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (paramQuery) {
      setQuery(paramQuery);
      search(paramQuery);
    }
  }, [paramQuery]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    search(query);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-[2rem] bg-cream p-6 md:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Confirmation code or email"
          className="flex-1 rounded-2xl border border-sand bg-paper px-4 py-3"
          required
          suppressHydrationWarning
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-sea px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream"
        >
          {pending ? "Looking…" : "Find stay"}
        </button>
      </form>
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
      {stays && stays.length === 0 ? (
        <p className="text-sm text-ink/70">No stay matches that name in the book.</p>
      ) : null}
      <div className="grid gap-4">
        {stays?.map((stay) => (
          <article key={stay.confirmationCode} className="rounded-[1.5rem] bg-cream p-6 shadow-[0_12px_40px_rgba(28,24,20,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{stay.confirmationCode}</p>
            <h3 className="mt-2 font-display text-3xl">{stay.roomName}</h3>
            <p className="mt-2 text-sm text-ink/70">
              {stay.guestName} · {prettyDate(stay.checkIn)} — {prettyDate(stay.checkOut)} · {stay.guests} guests
            </p>
            <p className="mt-3 text-sm">
              {usd(stay.total)} · <span className="capitalize">{stay.status}</span>
            </p>
            {stay.notes ? <p className="mt-3 text-sm italic text-ink/60">{stay.notes}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
