import * as TabsRoot from "@radix-ui/react-tabs"
import React from "react"

export type TabProps = {
  children: React.ReactNode
  defaultValue: string
  onClick?: () => void
}

export const Tabs = React.forwardRef<HTMLDivElement, TabProps>(
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
