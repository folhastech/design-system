import { useState } from "react"
import { useForm } from "react-hook-form"
import { Drawer } from "./Drawer"
import { Select } from "./inputFields/Select"

function App() {
  const { register, control } = useForm()
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Drawer
        button={{
          text: "Open",
          variant: "primary",
          type: "button",
        }}
        title={"title"}
        open={open}
        setOpen={setOpen}
      >
        <Select
          optionsList={[
            { value: "1", label: "One" },
            { value: "2", label: "Two" },
            { value: "3", label: "Three" },
          ]}
          {...register("select")}
          control={control}
        />
      </Drawer>
    </div>
  )
}

export default App
