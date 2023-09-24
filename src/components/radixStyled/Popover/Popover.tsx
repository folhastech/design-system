import * as PopoverRoot from "@radix-ui/react-popover"
import clsx from "clsx"
import React from "react"

type Props = {
  className?: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  showClose?: boolean
  showTrigger?: boolean
}

export const Popover = React.forwardRef(
  (
    { className, open, setOpen, children, showClose, showTrigger }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <PopoverRoot.Root open={open}>
        {showTrigger && <PopoverRoot.Trigger />}
        <PopoverRoot.Anchor />
        <PopoverRoot.Content
          ref={ref}
          className={clsx(
            "z-50 rounded-md border border-gray-30 bg-white p-2",
            className
          )}
        >
          <PopoverRoot.Arrow className="fill-gray-30" />
          {showClose && <PopoverRoot.Close />}
          {children}
        </PopoverRoot.Content>
      </PopoverRoot.Root>
    )
  }
)
