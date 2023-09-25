import * as TabsRoot from "@radix-ui/react-tabs"
import React from "react"

type Props = {
  children: React.ReactNode
  value: string
}

export const TabButton: React.FC<Props> = ({ children, value }) => {
  const ref = React.useRef<HTMLButtonElement>(null)

  return (
    <TabsRoot.Trigger
      ref={ref}
      className="w-full border-b-2 px-6 py-4 text-primary-0 rdx-state-active:border-b-primary-30 rdx-state-active:font-bold rdx-state-active:text-primary-30"
      value={value}
      onClick={() => {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        })
      }}
    >
      {children}
    </TabsRoot.Trigger>
  )
}
