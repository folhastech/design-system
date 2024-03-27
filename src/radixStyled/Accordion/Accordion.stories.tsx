import { Meta, StoryFn } from "@storybook/react"
import { Accordion, AccordionProps } from "./Accordion"

const Template: StoryFn<AccordionProps> = (args) => {
  return <Accordion {...args} />
}

export default {
  title: "Components/radixStyled/Accordion",
  component: Accordion,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  children: <div>Accordion Content</div>,
  itemProps: {
    value: "1",
  },
  headerProps: {
    children: "Accordion Header",
  },
}
