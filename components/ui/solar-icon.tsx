"use client";

import { Icon } from "@iconify/react";

type SolarIconProps = {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
};

export function SolarIcon({ icon, className, width = 20, height = 20 }: SolarIconProps) {
  return <Icon aria-hidden="true" className={className} height={height} icon={icon} width={width} />;
}
