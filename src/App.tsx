import { useState } from "react"
import { useForm } from "react-hook-form"
import { Drawer } from "./Drawer"
import { Autocomplete } from "./inputFields/Autocomplete"
import { TextField } from "./inputFields/TextField"

const opt = {
  content: [
    {
      id: 36,
      updatedAt: "2023-08-28 15:06:30",
      nome: "Talhão Cascavel",
      longitude: -53.4528,
      latitude: -24.9651,
      areaTotal: 50,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 37,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 44,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 43,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 42,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 41,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 40,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 39,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 38,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
    {
      id: 38,
      updatedAt: "2023-09-20 10:29:00",
      nome: "talhao Fag",
      longitude: -53.3881,
      latitude: -25.0525,
      areaTotal: 450000,
      ativo: true,
      empresa: {
        id: 4,
        updatedAt: null,
        nome: "Gallon",
        ativo: true,
      },
    },
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalPages: 1,
  totalElements: 10,
  last: true,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 10,
  first: true,
  empty: false,
}

function App() {
  const { register, control } = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
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
        <TextField
          icon="search"
          placeholder="Search"
          {...register(`search`)}
          control={control}
        />

        <Autocomplete
          control={control}
          {...register(`test`)}
          placeholder="Selecione um produto"
          isLoading={loading}
          getMoreOptions={() => setLoading(true)}
          options={{
            pages: [opt],
            pageParams: [],
          }}
        />
      </Drawer>
    </div>
  )
}

export default App
