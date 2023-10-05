import { Meta, StoryFn } from "@storybook/react"
import { useForm } from "react-hook-form"
import { Select } from "./Select"

const Template: StoryFn<typeof Select> = (args) => {
  const { control, register } = useForm()
  return (
    <Select
      {...args}
      control={control}
      {...register("example")}
      getOptionLabel={(option) => option as string}
    />
  )
}

export default {
  title: "Components/Select",
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
