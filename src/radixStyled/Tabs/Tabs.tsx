import * as TabsRoot from "@radix-ui/react-tabs"
import React from "react"

type Props = {
  children: React.ReactNode
  defaultValue: string
  onClick?: () => void
}

export const Tabs = React.forwardRef<HTMLDivElement, Props>(
  ({ children, defaultValue, onClick }, ref) => {
    return (
      <TabsRoot.Root
        onClick={() => {
          onClick?.()
        }}
        ref={ref}
        className="gap-6 "
        defaultValue={defaultValue}
      >
        {children}
      </TabsRoot.Root>
    )
  }
)
