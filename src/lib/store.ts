"use client";

import {
  initialRooms,
  initialReservations,
  initialInquiries,
  type Room,
  type Reservation,
  type Inquiry,
} from "./data";
import { makeConfirmationCode, nightsBetween, overlaps } from "./format";

const ROOMS_KEY = "hh_rooms_v1";
const RESERVATIONS_KEY = "hh_reservations_v1";
const INQUIRIES_KEY = "hh_inquiries_v1";

function isClient() {
  return typeof window !== "undefined";
}

export function getRooms(): Room[] {
  if (!isClient()) return initialRooms;
  try {
    const data = localStorage.getItem(ROOMS_KEY);
    if (!data) {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(initialRooms));
      return initialRooms;
    }
    return JSON.parse(data);
  } catch {
    return initialRooms;
  }
}

export function setRoomAvailability(roomId: number, available: boolean): Room[] {
  const rooms = getRooms().map((r) => (r.id === roomId ? { ...r, available } : r));
  if (isClient()) {
    try {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
    } catch {}
  }
  return rooms;
}

export function getReservations(filterQuery?: string): Reservation[] {
  let list: Reservation[] = initialReservations;
  if (isClient()) {
    try {
      const data = localStorage.getItem(RESERVATIONS_KEY);
      if (!data) {
        localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(initialReservations));
      } else {
        list = JSON.parse(data);
      }
    } catch {}
  }

  if (filterQuery) {
    const q = filterQuery.trim().toLowerCase();
    list = list.filter(
      (r) =>
        r.confirmationCode.toLowerCase() === q ||
        r.email.toLowerCase() === q ||
        r.guestName.toLowerCase().includes(q)
    );
  }

  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createReservation(params: {
  roomId: number;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes?: string;
}): { reservation?: Reservation; error?: string } {
  const rooms = getRooms();
  const room = rooms.find((r) => r.id === params.roomId);
  if (!room) {
    return { error: "That chamber is not in the house." };
  }
  if (!room.available) {
    return { error: "That chamber is held from the book." };
  }
  if (params.guests > room.guests) {
    return { error: `The ${room.name} sleeps ${room.guests}.` };
  }

  const nights = nightsBetween(params.checkIn, params.checkOut);
  if (nights <= 0) {
    return { error: "Departure must fall after arrival." };
  }

  const existing = getReservations();
  const clash = existing
    .filter((stay) => stay.roomId === params.roomId && stay.status !== "cancelled")
    .some((stay) => overlaps(params.checkIn, params.checkOut, stay.checkIn, stay.checkOut));

  if (clash) {
    return { error: "Those nights are already spoken for." };
  }

  const newReservation: Reservation = {
    id: Date.now(),
    confirmationCode: makeConfirmationCode(),
    roomId: room.id,
    roomName: room.name,
    guestName: params.guestName.trim(),
    email: params.email.trim(),
    phone: params.phone.trim(),
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: params.guests,
    notes: params.notes?.trim() ?? "",
    status: "pending",
    total: room.rate * nights,
    createdAt: new Date().toISOString(),
  };

  const updated = [newReservation, ...existing];
  if (isClient()) {
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    } catch {}
  }

  return { reservation: newReservation };
}

export function updateReservationStatus(
  reservationId: number,
  status: string
): Reservation[] {
  const stays = getReservations().map((s) =>
    s.id === reservationId ? { ...s, status } : s
  );
  if (isClient()) {
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(stays));
    } catch {}
  }
  return stays;
}

export function getInquiries(): Inquiry[] {
  if (!isClient()) return initialInquiries;
  try {
    const data = localStorage.getItem(INQUIRIES_KEY);
    if (!data) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(initialInquiries));
      return initialInquiries;
    }
    return JSON.parse(data);
  } catch {
    return initialInquiries;
  }
}

export function createInquiry(params: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Inquiry {
  const list = getInquiries();
  const newInquiry: Inquiry = {
    id: Date.now(),
    name: params.name.trim(),
    email: params.email.trim(),
    topic: params.topic.trim(),
    message: params.message.trim(),
    status: "open",
    createdAt: new Date().toISOString(),
  };
  const updated = [newInquiry, ...list];
  if (isClient()) {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    } catch {}
  }
  return newInquiry;
}

export function updateInquiryStatus(id: number, status: string): Inquiry[] {
  const letters = getInquiries().map((l) =>
    l.id === id ? { ...l, status } : l
  );
  if (isClient()) {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(letters));
    } catch {}
  }
  return letters;
}
