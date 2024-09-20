import * as SelectRoot from "@radix-ui/react-select"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { Icon } from "../../Icon"
import { useSize } from "../../hooks/useSize"
import { OptType, normalizeDefTypeToOptType } from "../SelectUtil"
import { SelectItem } from "./SelectItem"
import { DefType } from "./types"

export type SelectProps<T extends FieldValues> = {
  label?: string
  options: OptType[] | DefType[]
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  placeholder?: string
  disabled?: boolean
  getOptionLabel?: (value: number | string) => string
  shouldRender?: boolean
}

/**
 * @description Select 
 *
 * @param {string} [label] - label
 * @param {OptType[]} [options] - Options
 * @param {string} [name] - Field name
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} [onChange] - OnChange function
 * @param {string} [className] - Styles for the select
 * @param {RegisterOptions} [rules] - react-hook-form rules
 * @param {Control<T | any>} [control] - react-hook-form control
 * @param {string} [placeholder] - The placeholder of the select
 * @param {boolean} [disabled] - If true, the select will be disabled
 * @param {(value: number) => string} [getOptionLabel] - Function to get the label of the option
 * @returns {ReactElement}
 * 
         <Select
          control={control}
          {...register(`measurementUnit`)}
          placeholder={t("measurementUnit")}
          options={measurements}
          getOptionLabel={(value: string | number) => {
            return (
              measurements?.find((item) => item.value == value)?.label ?? ""
            )
          }}
        />
 */

export const Select = React.forwardRef(
  <T extends FieldValues>(
    {
      label,
      options,
      className,
      rules,
      name,
      control,
      placeholder,
      disabled,
      getOptionLabel,
      shouldRender = true,
    }: SelectProps<T>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const [optionLabel, setOptionLabel] = useState<string | undefined>()
    const [opts, setOpts] = useState<OptType[] | undefined>()
    const size = useSize()
    const isMobile = size === "sm" || size === "md"

    const {
      field: { onChange, onBlur, value }, fieldState: { invalid },
    } = useController({ name, control, rules })

    useEffect(() => {
      if (!value) return

      if (!getOptionLabel) {
        setOptionLabel(
          opts?.find((item) => item?.value === value)?.label ?? ""
        )
        return
      }
      setOptionLabel(getOptionLabel(value))
    }, [value, opts])

    function isDefType(obj: any): obj is DefType {
      return 'id' in obj && 'name' in obj;
    }

    useEffect(() => {
      if (!options) return
      if (isDefType(options[0])) {
        setOpts(options.map((item) => normalizeDefTypeToOptType(item as DefType)))
        return
      } else {
        setOpts(options as OptType[])
      }

    }, [options])

    if (!shouldRender) return <></>
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="font-semibold  text-primary-0">{label}</label>}
        <SelectRoot.Root
          autoComplete="on"
          onValueChange={onChange}
          value={value}
          disabled={disabled}
        >
          <SelectRoot.Trigger
            ref={ref}
            className={clsx(
              "mb-2 flex h-[45px] w-full items-center justify-between border-b-2 pr-2 text-lg text-gray-10 focus:outline-none",
              invalid ? "border-error-10 text-error-10 " : "border-gray-30",
              className
            )}
          >
            <SelectRoot.Value
              className={`${optionLabel ? "text-primary-0" : "text-gray-10"}`}
              placeholder={placeholder}
            >
              {optionLabel ?? placeholder}
            </SelectRoot.Value>
            <SelectRoot.Icon>
              <Icon name="expand_more" />
            </SelectRoot.Icon>
          </SelectRoot.Trigger>
          <SelectRoot.Portal>
            <SelectRoot.Content
              onBlur={onBlur}
              position={!isMobile ? "popper" : undefined}
              className="w-full bg-white z-50 overflow-y-scroll"
              ref={(ref) => {
                ref?.addEventListener("touchend", (e) => e.preventDefault())
              }}
            >
              <SelectRoot.Viewport
                className="m-2 max-h-60 rounded-lg border border-b-gray-30 bg-white w-rdx-select-content-available-width w-[350px] lg:w-[700px] overflow-y-scroll"
              >
                {opts?.map((item) => {
                  return (
                    <SelectItem
                      className="hover:bg-gray-50 cursor-pointer"
                      key={item?.value}
                      value={item?.value}
                      disabled={item?.disabled}
                    >
                      {item?.label}
                    </SelectItem>
                  )
                })}
              </SelectRoot.Viewport>
            </SelectRoot.Content>
          </SelectRoot.Portal>
        </SelectRoot.Root>
      </div>
    )
  }
)

