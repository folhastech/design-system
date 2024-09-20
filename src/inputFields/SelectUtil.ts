import { DefType } from "./Select/types"

export type OptType = {
  label: string
  value: string
  disabled?: boolean
}

export function normalizeDefTypeToOptType(defType: DefType): OptType {
  return {
    label: defType.name,
    value: defType.id,
    disabled: defType?.active !== undefined ? !defType.active : false,
  }
}
