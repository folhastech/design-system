import { Meta, StoryFn } from "@storybook/react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { TextField } from "./TextField"

const Template: StoryFn = (args) => {
  const { control, register } = useForm()
  const ref = useRef(null)

  /* @ts-ignore */
  return <TextField {...args} {...register("example")} control={control} />
}

export default {
  title: "Components/TextField",
  component: Template,
  args: {
    placeholder: "Digite",
    icon: "search",
  },
} as Meta

export { Template }
