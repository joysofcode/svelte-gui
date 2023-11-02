import { writable } from 'svelte/store'

type Range = { value: number; min: number; max: number; step: number }
type Controls = Record<string, number | string | boolean | Range>

export function guiControls<T extends Controls>(values: T) {
  return writable(values)
}
