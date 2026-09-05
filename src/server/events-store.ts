import { promises as fs } from "fs";
import path from "path";
import { eventConfig } from "@/data/event";
import { DEFAULT_EVENT_ID } from "@/config/api";
import type { EventsStoreFile, StoredEvent } from "@/types/event-record";

const storePath = path.join(process.cwd(), "data/events-store.json");

function buildSeedEvent(): StoredEvent {
  const now = new Date().toISOString();
  return {
    id: DEFAULT_EVENT_ID,
    slug: DEFAULT_EVENT_ID,
    status: "active",
    edition: eventConfig.edition,
    title: eventConfig.title,
    shortTitle: eventConfig.shortTitle,
    description: eventConfig.description,
    lema: eventConfig.lema,
    slogan: eventConfig.slogan,
    location: eventConfig.location,
    province: eventConfig.province,
    country: eventConfig.country,
    dateRange: eventConfig.dateRange,
    startDate: eventConfig.startDate,
    endDate: eventConfig.endDate,
    heroImage: eventConfig.heroImage,
    createdAt: now,
    updatedAt: now,
  };
}

async function writeStore(store: EventsStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

async function ensureStore(): Promise<EventsStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as EventsStoreFile;
    if (parsed.events?.length) return parsed;
  } catch {
    // seed below
  }

  const seed: EventsStoreFile = { events: [buildSeedEvent()] };
  await writeStore(seed);
  return seed;
}

export async function listEvents(status?: "active" | "archived" | "draft" | "all") {
  const store = await ensureStore();
  if (!status || status === "all") return store.events;
  return store.events.filter((event) => event.status === status);
}

export async function getEventById(eventId: string): Promise<StoredEvent | null> {
  const store = await ensureStore();
  return store.events.find((event) => event.id === eventId || event.slug === eventId) ?? null;
}

export async function getActiveEvent(): Promise<StoredEvent | null> {
  const store = await ensureStore();
  return store.events.find((event) => event.status === "active") ?? store.events[0] ?? null;
}

export async function saveEvents(events: StoredEvent[]): Promise<StoredEvent[]> {
  const store: EventsStoreFile = { events };
  await writeStore(store);
  return events;
}
