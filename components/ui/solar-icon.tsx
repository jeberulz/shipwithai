"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type SolarIconProps = {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
};

export function SolarIcon({ icon, className, width = 20, height = 20 }: SolarIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span aria-hidden="true" className={className} style={{ display: "inline-block", width, height }} />;

  return <Icon aria-hidden="true" className={className} height={height} icon={icon} width={width} />;
}
