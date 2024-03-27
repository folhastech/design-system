import * as DialogRoot from "@radix-ui/react-dialog"
import clsx from "clsx"
import React from "react"
import { Button, ButtonProps } from "../../Button"

export type DialogProps = {
  button: ButtonProps
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const Dialog: React.FC<DialogProps> = ({
  button,
  title,
  description,
  children,
  className,
}) => {
  return (
    <DialogRoot.Root>
      <DialogRoot.Trigger asChild>
        <Button {...button} />
      </DialogRoot.Trigger>
      <DialogRoot.Portal>
        <DialogRoot.Overlay />
        <DialogRoot.Content
          forceMount
          className={clsx(
            "fixed z-50",
            "bottom-0",
            "w-full max-w-md rounded-3xl p-4 md:w-full",
            "left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]",
            "bg-white dark:bg-gray-800",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
            className
          )}
        >
          <DialogRoot.Title>{title}</DialogRoot.Title>
          {description && (
            <DialogRoot.Description>{description}</DialogRoot.Description>
          )}

          {children}

          <DialogRoot.Close asChild>
            <button className="Button green">Save changes</button>
          </DialogRoot.Close>
          <DialogRoot.Close asChild>
            <button className="IconButton" aria-label="Close">
              X
            </button>
          </DialogRoot.Close>
        </DialogRoot.Content>
      </DialogRoot.Portal>
    </DialogRoot.Root>
  )
}
