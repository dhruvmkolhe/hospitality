import { Suspense } from "react";
import { LookupForm } from "@/components/lookup-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Find a stay" };

export default function FindPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">The ledger</p>
      <h1 className="mt-3 font-display text-5xl italic">Find a reservation.</h1>
      <p className="mt-4 text-base leading-8 text-ink/75">
        Enter your confirmation code (HH-······) or the email on the stay card. Newly requested
        nights appear here at once, pending the innkeeper’s hand.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-ink/60">Loading ledger…</p>}>
          <LookupForm />
        </Suspense>
      </div>
    </main>
  );
}
