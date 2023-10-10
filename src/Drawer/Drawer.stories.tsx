import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { Drawer } from "./Drawer"

const Template: StoryFn = (args) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Drawer
      open={isDrawerOpen}
      setOpen={setIsDrawerOpen}
      button={{
        text: "Abrir",
      }}
      {...args}
    >
      <h1>Children</h1>
    </Drawer>
  )
}

export default {
  title: "Components/Drawer",
  component: Template,
  args: {
    title: "Titulo",
    size: "xl",
  },
} as Meta

export { Template }
