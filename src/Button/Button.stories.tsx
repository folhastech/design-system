import { Meta, StoryFn } from "@storybook/react"

import { Button, ButtonProps } from "./Button"

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => {
  return <Button {...args} />
}

export default {
  title: "Components/Button",
  component: Button,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  text: "Button",
}
