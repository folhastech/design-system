import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Switch, SwitchProps } from "./Switch"

const Template: StoryFn<SwitchProps<any>> = (args) => {
  const { control } = useForm()
  const [value, setValue] = useState(false)

  return (
    <Switch
      {...args}
      control={control}
      onClick={() => setValue(!value)}
      propValue={value}
    />
  )
}

export default {
  title: "Components/inputFields/Switch",
  component: Switch,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  name: "switch",
  label: "Switch",
}
