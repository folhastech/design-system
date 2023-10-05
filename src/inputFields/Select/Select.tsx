import * as SelectRoot from "@radix-ui/react-select"
import { InfiniteData } from "@tanstack/react-query"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { Icon } from "../../Icon"
import { SelectItem } from "./SelectItem"
import { DefType, Pagination } from "./types"

type Props<T extends FieldValues> = {
  label?: string
  options?: InfiniteData<Pagination<DefType>>
  optionsList?: OptType[]
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  placeholder?: string
  isLoading?: boolean
  disabled?: boolean
  getMoreOptions?: () => void
  getOptionLabel?: (value: number | string) => string
}

type OptType = {
  label: string
  value: string
  disabled?: boolean
}

function normalizeOptTypeToDefType(defType: DefType): OptType {
  return {
    label: defType.nome,
    value: defType.id.toString(),
    disabled: !defType.ativo,
  }
}

/**
 * @description Select generico com tratativa do infinite query
 *
 * @param {string} [label] - label do select
 * @param {InfiniteData<Pagination<DefType>>} [options] - lista de opcoes quando utilizado o infinite query
 * @param {OptType[]} [optionsList] - lista de opcoes padrao
 * @param {string} [name] - nome do campo
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} [onChange] - funcao para ser executada ao mudar o valor do select
 * @param {string} [className] - classe para ser aplicada no select
 * @param {RegisterOptions} [rules] - regras do react hook form
 * @param {Control<T | any>} [control] - control do react hook form
 * @param {string} [placeholder] - placeholder do select
 * @param {boolean} [isLoading] - se esta carregando
 * @param {boolean} [disabled] - se esta desabilitado
 * @param {() => void} [getMoreOptions] - funcao para buscar mais opcoes quando utilizado o infinite query
 * @param {(value: number) => string} [getOptionLabel] - funcao para retornar o label do valor selecionado quando utilizado o infinite query
 * @returns {React.ReactNode}
 * 
 * @example <caption>Exemplo de uso encontrado em components/Forms/ProductForm.tsx</caption>
 * <Select
              control={control}
              {...register(`produtos.${index}.value`)}
              placeholder="Selecione um produto"
              isLoading={isLoadingProducts}
              getMoreOptions={fetchNextPage}
              options={products}
              getOptionLabel={(value: number) => {
                return (
                  products?.pages
                    ?.map((page) =>
                      page.content?.filter((item) => {
                        return item.id == value
                      })
                    )
                    .flat()[0]?.nome ?? ""
                )
              }}
            />
 */
export const Select = React.forwardRef(
  <T extends FieldValues>(
    {
      label,
      options,
      optionsList,
      className,
      rules,
      name,
      control,
      placeholder,
      isLoading,
      disabled,
      getMoreOptions,
      getOptionLabel,
    }: Props<T>,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    const [opt, setOpt] = useState<OptType[]>([])
    const [optionLabel, setOptionLabel] = useState<string | undefined>()

    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    useEffect(() => {
      if (!getOptionLabel || !value) return
      setOptionLabel(getOptionLabel(value))
    }, [value])

    useEffect(() => {
      if (optionsList) {
        setOpt(optionsList)
      } else {
        if (!options) return
        const allOpt = options?.pages.map((page) => page.content).flat()
        setOpt(allOpt?.map(normalizeOptTypeToDefType))
      }
    }, [options])

    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm text-gray-10">{label}</label>}
        <SelectRoot.Root
          autoComplete="on"
          onValueChange={onChange}
          value={value}
          disabled={disabled}
        >
          <SelectRoot.Trigger
            onBlur={onBlur}
            className={clsx(
              "mb-2 flex h-[45px] w-full items-center justify-between border-b-2 border-gray-30 pr-2 text-lg text-gray-10 focus:outline-none",
              {
                "border-red-500 text-red-500": invalid,
              },
              className
            )}
          >
            <SelectRoot.Value>{optionLabel || placeholder}</SelectRoot.Value>
            <SelectRoot.Icon>
              <Icon name="expand_more" />
            </SelectRoot.Icon>
          </SelectRoot.Trigger>
          <SelectRoot.Content
            position="popper"
            className="w-full"
            ref={(ref) =>
              ref?.addEventListener("touchend", (e) => e.preventDefault())
            }
          >
            <SelectRoot.Viewport
              onScroll={(e) => {
                if (!getMoreOptions) return
                if (
                  e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
                  e.currentTarget.scrollHeight
                ) {
                  getMoreOptions()
                }
              }}
              className="z-40 m-2 mr-2 max-h-60 rounded-lg border border-b-gray-30 bg-white w-rdx-select-content-available-width"
            >
              {opt?.map((item) => {
                return (
                  <SelectItem
                    key={item?.value}
                    value={item?.value}
                    disabled={item?.disabled}
                  >
                    {item?.label}
                  </SelectItem>
                )
              })}
            </SelectRoot.Viewport>
          </SelectRoot.Content>
        </SelectRoot.Root>
      </div>
    )
  }
)
