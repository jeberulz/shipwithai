"use client";

import Link from "next/link";
import { trackMetaEvent, generateEventId } from "@/lib/meta-pixel-client";
import type { ComponentProps } from "react";

type TrackableLinkProps = ComponentProps<typeof Link> & {
  trackEvent?: "InitiateCheckout" | "ViewContent";
  trackParams?: Record<string, unknown>;
};

export function TrackableLink({
  trackEvent,
  trackParams,
  onClick,
  ...props
}: TrackableLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        if (trackEvent) {
          trackMetaEvent(trackEvent, trackParams, generateEventId());
        }
        if (onClick) onClick(e);
      }}
    />
  );
}
