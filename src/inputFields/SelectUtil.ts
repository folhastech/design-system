import { DefType } from "./Select/types"

export type OptType = {
  label: string
  value: string
  disabled?: boolean
}

export function normalizeOptTypeToDefType(defType: DefType): OptType {
  return {
    label: defType.name,
    value: defType.id.toString(),
    disabled: !defType.active,
  }
}
