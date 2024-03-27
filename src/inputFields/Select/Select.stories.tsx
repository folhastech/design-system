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
  optionsList: [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ],
  getOptionLabel: (option) => option as string,
}
