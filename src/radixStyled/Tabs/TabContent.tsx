import * as TabsRoot from "@radix-ui/react-tabs"
import React from "react"

type Props = {
  children: React.ReactNode
  value: string
}

export const TabContent: React.FC<Props> = ({ children, value }) => {
  return (
    <TabsRoot.Content className="p-6" value={value}>
      {children}
    </TabsRoot.Content>
  )
}
