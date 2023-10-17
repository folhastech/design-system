import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Drawer } from "./Drawer"
import { Select } from "./inputFields/Select"
import { TextField } from "./inputFields/TextField"

const Template: StoryFn = (args) => {
  const { control, register } = useForm()
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
      <TextField
        icon="search"
        placeholder="Search"
        {...register(`search`)}
        control={control}
      />
      <Select
        {...args}
        control={control}
        {...register("example")}
        getOptionLabel={(option) => option as string}
      />
    </Drawer>
  )
}

export default {
  title: "Playground/Playground",
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
