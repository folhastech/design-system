import * as DialogRoot from "@radix-ui/react-dialog"
import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"
import { Button, ButtonProps } from "../Button"
import { Icon } from "../Icon"
import { useSize } from "../hooks/useSize"
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
  const size = useSize()
  const isMobile = size === "md" || size === "sm"

  useEffect(() => {
    if (!isMobile) return
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
            if (isMobile) setHeight(50)
            setOpen(false)
          }}
          className="backdrop-blur-[2px] fixed inset-0 bottom-0 bg-black/30"
        />
        <DialogRoot.Content
          forceMount
          style={{
            height: isMobile ? height : "",
          }}
          className={clsx(
            "fixed max-h-[calc(100vh-20px)] bottom-0 flex w-full flex-col gap-2 p-6 pt-0 lg:pt-6 bg-white rounded-t-3xl lg:h-[595px] lg:max-h-[595px] lg:w-[800px] lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-xl lg:p-8 lg:shadow",
            "transition-all duration-500 z-50",
            className
          )}
        >
          {isMobile && (
            <Swipeable
              contentRef={contentRef}
              height={height}
              setHeight={setHeight}
              setOpen={setOpen}
            />
          )}

          <div
            ref={contentRef}
            className="flex flex-col gap-6 overflow-y-auto lg:h-[595px]"
          >
            <div className="flex w-full items-center justify-between text-primary-0">
              <DialogRoot.Title className="text-3xl font-semibold ">
                {title}
              </DialogRoot.Title>

              {!isMobile && (
                <DialogRoot.Close
                  className="cursor-pointer flex items-center"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <Icon name="close" className="text-center" />
                </DialogRoot.Close>
              )}
            </div>

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
