import {daysOfWeek} from "@/constants/constants";

// Helper: returns true if the day is selectable
export function isSelectable(day: string) {
  const todayIdx = new Date().getDay();
  const dayIdx = daysOfWeek.indexOf(day);
  // Calculate days difference, wrapping around the week
  const diff = (dayIdx - todayIdx + 7) % 7;
  // Must be at least 2 days ahead (minimum one day gap)
  return diff > 1;
}

// Safely decode a URI component, returning a fallback on malformed input
export function safeDecodeURIComponent(value: string | undefined | null, fallback = ""): string {
  if (!value) return fallback;
  try {
    return decodeURIComponent(value);
  } catch {
    return fallback;
  }
}