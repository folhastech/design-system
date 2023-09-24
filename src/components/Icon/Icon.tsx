import clsx from "clsx"
import React from "react"

type IconProps = {
  name: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <span className={clsx("material-symbols-outlined", className)}>{name}</span>
  )
}
