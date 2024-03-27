import { Meta, StoryFn } from "@storybook/react"
import { TabButton } from "./TabButton"
import { TabContent } from "./TabContent"
import { TabList } from "./TabList"
import { TabProps, Tabs } from "./Tabs"

const Template: StoryFn<TabProps> = (args) => {
  return (
    <Tabs {...args}>
      <TabList>
        <TabButton value={"1"}>Tab 1</TabButton>
        <TabButton value={"2"}>Tab 2</TabButton>
      </TabList>
      <TabContent value={"1"}>Tab 1 content</TabContent>
      <TabContent value={"2"}>Tab 2 content</TabContent>
    </Tabs>
  )
}

export default {
  title: "Components/radixStyled/Tabs",
  component: Tabs,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  defaultValue: "1",
}
