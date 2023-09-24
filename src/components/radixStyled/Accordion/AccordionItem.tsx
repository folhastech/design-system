import * as Accordion from "@radix-ui/react-accordion"
import React, { ForwardedRef, forwardRef } from "react"

type Props = {
  children: React.ReactNode
} & Accordion.AccordionItemProps

export const AccordionItem = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, forwardedRef: ForwardedRef<HTMLDivElement>) => (
    <Accordion.Item
      className="flex flex-col gap-4 "
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
)
