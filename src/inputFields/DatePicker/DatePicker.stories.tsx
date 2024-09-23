import { Meta, StoryFn } from "@storybook/react"
import { FieldValues, Path, useForm } from "react-hook-form"
import { DatePicker, DatepickerProps } from "./DatePicker"

type StoryProps = Omit<
  DatepickerProps<FieldValues>,
  "control" | "onChange" | "name"
>

const Template: StoryFn<StoryProps> = (args) => {
  const { control, reset } = useForm(
  )

  reset({ example: "2024-09-16T23:23:34.175243" })



  const name: Path<FieldValues> = "example"
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    console.log(e.target.value)
  return (
    <DatePicker {...args} control={control} onChange={onChange} name={name} />
  )
}

export default {
  title: "Components/inputFields/DatePicker",
  component: DatePicker,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  type: "text",
  placeholder: "Select a date",
}
