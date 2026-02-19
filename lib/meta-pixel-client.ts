"use client";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "InitiateCheckout";

/**
 * Generate a unique event ID for deduplication between
 * client-side pixel and server-side CAPI.
 */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Fire a Meta Pixel standard event with optional parameters.
 * Safe to call even if fbq hasn't loaded yet (it queues).
 */
export function trackMetaEvent(
  eventName: MetaStandardEvent,
  params?: Record<string, unknown>,
  eventId?: string
): void {
  if (typeof window === "undefined" || !window.fbq) return;

  if (eventId) {
    window.fbq("track", eventName, params ?? {}, { eventID: eventId });
  } else {
    window.fbq("track", eventName, params ?? {});
  }
}

/**
 * Set advanced matching data after the pixel has loaded.
 * Used when user provides email in the form.
 */
export function setMetaAdvancedMatching(data: {
  em?: string;
  fn?: string;
  ln?: string;
}): void {
  if (typeof window === "undefined" || !window.fbq) return;

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return;

  window.fbq("init", pixelId, data);
}

/**
 * Get the _fbp (browser ID) and _fbc (click ID) cookies
 * to pass to server-side CAPI for deduplication.
 */
export function getMetaCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};

  const cookies = document.cookie.split("; ");
  const fbp = cookies.find((c) => c.startsWith("_fbp="))?.split("=")[1];
  const fbc = cookies.find((c) => c.startsWith("_fbc="))?.split("=")[1];

  return { fbp, fbc };
}
