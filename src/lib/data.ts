const photo = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;

export type Room = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  rate: number;
  guests: number;
  beds: string;
  sizeSqft: number;
  imageUrl: string;
  gallery: string[];
  amenities: string[];
  available: boolean;
};

export type Reservation = {
  id: number;
  confirmationCode: string;
  roomId: number;
  roomName: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes: string;
  status: string;
  total: number;
  createdAt: string;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: string;
  createdAt: string;
};

export const initialRooms: Room[] = [
  {
    id: 1,
    slug: "tide-suite",
    name: "Tide Suite",
    category: "Ocean Suite",
    description:
      "Floor-to-ceiling Atlantic light, a private terrace, and linen that smells of cedar and salt.",
    longDescription:
      "The Tide Suite is our most requested room — a quiet, pale chamber facing the open water. Wake to the sound of the harbor bell, take coffee on the terrace, and watch weather move across the bay. A soaking tub sits beside the window, and the fireplace is laid each evening before turndown.",
    rate: 485,
    guests: 2,
    beds: "King",
    sizeSqft: 620,
    imageUrl: photo(6752175),
    gallery: [photo(6752175), photo(3761182), photo(7166637)],
    amenities: ["Private terrace", "Soaking tub", "Wood fireplace", "Morning tray"],
    available: true,
  },
  {
    id: 2,
    slug: "driftwood-chamber",
    name: "Driftwood Chamber",
    category: "Chamber",
    description:
      "Warm plaster walls, a quilted headboard, and a writing desk that looks into the garden pines.",
    longDescription:
      "Driftwood is for guests who want hush more than spectacle. The palette is oat, clay, and unbleached linen. A deep chair sits by the window with a stack of coastal field guides. Bath is marble and brass, stocked with our own kelp-and-cedar soap.",
    rate: 365,
    guests: 2,
    beds: "Queen",
    sizeSqft: 410,
    imageUrl: photo(7546638),
    gallery: [photo(7546638), photo(7546281), photo(7166637)],
    amenities: ["Garden view", "Writing desk", "Rain shower", "Record player"],
    available: true,
  },
  {
    id: 3,
    slug: "harbor-cottage",
    name: "Harbor Cottage",
    category: "Cottage",
    description:
      "A freestanding cottage at the edge of the lawn, with a sitting room, kitchenette, and two beds.",
    longDescription:
      "Harbor Cottage is our family and long-stay room. A sitting room with a hearth, a kitchenette for late tea, and a bedroom dressed in pale wool. The porch faces the inner harbor, where lobster boats return at dusk. Dogs are welcome with notice.",
    rate: 540,
    guests: 4,
    beds: "King + sofa bed",
    sizeSqft: 780,
    imageUrl: photo(2725675),
    gallery: [photo(2725675), photo(14036249), photo(6466304)],
    amenities: ["Private porch", "Kitchenette", "Hearth", "Dog friendly"],
    available: true,
  },
  {
    id: 4,
    slug: "cliffside-suite",
    name: "Cliffside Suite",
    category: "Ocean Suite",
    description:
      "A wide balcony over the rocks, palms in the wind, and a bed that faces the horizon line.",
    longDescription:
      "Cliffside hangs over the Atlantic. The balcony is large enough for supper, the bath has a view, and the sitting alcove is made for storms. We leave a bottle of Maine sparkling cider on arrival and a wool throw on the chaise.",
    rate: 610,
    guests: 2,
    beds: "King",
    sizeSqft: 700,
    imageUrl: photo(7368344),
    gallery: [photo(7368344), photo(133920), photo(12387908)],
    amenities: ["Ocean balcony", "Arrival cider", "Chaise lounge", "Turndown fire"],
    available: true,
  },
  {
    id: 5,
    slug: "lantern-room",
    name: "Lantern Room",
    category: "Chamber",
    description:
      "A smaller, honey-lit room under the eaves — perfect for a single night or a quiet writer’s stay.",
    longDescription:
      "Lantern is our most intimate room. Beamed ceilings, a quilted headboard, and a window that frames the village green. Ideal for one or two guests who want the inn’s quietest corner and an easy walk to breakfast.",
    rate: 295,
    guests: 2,
    beds: "Queen",
    sizeSqft: 320,
    imageUrl: photo(7546281),
    gallery: [photo(7546281), photo(2725675), photo(6466304)],
    amenities: ["Village view", "Reading nook", "Rain shower", "Early breakfast"],
    available: true,
  },
  {
    id: 6,
    slug: "sea-glass",
    name: "Sea Glass Chamber",
    category: "Chamber",
    description:
      "Twin beds, pale oak, and a long window of shifting water — made for friends traveling together.",
    longDescription:
      "Sea Glass is bright, spare, and facing the water. Twin beds can be dressed as a king on request. The room takes morning light first, and the window seat is the best place in the house to watch weather arrive.",
    rate: 420,
    guests: 2,
    beds: "Twins or king",
    sizeSqft: 480,
    imageUrl: photo(29702285),
    gallery: [photo(29702285), photo(6752175), photo(3761182)],
    amenities: ["Sea view", "Window seat", "Flexible beds", "Tea tray"],
    available: true,
  },
];

const today = new Date();
const iso = (offset: number) => {
  const next = new Date(today);
  next.setDate(today.getDate() + offset);
  return next.toISOString().slice(0, 10);
};

export const initialReservations: Reservation[] = [
  {
    id: 1,
    confirmationCode: "HH-7K2M9Q",
    roomId: 1,
    roomName: "Tide Suite",
    guestName: "Elena Voss",
    email: "elena@example.com",
    phone: "207-555-0144",
    checkIn: iso(5),
    checkOut: iso(8),
    guests: 2,
    notes: "Anniversary — please leave champagne.",
    status: "confirmed",
    total: 485 * 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    confirmationCode: "HH-4N8R2C",
    roomId: 3,
    roomName: "Harbor Cottage",
    guestName: "James Whitaker",
    email: "james@example.com",
    phone: "207-555-0190",
    checkIn: iso(12),
    checkOut: iso(16),
    guests: 3,
    notes: "Traveling with a well-mannered spaniel.",
    status: "pending",
    total: 540 * 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    confirmationCode: "HH-9P3L6W",
    roomId: 5,
    roomName: "Lantern Room",
    guestName: "Nora Hale",
    email: "nora@example.com",
    phone: "207-555-0118",
    checkIn: iso(-2),
    checkOut: iso(1),
    guests: 1,
    notes: "Late arrival after the last ferry.",
    status: "completed",
    total: 295,
    createdAt: new Date().toISOString(),
  },
];

export const initialInquiries: Inquiry[] = [
  {
    id: 1,
    name: "Maren Cole",
    email: "maren@example.com",
    topic: "Private supper",
    message:
      "Could the Tide Table host six of us on Saturday after the solstice concert? We would love the window booth.",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Owen Briggs",
    email: "owen@example.com",
    topic: "Wellness",
    message: "Do you have a couples cedar soak available the morning after we check in?",
    status: "open",
    createdAt: new Date().toISOString(),
  },
];
