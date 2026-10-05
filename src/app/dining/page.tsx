import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dining" };

const table =
  "https://images.pexels.com/photos/36694451/pexels-photo-36694451.jpeg?auto=compress&cs=tinysrgb&w=1800";
const seafood =
  "https://images.pexels.com/photos/3606800/pexels-photo-3606800.jpeg?auto=compress&cs=tinysrgb&w=1600";
const breakfast =
  "https://images.pexels.com/photos/6466304/pexels-photo-6466304.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function DiningPage() {
  return (
    <main>
      <section className="relative isolate h-[60vh] min-h-[380px] overflow-hidden bg-sea-deep">
        <Image src={table} alt="The Tide Table" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/85 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-12 text-cream">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">The Tide Table</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl">Supper when the boats come in.</h1>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-lg leading-8 text-ink/80">
            The dining room faces the inner harbor. We cook what the boats bring: crudo, lobster in
            brown butter, a green salad from the garden behind the cottage. House guests breakfast
            here; supper is open to the village on Friday and Saturday.
          </p>
          <dl className="mt-8 grid gap-4 text-sm">
            <div>
              <dt className="uppercase tracking-[0.16em] text-gold">Breakfast</dt>
              <dd className="mt-1">7:00 – 10:30 · included for the house</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-gold">Supper</dt>
              <dd className="mt-1">Friday & Saturday from 6:00 · tasting menu $95</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-gold">Private table</dt>
              <dd className="mt-1">The window booth seats six. Write ahead.</dd>
            </div>
          </dl>
        </div>
        <div className="grid gap-4">
          <div className="relative h-56 overflow-hidden rounded-[1.5rem]">
            <Image src={seafood} alt="Seafood at the Tide Table" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative h-56 overflow-hidden rounded-[1.5rem]">
            <Image src={breakfast} alt="Breakfast tray" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Reserve a table</p>
          <h2 className="mt-3 font-display text-4xl italic">A letter for the kitchen.</h2>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}
