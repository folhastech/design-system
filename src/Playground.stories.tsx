import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Drawer } from "./Drawer"
import { Select } from "./inputFields/Select"
import { TextField } from "./inputFields/TextField"
import { Switch } from "./inputFields/Switch"

const Template: StoryFn = (args) => {
  const { control, register } = useForm()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [a, setA] = useState(false)
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
        control={control}
        {...register("example")}
        options={[
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 1", name: "Option 1" },
          { id: "Option 2", name: "Option 2" },
          { id: "Option 3", name: "Option 3" },
        ]}
        getOptionLabel={(option) => option as string}
      />
      <Switch
        control={control}
        {...register("switch")}
        onClick={() => setA(!a)}
        propValue={a}
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
