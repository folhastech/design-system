import * as TabsRoot from "@radix-ui/react-tabs"
import React from "react"

type Props = {
  children: React.ReactNode
}

export const TabList: React.FC<Props> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <TabsRoot.List
      ref={ref}
      loop
      className="flex w-full max-w-[100vw] flex-row overflow-y-scroll"

    >
      {children}
    </TabsRoot.List>
  )
}
