import clsx from "clsx"
import React, { SyntheticEvent } from "react"
import { Icon } from "../Icon"

export type ButtonProps = {
  onClick?: (e: SyntheticEvent) => void
  variant?: "primary" | "text" | "outlined"
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  loading?: boolean
} & (
  | { children: React.ReactNode; text?: never }
  | { text: string; children?: never }
)

export const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      onClick,
      className,
      type = "button",
      children,
      text,
      disabled,
      loading,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "flex items-center justify-center gap-2 rounded-full font-semibold",
          disabled ? "bg-primary-70 px-5 py-3 text-primary-30" : "",
          variant === "primary"
            ? "bg-primary-50 px-5 py-3  text-primary-0"
            : variant === "text"
            ? "bg-transparent p-0 text-primary-10"
            : "border border-primary-30 px-5 py-3 text-primary-0",
          className
        )}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children || text}
        {loading && (
          <Icon
            className={`animate-spin rounded-full text-primary-30`}
            name={"progress_activity"}
          />
        )}
      </button>
    )
  }
)
