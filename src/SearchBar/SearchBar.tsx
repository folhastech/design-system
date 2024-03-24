import { debounce } from "lodash"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Drawer } from "../Drawer"
import { Icon } from "../Icon"
import { TextField } from "../inputFields/TextField"

type DrawerPops = {
  title: string
  description?: string
  form: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
export type Props = {
  filterButton?: DrawerPops
  addButton?: DrawerPops
  setQuery: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

export const SearchBar: React.FC<Props> = React.forwardRef<
  HTMLDivElement,
  Props
>(({ filterButton, addButton, setQuery, placeholder }, ref) => {
  const { control, register, watch } = useForm()

  useEffect(() => {
    const debounced = debounce(() => setQuery(watch("search")), 500)
    debounced()
    return () => {
      debounced.cancel()
    }
  }, [watch("search")])

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <TextField
        type="text"
        {...register("search")}
        placeholder={placeholder}
        control={control}
        icon="search"
        className="w-full"
        showBorder={false}
      />

      <div className="flex gap-6 text-primary-0">
        {filterButton && (
          <Drawer
            title={filterButton.title}
            description={filterButton.description}
            open={filterButton.open || false}
            setOpen={filterButton.setOpen || (() => {})}
            button={{
              variant: "text",
              onClick: () => filterButton?.setOpen?.(true),
              children: (
                <Icon name="filter_list" className={"text-primary-0"} />
              ),
            }}
          >
            {filterButton.form}
          </Drawer>
        )}

        {addButton && (
          <Drawer
            title={addButton.title}
            description={addButton.description}
            open={addButton.open || false}
            setOpen={addButton.setOpen || (() => {})}
            button={{
              variant: "text",
              onClick: () => addButton?.setOpen?.(true),
              children: <Icon name="add" className={"text-primary-0"} />,
            }}
          >
            {addButton.form}
          </Drawer>
        )}
      </div>
    </div>
  )
})
