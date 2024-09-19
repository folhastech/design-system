import { debounce } from "lodash"
import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Drawer } from "../Drawer"
import { Icon } from "../Icon"
import { TextField } from "../inputFields/TextField"

type DrawerPops = {
  title: string
  description?: string
  form: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setFilterValues?: React.Dispatch<React.SetStateAction<any>>
}
export type SearchBarProps = {
  filterDrawer?: DrawerPops
  addButton?: DrawerPops
  setQuery: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = React.forwardRef<
  HTMLDivElement,
  SearchBarProps
>(({ filterDrawer, addButton, setQuery, placeholder }, ref) => {
  const form = useForm()
  const { control, register, watch, setValue, handleSubmit } = form

  const onSubmit = () => {
    const search = watch("search")
    setValue("search", "")
    filterDrawer?.setFilterValues?.(form.getValues())
    setValue("search", search)
    filterDrawer?.setOpen?.(false)
  }

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
        {filterDrawer && (
          <Drawer
            title={filterDrawer.title}
            description={filterDrawer.description}
            open={filterDrawer.open || false}
            setOpen={filterDrawer.setOpen || (() => { })}
            button={{
              variant: "text",
              onClick: () => filterDrawer?.setOpen?.(true),
              children: (
                <Icon name="filter_list" className={"text-primary-0"} />
              ),
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex min-h-full flex-col justify-between gap-4"
            >
              <FormProvider {...form}>
                {filterDrawer.form}
              </FormProvider>
             </form>
          </Drawer>
        )}

        {addButton && (
          <Drawer
            title={addButton.title}
            description={addButton.description}
            open={addButton.open || false}
            setOpen={addButton.setOpen || (() => { })}
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
