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

export type Props<T extends FieldValues> = {
  label?: string
  type?: string
  placeholder?: string
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  readOnly?: boolean
  autoComplete?: string
  onClick?: () => void
  disabled?: boolean
  minHour?: string
  icon?: string
  pattern?: string
}

export const TextField = React.forwardRef(
  <T extends FieldValues>(
    {
      label,
      type = "text",
      placeholder,
      className,
      rules,
      name,
      control,
      readOnly = false,
      autoComplete = "off",
      onClick,
      disabled,
      minHour,
      icon,
      pattern,
    }: Props<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const ownRef = useRef<HTMLInputElement>(null)
    const [iconName, setIconName] = React.useState<string | undefined>("")
    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    useEffect(() => {
      if (!ownRef.current) return
      // Disable the input when the component mounts
      ownRef.current.disabled = true
      ownRef.current?.removeAttribute("autofocus")
      ownRef.current?.blur()
      const timeout = setTimeout(() => {
        if (!ownRef.current) return
        // Enable the input after a delay
        ownRef.current.disabled = false
      }, 500) // Adjust the delay as needed

      return () => {
        clearTimeout(timeout) // Clear the timeout if the component unmounts
      }
    }, [])

    return (
      <div className={clsx("flex flex-col", className)}>
        {label && <label>{label}</label>}

        <div className="flex flex-row gap-2 items-center mb-2 h-[45px] w-full border-b-2 border-gray-30 focus:outline-none">
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

          <input
            readOnly={readOnly}
            ref={ownRef}
            autoFocus
            className={clsx(
              "apearance-none  w-full focus:outline-none",
              {
                "border-red-500 text-red-500 placeholder:text-red-500": invalid,
                "placeholder:mb-4 placeholder:text-lg placeholder:text-gray-10":
                  placeholder,
              },
              {
                "border-gray-30 text-gray-30 placeholder:text-gray-30":
                  disabled,
              }
            )}
            type={type}
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => {
              if (minHour) {
                //pick the hour in hh:mm format and copare with selected value, if lesser in hour and minute, set current hour and minute
                const currentHour = new Date().getHours()
                const currentMinute = new Date().getMinutes()
                const selectedHour = parseInt(e.target.value.split(":")[0])

                if (selectedHour < currentHour) {
                  onChange(
                    `${currentHour.toString().padStart(2, "0")}:${currentMinute
                      .toString()
                      .padStart(2, "0")}`
                  )
                  return
                }
              }
              onChange(e)
            }}
            onBlur={onBlur}
            autoComplete={autoComplete}
            onClick={onClick}
            disabled={disabled}
            pattern={pattern}
          />

          {type === "password" && (
            <Icon
              onClick={() => {
                if (!ownRef) return
                ownRef.current?.setAttribute(
                  "type",
                  ownRef.current?.getAttribute("type") === "password"
                    ? "text"
                    : "password"
                )

                setIconName(
                  ownRef.current?.getAttribute("type") === "password"
                    ? "visibility"
                    : "visibility_off"
                )
              }}
              name={iconName || "visibility"}
              className="cursor-pointer text-primary-0 select-none"
            />
          )}
        </div>

        <div>
          {errors && (
            <span className="text-sm text-red-500">
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      </div>
    )
  }
)
