import React from "react"
const modulateColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

export type ChipProps = {
  label: string
  color: string
  labelColor?: string
  modulateFactor?: number
  showDot?: boolean
}

export const Chip = ({ label, color = '#3b82f6', modulateFactor = 55, labelColor, showDot = true }: ChipProps) => {
  const modulatedColor = modulateColor(color, modulateFactor)

  return (
    <div
      className="flex items-center rounded-full px-4 py-2 text-sm font-medium gap-2"
      style={{ backgroundColor: color }}
    >
      {showDot && (
        <span className="rounded-full w-[6px] h-[6px]"
          style={{ backgroundColor: labelColor || modulatedColor }}></span>
      )}
      <span
        className="text-sm font-semibold"
        style={{ color: labelColor || modulatedColor }}
      >
        {label}
      </span>
    </div>
  )
}
