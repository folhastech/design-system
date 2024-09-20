import clsx from "clsx"
import { format, isValid, parse, parseISO, setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale"
import React, { useEffect, useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { Icon } from "../../Icon"
import { Popover } from "../../radixStyled/Popover"

setDefaultOptions({ locale: ptBR })

export type DatepickerProps<T extends FieldValues> = {
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
  minDate?: Date
  disabled?: boolean
  shouldRender?: boolean
}

export const DatePicker = React.forwardRef(
  <T extends FieldValues>(
    {
      label,
      placeholder,
      className,
      rules,
      name,
      control,
      minDate,
      disabled,
      shouldRender = true
    }: DatepickerProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState<any>("")
    const ownRef = useRef<HTMLInputElement>(null)
    const popOverRef = useRef<HTMLInputElement>(null)
    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    const setValueInput = (value: any) => {
      if (value) {
        let isoValue = null
        try {
          isoValue = parseISO(value)
          if (!isValid(isoValue)) {
            isoValue = null
          }
        } catch (e) {
          console.error(e)
        }
        setInputValue(format(isoValue ?? value, "dd/MM/yyyy"))
      }
    }

    useEffect(() => {
      setValueInput(value)
    }, [value])

    // Close the Popover when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          ownRef.current &&
          popOverRef.current &&
          !ownRef.current.contains(event.target as Node) &&
          !popOverRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ownRef, ref])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueInput(e.currentTarget.value)

      const date = parse(e.currentTarget.value, "dd/MM/yyyy", new Date())
      if (isValid(date)) {
        onChange(date)
      } else {
        onChange(null)
      }
    }

    const handleDaySelect = (date?: Date) => {
      onChange(date)
      if (date) {
        setValueInput(date)
      } else {
        setInputValue("")
      }
    }

    if (!shouldRender) return <></>

    return (
      <div ref={ref} className={className}>
        <div className="flex flex-col">
          {label && (
            <label className="text-primary-0 font-semibold">
              {label}
            </label>
          )}

          <div className="relative flex items-center ">
            <Icon
              name="calendar_today"
              className="absolute mb-2 text-gray-10 "
            />
            <input
              disabled={disabled}
              ref={ownRef}
              className={clsx(
                "apearance-none mb-2 h-[45px] w-full border-b-2 text-center focus:outline-none",
                invalid
                  ? "border-error-10 text-error-10 placeholder:text-error-10"
                  : "border-gray-30",
                {
                  "placeholder:mb-4 placeholder:text-lg placeholder:text-gray-10":
                    placeholder,
                },
                className
              )}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={onBlur}
              onClick={() => {
                if (disabled) {
                  return
                }
                setOpen(!open)
              }}
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

        <Popover ref={popOverRef} open={open} setOpen={setOpen}>
          <DayPicker
            disabled={disabled}
            fromDate={minDate}
            initialFocus={open}
            mode="single"
            selected={value}
            locale={ptBR}
            onSelect={handleDaySelect}
            onDayClick={() => {
              setOpen(false)
            }}
          />
        </Popover>
      </div>
    )
  }
)
