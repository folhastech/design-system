import { debounce } from "lodash"
import React, { useEffect } from "react"
import { Drawer } from "../Drawer"
import { Icon } from "../Icon"

type DrawerPops = {
  title: string
  description?: string
  form: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
type Props = {
  filterButton?: DrawerPops
  addButton?: DrawerPops
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<Props> = React.forwardRef<
  HTMLDivElement,
  Props
>(({ filterButton, addButton, setQuery }, ref) => {
  const [search, setSearch] = React.useState("")

  useEffect(() => {
    const debounced = debounce(() => setQuery(search), 500)
    debounced()
    return () => {
      debounced.cancel()
    }
  }, [search])

  return (
    <div className="flex w-full flex-row items-center justify-between py-4">
      <div className="flex w-full items-center gap-2 text-primary-0">
        <Icon name="search" className={"text-primary-0"} />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full rounded-md  text-gray-600 outline-none"
          type="text"
        />
      </div>
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
