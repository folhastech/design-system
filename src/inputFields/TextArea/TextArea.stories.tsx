import { Meta, StoryFn } from "@storybook/react"
import { FieldValues, useForm } from "react-hook-form"
import { TextArea, TextAreaProps } from "./TextArea"

type StoryProps = Omit<TextAreaProps<FieldValues>, "control" | "register">

const Template: StoryFn<StoryProps> = (args) => {
  const { control, register } = useForm()

  return <TextArea {...args} {...register("example")} control={control} />
}

export default {
  title: "Components/inputFields/TextArea",
  component: TextArea,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  disabled: false,
  placeholder: "Type here..."
}
