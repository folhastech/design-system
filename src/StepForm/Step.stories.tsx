import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { StepForm, StepFormProps } from "./StepForm"

type StoryProps = Omit<StepFormProps, "open" | "setOpen">

const Template: StoryFn<StoryProps> = (args) => {
  const [open, setOpen] = useState(false)
  return <StepForm {...args} open={open} setOpen={setOpen} />
}

export default {
  title: "Components/StepForm",
  component: StepForm,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  icon: "grass",
  title: "Step",
  done: false,
}
