import { Combobox } from "@headlessui/react"
import { InfiniteData } from "@tanstack/react-query"
import clsx from "clsx"
import { DefType, Pagination } from "inputFields/Select/types"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { Icon } from "../../Icon"

import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { OptType, normalizeOptTypeToDefType } from "../SelectUtil"

export type AutocompleteProps<T extends FieldValues> = {
  label?: string
  options?: InfiniteData<Pagination<DefType>>
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  placeholder?: string
  isLoading?: boolean
  disabled?: boolean
  getMoreOptions?: () => void
  getOptionLabel?: (value: number | string) => string
  filter?: (value: string) => void
}

export const Autocomplete = React.forwardRef(
  <T extends FieldValues>(
    {
      label,
      options,
      className,
      rules,
      name,
      control,
      placeholder,
      isLoading,
      disabled,
      getMoreOptions,
      getOptionLabel,
      filter,
    }: AutocompleteProps<T>,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    const [query, setQuery] = useState("")
    const [opt, setOpt] = useState<OptType[]>([])
    const [optionLabel, setOptionLabel] = useState<string | undefined>()
    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
    } = useController({ name, control, rules })

    useEffect(() => {
      if (!filter) return
      const debounced = debounce(() => filter(query), 200)
      debounced()
      return () => {
        debounced.cancel()
      }
    }, [query])

    useEffect(() => {
      if (!options) return
      const allOpt = options?.pages.map((page) => page.content).flat()
      setOpt(allOpt?.map(normalizeOptTypeToDefType))
    }, [options])

    useEffect(() => {
      if (!getOptionLabel || !value) return
      setOptionLabel(getOptionLabel(value))
    }, [value])

    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm text-gray-10">{label}</label>}
        <Combobox value={value} onChange={onChange} disabled={disabled}>
          <Combobox.Input
            className={clsx(
              "mb-2 flex h-[45px] w-full items-center justify-between border-b-2 border-gray-30 pr-2 text-lg text-gray-10 focus:outline-none placeholder:mb-4 placeholder:text-lg placeholder:text-gray-10",
              {
                "border-error-10 text-error-10 placeholder:text-error-10":
                  invalid,
              },
              className
            )}
            onBlur={onBlur}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(value: OptType["value"]) => optionLabel || value}
          />
          <Combobox.Options
            onScroll={(e) => {
              if (!getMoreOptions || isLoading) return
              if (
                e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
                e.currentTarget.scrollHeight
              ) {
                getMoreOptions()
              }
            }}
            className={
              "border border-gray-30 rounded-md shadow-md mt-[-20px] max-h-[200px] overflow-y-auto"
            }
          >
            {opt.map((item) => {
              return (
                <Combobox.Option
                  key={item.value}
                  value={item.value}
                  className={
                    "flex h-[45px] w-full items-center justify-between border-b-2 border-gray-30 p-2 text-sm text-gray-10 focus:outline-none"
                  }
                >
                  {item.label}
                </Combobox.Option>
              )
            })}

            {isLoading && (
              <Combobox.Option
                value={"load"}
                className={
                  "flex h-[45px] w-full items-center justify-between border-b-2 border-gray-30 p-2 text-sm text-gray-10 focus:outline-none"
                }
                disabled
              >
                <div className="w-full flex justify-center items-center animate-spin">
                  <Icon name={"progress_activity"} />
                </div>
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox>
      </div>
    )
  }
)
