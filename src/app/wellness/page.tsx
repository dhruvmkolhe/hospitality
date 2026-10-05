import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wellness" };

const soak =
  "https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&w=1800";
const bath =
  "https://images.pexels.com/photos/7166637/pexels-photo-7166637.jpeg?auto=compress&cs=tinysrgb&w=1600";
const pool =
  "https://images.pexels.com/photos/12387908/pexels-photo-12387908.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function WellnessPage() {
  return (
    <main>
      <section className="relative isolate h-[60vh] min-h-[380px] overflow-hidden bg-sea-deep">
        <Image src={soak} alt="Cedar soak" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/80 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-12 text-cream">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">The soak house</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl">Steam, cedar, and salt air.</h1>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem]">
          <Image src={pool} alt="Pool above the rocks" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="text-lg leading-8 text-ink/80">
            A small spa sits above the rocks: a cedar soak for two, a marble bath, and a pool that
            holds the last of the light. Treatments are by appointment — kelp wrap, hot stone, or a
            quiet hour with nothing on the book.
          </p>
          <ul className="mt-8 space-y-3 text-sm leading-7">
            <li>Cedar soak · 50 minutes · $145</li>
            <li>Kelp and clay wrap · 80 minutes · $190</li>
            <li>Couples hour · $240, including tea on the terrace</li>
          </ul>
          <div className="relative mt-8 h-48 overflow-hidden rounded-[1.5rem]">
            <Image src={bath} alt="Marble bath" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Request an hour</p>
          <h2 className="mt-3 font-display text-4xl italic">The soak book is kept at the desk.</h2>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}
