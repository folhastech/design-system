import * as SelectRoot from "@radix-ui/react-select"
import clsx from "clsx"
import React from "react"
import { Icon } from "../../Icon"

type Props = {
  multiple?: boolean
  children: React.ReactNode
  className?: string
  value: string
} & SelectRoot.SelectItemProps

export const SelectItem = React.forwardRef<HTMLDivElement, Props>(
  (
    { multiple, children, value, className, disabled, ...props },
    forwardedRef
  ) => {
    return (
      <SelectRoot.Item
        value={value}
        disabled={disabled}
        className={clsx(
          "mb-2 flex h-[45px] w-full items-center justify-between border-b-2 border-gray-30 p-2 text-sm text-gray-10 focus:outline-none",
          {
            "text-gray-30": disabled,
          },
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        <SelectRoot.ItemText>{children}</SelectRoot.ItemText>
        <SelectRoot.ItemIndicator>
          <Icon name="check" />
        </SelectRoot.ItemIndicator>
      </SelectRoot.Item>
    )
  }
)
