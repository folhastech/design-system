import { Meta, StoryFn } from "@storybook/react"
import { FieldValues, useForm } from "react-hook-form"
import { Textarea, TextareaProps } from "./Textarea"

type StoryProps = Omit<TextareaProps<FieldValues>, "control" | "register">

const Template: StoryFn<StoryProps> = (args) => {
  const { control, register } = useForm()

  return <Textarea {...args} {...register("example")} control={control} />
}

export default {
  title: "Components/inputFields/Textarea",
  component: Textarea,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  placeholder: "Type here..."
}
