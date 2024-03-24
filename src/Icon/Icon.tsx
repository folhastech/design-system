import clsx from "clsx"
import React from "react"

export type IconProps = {
  name: string
  className?: string
  onClick?: (e: React.SyntheticEvent) => void
}

export const Icon: React.FC<IconProps> = ({ name, className, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={clsx("material-symbols-outlined", className)}
    >
      {name}
    </span>
  )
}
