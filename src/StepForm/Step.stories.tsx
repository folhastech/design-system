import { Meta, StoryFn } from "@storybook/react"
import { StepForm } from "./StepForm"

const Template: StoryFn<typeof StepForm> = (args) => {
  return <StepForm {...args} />
}

export default {
  title: "Compoents/StepForm",
  component: Template,
  args: {
    icon: "grass",
    title: "Step",
    done: false,
  },
} as Meta

export { Template }
