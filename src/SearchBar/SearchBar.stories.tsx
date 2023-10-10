import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { SearchBar } from "./SearchBar"

const Template: StoryFn = (args) => {
  const [query, setQuery] = useState("")

  return <SearchBar setQuery={setQuery} />
}

export default {
  title: "Components/SearchBar",
  component: Template,
} as Meta

export { Template }
