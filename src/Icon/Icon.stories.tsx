import { Meta, StoryFn } from "@storybook/react"
import { Icon, IconProps } from "./Icon"

type StoryProps = Omit<IconProps, "setQuery">

const Template: StoryFn<StoryProps> = (args) => {
  return <Icon name={args.name} />
}

export default {
  title: "Components/Icon",
  component: Icon,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  name: "grass",
}
