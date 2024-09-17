import clsx from "clsx"
import React, { useEffect, useRef } from "react"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { Icon } from "../../Icon"

export type TextareaProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  readOnly?: boolean
  autoComplete?: string
  onClick?: () => void
  disabled?: boolean
  icon?: string
  showBorder?: boolean
  rows?: number
  cols?: number
}

export const Textarea = React.forwardRef(
  <T extends FieldValues>(
    {
      label,
      placeholder,
      className,
      rules,
      name,
      control,
      readOnly = false,
      autoComplete = "off",
      onClick,
      disabled,
      icon,
      showBorder = true,
      rows,
      cols,
    }: TextareaProps<T>,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const ownRef = useRef<HTMLTextAreaElement>(null)
    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    useEffect(() => {
      if (!ownRef.current) return
      ownRef.current.disabled = true
      ownRef.current?.blur()

      const timeout = setTimeout(() => {
        if (!ownRef.current) return
        if (!disabled) ownRef.current.disabled = false
      }, 100)

      return () => {
        clearTimeout(timeout)
      }
    }, [])

    return (
      <div className={clsx("flex flex-col", className)}>
        {label && <label className="text-primary-0 font-semibold">{label}</label>}

        <div
          className={clsx(
            "flex flex-row gap-2 items-center mb-2 h-auto w-full focus:outline-none",
            showBorder &&
            `border-b ${invalid ? "border-error-10" : "border-gray-30"}`,
            {
              " text-error-10 placeholder:text-error-10": invalid,
            }
          )}
        >
          {icon && (
            <Icon
              onClick={() => {
                if (!ownRef) return
                ownRef.current?.focus()
              }}
              name={icon}
              className="cursor-pointer text-primary-0 select-none"
            />
          )}

          <textarea
            readOnly={readOnly}
            ref={ownRef}
            className={clsx(
              "resize-none appearance-none w-full focus:outline-none p-2",
              placeholder &&
              `placeholder:mb-4 placeholder:text-lg ${invalid
                ? "placeholder:text-error-10"
                : "placeholder:text-gray-10"
              } `,
              {
                "border-gray-30 text-gray-30 placeholder:text-gray-30":
                  disabled,
              }
            )}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            onClick={onClick}
            disabled={disabled}
            rows={rows}
            cols={cols}
          />
        </div>

        <div>
          {errors && (
            <span className="text-sm text-error-10">
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      </div>
    )
  }
)
