import * as DialogRoot from "@radix-ui/react-dialog"
import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"
import { Button, ButtonProps } from "../Button"
import { Swipeable } from "./Swipeable"

export type DrawerProps = {
  button?: ButtonProps
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  isDrawer?: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Drawer: React.FC<DrawerProps> = React.forwardRef<
  HTMLDivElement,
  DrawerProps
>(({ button, title, description, children, className, open, setOpen }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(50)

  useEffect(() => {
    if (contentRef?.current) {
      setHeight(
        contentRef.current.scrollHeight + 68 /* 68 sao as bordas e paddings */
      )
    }
  }, [contentRef?.current])

  return (
    <DialogRoot.Root open={open}>
      {button && (
        <DialogRoot.Trigger asChild>
          <Button onClick={() => setOpen(true)} {...button} />
        </DialogRoot.Trigger>
      )}
      <DialogRoot.Portal>
        <DialogRoot.Overlay
          onClick={() => {
            // resets the height
            setHeight(50)
            setOpen(false)
          }}
          className="fixed inset-0 bottom-0 bg-black/30"
        />
        <DialogRoot.Content
          forceMount
          style={{
            height: height,
            maxHeight: "100vh",
          }}
          className={clsx(
            "fixed bottom-0 z-50 flex w-full flex-col gap-2 rounded-t-3xl bg-white p-6 pt-0",
            "transition-all duration-500 ",
            className
          )}
        >
          <Swipeable
            contentRef={contentRef}
            height={height}
            setHeight={setHeight}
            setOpen={setOpen}
          />

          <div
            ref={contentRef}
            className="flex flex-col gap-6 overflow-y-scroll pb-8 "
          >
            <DialogRoot.Title className="text-3xl font-semibold text-primary-0">
              {title}
            </DialogRoot.Title>
            {description && (
              <DialogRoot.Description>{description}</DialogRoot.Description>
            )}

            {children}
          </div>
        </DialogRoot.Content>
      </DialogRoot.Portal>
    </DialogRoot.Root>
  )
})
