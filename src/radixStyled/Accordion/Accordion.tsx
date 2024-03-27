import * as AccordionRoot from "@radix-ui/react-accordion"

import clsx from "clsx"
import React from "react"
import { Icon } from "../../Icon"
import { AccordionItem } from "./AccordionItem"
import { AccordionContent } from "./AccoridonContent"

export type AccordionProps = {
  children: React.ReactNode
  headerProps: AccordionRoot.AccordionHeaderProps
  contentProps?: AccordionRoot.AccordionContentProps
  itemProps: AccordionRoot.AccordionItemProps
  rootProps?: AccordionRoot.AccordionSingleProps
  defaultValue?: string
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  headerProps,
  contentProps,
  itemProps,
  rootProps,
  defaultValue,
  className,
}) => {
  return (
    <AccordionRoot.Root
      className={clsx(
        "w-full border-b border-b-gray-30 bg-white p-[16px_18px] text-primary-0",
        className
      )}
      type="single"
      collapsible
      {...rootProps}
      defaultValue={defaultValue}
    >
      <AccordionItem {...itemProps}>
        {headerProps && (
          <AccordionRoot.Header>
            <AccordionRoot.Trigger className="flex w-full justify-start gap-2">
              <Icon name={"expand_more"} />

              {headerProps.children || headerProps.title}
            </AccordionRoot.Trigger>
          </AccordionRoot.Header>
        )}

        {(contentProps || children) && (
          <AccordionContent {...contentProps}>{children}</AccordionContent>
        )}
      </AccordionItem>
    </AccordionRoot.Root>
  )
}
