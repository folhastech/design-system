import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { Props, SearchBar } from "./SearchBar"

type StoryProps = Omit<Props, "setQuery">

const Template: StoryFn<StoryProps> = (args) => {
  const [query, setQuery] = useState("")

  return <SearchBar {...args} setQuery={setQuery} />
}

export default {
  title: "Components/SearchBar",
  component: SearchBar,
} as Meta

export const Primary = Template.bind({})
Primary.args = {}
