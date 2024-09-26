import { Meta, StoryFn } from "@storybook/react"
import { FieldValues, Path, useForm } from "react-hook-form"
import { Autocomplete, AutocompleteProps } from "./Autocomplete"

type StoryProps = Omit<
  AutocompleteProps<FieldValues>,
  "control" | "onChange" | "name"
>

const Template: StoryFn<StoryProps> = (args) => {
  const { control } = useForm()
  const name: Path<FieldValues> = "example"
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    console.log(e.target.value)
  return (
    <Autocomplete {...args} control={control} onChange={onChange} name={name} />
  )
}

export default {
  title: "Components/inputFields/Autocomplete",
  component: Autocomplete,
} as Meta

export const Primary = Template.bind({})
Primary.args = {
  rules: { required: true },
  placeholder: "Placeholder",
  isLoading: false,
  disabled: true,
  getMoreOptions: () => { },
  options: {
    pages: [
      {
        content: [
          {
            active: true,
            id: "1",
            name: "opt1",
          },
          {
            active: true,
            id: "2",
            name: "opt2",
          },
        ],
        empty: false,
        first: true,
        last: true,
        number: 1,
        numberOfElements: 2,
        pageable: {
          offset: 1,
          pageNumber: 1,
          pageSize: 1,
          paged: true,
          sort: {
            empty: true,
            sorted: true,
            unsorted: true,
          },
          unpaged: true,
        },
        size: 1,
        sort: {
          empty: true,
          sorted: true,
          unsorted: true,
        },
        totalElements: 1,
        totalPages: 1,
      },
    ],
    pageParams: [],
  }, // this comes from the API
  getOptionLabel: (value) => `Option ${value}`,
}
