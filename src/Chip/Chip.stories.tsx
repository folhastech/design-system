import { Meta, StoryFn } from "@storybook/react"
import { Chip, ChipProps } from "./Chip"

const Template: StoryFn<ChipProps> = (args) => {
  return <Chip {...args} />
}

export default {
  title: "Components/Chip",
  component: Chip,
} as Meta

// Primary Story
export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Chip",
  color: "#3b82f6", // Tailwind blue
}

// Success Story
export const Success = Template.bind({});
Success.args = {
  label: "Success Chip",
  color: "#10b981", // Tailwind green
}

// Danger Story
export const Danger = Template.bind({});
Danger.args = {
  label: "Danger Chip",
  color: "#ef4444", // Tailwind red
}
