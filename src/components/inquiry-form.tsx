"use client";

import { useState, type FormEvent } from "react";
import { createInquiry } from "@/lib/store";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Rooms");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      if (!name.trim() || !email.trim() || !message.trim()) {
        setError("Name, email, and a message are required.");
        setPending(false);
        return;
      }
      createInquiry({ name, email, topic, message });
      setDone(true);
    } catch {
      setError("The desk could not take your note.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-[2rem] bg-cream p-8 font-display text-2xl italic text-sea">
        The innkeeper has your letter. We write back by late afternoon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] bg-cream p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
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
        Topic
        <select
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="rounded-2xl border border-sand bg-paper px-4 py-3"
        >
          <option>Rooms</option>
          <option>Private supper</option>
          <option>Wellness</option>
          <option>Celebration</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        Message
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className="rounded-2xl border border-sand bg-paper px-4 py-3"
          required
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="justify-self-start rounded-full bg-sea px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream"
      >
        {pending ? "Sending…" : "Send to the desk"}
      </button>
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
    </form>
  );
}
