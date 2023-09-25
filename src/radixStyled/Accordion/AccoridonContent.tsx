import * as Accordion from "@radix-ui/react-accordion"
import clsx from "clsx"

import React, { ForwardedRef, forwardRef } from "react"

type Props = {
  children: React.ReactNode
} & Accordion.AccordionContentProps

export const AccordionContent = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, forwardedRef: ForwardedRef<HTMLDivElement>) => (
    <Accordion.Content {...props} ref={forwardedRef}>
      <div className={clsx("flex flex-col gap-6", props.className)}>
        {children}
      </div>
    </Accordion.Content>
  )
)
