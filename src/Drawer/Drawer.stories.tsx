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
        text: "Acessar meu perfil",
      }}
      title={"Login"}
    >
      <h1>Children</h1>
    </Drawer>
  )
}

export default {
  title: "Components/Drawer",
  component: Template,
  args: {
    placeholder: "Select",
    optionsList: [
      { value: "Option 1", label: "Option 1" },
      { value: "Option 2", label: "Option 2" },
      { value: "Option 3", label: "Option 3" },
    ],
  },
} as Meta

export { Template }
