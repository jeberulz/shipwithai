"use client";

import { useEffect } from "react";
import { trackMetaEvent, generateEventId } from "@/lib/meta-pixel-client";

export function MetaPixelViewContent({
  contentName,
  contentCategory,
  contentType = "page",
}: {
  contentName: string;
  contentCategory?: string;
  contentType?: string;
}) {
  useEffect(() => {
    trackMetaEvent(
      "ViewContent",
      {
        content_name: contentName,
        content_category: contentCategory,
        content_type: contentType,
      },
      generateEventId()
    );
  }, [contentName, contentCategory, contentType]);

  return null;
}
