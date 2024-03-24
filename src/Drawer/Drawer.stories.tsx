import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { Drawer, DrawerProps } from "./Drawer"

type StoryProps = Omit<DrawerProps, "open" | "setOpen">

const Template: StoryFn<StoryProps> = (args) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen} {...args}>
      <h1>Children</h1>
    </Drawer>
  )
}

export default {
  title: "Components/Drawer",
  component: Drawer,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  title: "Title",
  button: {
    text: "Open",
  },
}
