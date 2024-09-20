import { Meta, StoryFn } from "@storybook/react"
import { FieldValues, useForm } from "react-hook-form"
import { Select, SelectProps } from "./Select"

type StoryProps = Omit<SelectProps<FieldValues>, "control" | "register">

const Template: StoryFn<StoryProps> = (args) => {
  const { control, register } = useForm()
  return <Select {...args} control={control} {...register("example")} />
}

export default {
  title: "Components/inputFields/Select",
  component: Select,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  placeholder: "Select",
  options: [
    { id: "Option 1", name: "Option 1" },
    { id: "Option 2", name: "Option 2" },
    { id: "Option 3", name: "Option 3" },
  ],
  getOptionLabel: (option) => option as string,
}
