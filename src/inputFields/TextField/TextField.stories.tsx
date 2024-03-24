import { Meta, StoryFn } from "@storybook/react"
import { FieldValues, useForm } from "react-hook-form"
import { Props, TextField } from "./TextField"

type StoryProps = Omit<Props<FieldValues>, "control" | "register">

const Template: StoryFn<StoryProps> = (args) => {
  const { control, register } = useForm()

  return <TextField {...args} {...register("example")} control={control} />
}

export default {
  title: "Components/inputFields/TextField",
  component: TextField,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  placeholder: "Type here...",
  type: "text",
}
