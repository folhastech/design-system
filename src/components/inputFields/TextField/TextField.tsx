import clsx from "clsx"
import React from "react"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"

type Props<T extends FieldValues> = {
  label?: string
  type?: string
  placeholder: string
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  readOnly?: boolean
  autoComplete?: string
  onClick?: () => void
  disabled?: boolean
  customOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  minHour?: string
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
      customOnChange,
      minHour,
    }: Props<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    return (
      <div className={clsx("flex flex-col", className)}>
        {label && <label>{label}</label>}
        <input
          readOnly={readOnly}
          ref={ref}
          className={clsx(
            "apearance-none mb-2 h-[45px] w-full border-b-2 border-gray-30 focus:outline-none",
            {
              "border-red-500 text-red-500 placeholder:text-red-500": invalid,
              "placeholder:mb-4 placeholder:text-lg placeholder:text-gray-10":
                placeholder,
            },
            {
              "border-gray-30 text-gray-30 placeholder:text-gray-30": disabled,
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
        />
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
