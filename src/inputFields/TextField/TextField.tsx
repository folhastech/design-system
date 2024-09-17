import clsx from "clsx"
import React, { useEffect, useRef } from "react"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { Button } from "../../Button"
import { Icon } from "../../Icon"

export type TextFieldProps<T extends FieldValues> = {
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
  showBorder?: boolean
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
      showBorder = true,
    }: TextFieldProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const ownRef = useRef<HTMLInputElement>(null)
    const [iconName, setIconName] = React.useState("visibility")
    const [inputType, setInputType] = React.useState<string | undefined>(type)
    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    // prevent oppening the keyboard on mobile in IOS and android, the timeout is for android
    useEffect(() => {
      if (!ownRef.current) return
      // Disable the input when the component mounts
      ownRef.current.disabled = true
      ownRef.current?.blur()

      const timeout = setTimeout(() => {
        if (!ownRef.current) return
        // Enable the input after a delay
        if (!disabled) ownRef.current.disabled = false
      }, 100)

      return () => {
        clearTimeout(timeout) // Clear the timeout if the component unmounts
      }
    }, [])

    return (
      <div className={clsx("flex flex-col", className)}>
        {label && <label className="text-primary-0 font-semibold">{label}</label>}

        <div
          className={clsx(
            "flex flex-row gap-2 items-center mb-2 h-[45px] w-full focus:outline-none",
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

          <input
            readOnly={readOnly}
            ref={ownRef}
            className={clsx(
              "apearance-none w-full focus:outline-none",
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
            type={inputType}
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
            <Button
              variant="text"
              onClick={() => {
                setIconName(
                  iconName === "visibility_off"
                    ? "visibility"
                    : "visibility_off"
                )
                setInputType(inputType === "password" ? "text" : "password")
              }}
            >
              <Icon
                name={iconName}
                className="cursor-pointer text-primary-0 select-none"
              />
            </Button>
          )}
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
